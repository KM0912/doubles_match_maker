import { useEffect, useMemo, useReducer, useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MatchTab } from './components/MatchTab';
import { SettingsTab } from './components/SettingsTab';
import { HistoryTab } from './components/HistoryTab';
import { appReducer } from './state/reducer';
import { loadStoredState, saveState } from './state/persistence';
import type { PlayerId, PlayerSlot, TeamNumber } from './types';
import { createSchedule, createScheduleInput, SchedulerValidationError } from './scheduler/adapter';
import { getAvailablePlayerIds, isPlayerInActiveRound, slotKey } from './state/selectors';

function App() {
  const loaded = useMemo(() => loadStoredState(), []);
  const [state, dispatch] = useReducer(appReducer, loaded.state);
  const [notice, setNotice] = useState<string | null>(loaded.restoreError);
  const [selectedSlot, setSelectedSlot] = useState<PlayerSlot | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    setSelectedSlot(null);
  }, [state.selectedTab, state.activeRound?.id]);

  const handleGenerate = () => {
    if (state.activeRound) {
      return;
    }

    const availableIds = getAvailablePlayerIds(state);
    if (availableIds.length < 4) {
      setNotice('参加可能人数が4人未満のため、組み合わせを生成できません。');
      return;
    }

    if (
      state.undoRecord &&
      !window.confirm('新しい組み合わせを生成すると、直前の終了取消はできなくなります。続行しますか？')
    ) {
      return;
    }

    setGenerating(true);
    try {
      const output = createSchedule(createScheduleInput(state));
      dispatch({ type: 'start-round', output });
      setNotice(null);
    } catch (error) {
      const message =
        error instanceof SchedulerValidationError
          ? error.message
          : '組み合わせ生成中にエラーが発生しました。設定を確認して再試行してください。';
      setNotice(message);
    } finally {
      setGenerating(false);
    }
  };

  const handleSelectSlot = (slot: PlayerSlot) => {
    if (!selectedSlot) {
      setSelectedSlot(slot);
      return;
    }

    if (slotKey(selectedSlot) === slotKey(slot)) {
      setSelectedSlot(null);
      return;
    }

    dispatch({ type: 'swap-slots', from: selectedSlot, to: slot });
    setSelectedSlot(null);
  };

  const handleSelectWaitingPlayer = (playerId: PlayerId) => {
    if (!selectedSlot) {
      return;
    }

    dispatch({ type: 'replace-slot', slot: selectedSlot, playerId });
    setSelectedSlot(null);
  };

  const handleCompleteRound = () => {
    if (!state.activeRound) {
      return;
    }

    const incompleteCount = state.activeRound.matches.filter((match) => match.winner === null).length;
    const message =
      incompleteCount > 0
        ? `${incompleteCount}試合が勝敗未入力です。勝利数を加算せずに試合終了しますか？`
        : '現在の試合を終了しますか？';

    if (!window.confirm(message)) {
      return;
    }

    dispatch({ type: 'complete-round' });
    setSelectedSlot(null);
    setNotice(null);
  };

  const handleUndoComplete = () => {
    if (!state.undoRecord) {
      return;
    }

    if (!window.confirm('直前の試合終了を取り消し、試合を復元しますか？')) {
      return;
    }

    dispatch({ type: 'undo-complete' });
    setNotice(null);
  };

  const handleRemovePlayer = (playerId: PlayerId) => {
    if (isPlayerInActiveRound(state, playerId)) {
      setNotice('現在の試合に入っている参加者は削除できません。');
      return;
    }

    if (!window.confirm(`#${playerId} を削除しますか？この参加者に関する履歴も削除されます。`)) {
      return;
    }

    dispatch({ type: 'remove-player', playerId });
  };

  const handleReset = () => {
    if (!window.confirm('全データを初期状態に戻しますか？この操作は取り消せません。')) {
      return;
    }

    dispatch({ type: 'reset' });
    setSelectedSlot(null);
    setNotice(null);
  };

  return (
    <div className="app-shell">
      <Header notice={notice} onDismissNotice={() => setNotice(null)} />
      <main className="app-main">
        {state.selectedTab === 'matches' ? (
          <MatchTab
            state={state}
            selectedSlot={selectedSlot}
            generating={generating}
            onGenerate={handleGenerate}
            onCompleteRound={handleCompleteRound}
            onUndoComplete={handleUndoComplete}
            onSelectSlot={handleSelectSlot}
            onSelectWaitingPlayer={handleSelectWaitingPlayer}
            onSetWinner={(matchId: string, winner: TeamNumber) =>
              dispatch({ type: 'set-winner', matchId, winner })
            }
            onClearWinner={(matchId: string) => dispatch({ type: 'clear-winner', matchId })}
          />
        ) : null}

        {state.selectedTab === 'settings' ? (
          <SettingsTab
            state={state}
            onAddPlayer={() => dispatch({ type: 'add-player' })}
            onRemovePlayer={handleRemovePlayer}
            onToggleBreak={(playerId: PlayerId) => dispatch({ type: 'toggle-break', playerId })}
            onChangeCourtCount={(delta) => dispatch({ type: 'change-court-count', delta })}
            onReset={handleReset}
          />
        ) : null}

        {state.selectedTab === 'history' ? <HistoryTab state={state} /> : null}
      </main>
      <BottomNav selectedTab={state.selectedTab} onSelect={(tab) => dispatch({ type: 'select-tab', tab })} />
    </div>
  );
}

export default App;
