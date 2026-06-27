import { useEffect, useMemo, useReducer, useState } from 'react';
import { AlertTriangle, Shuffle, X } from 'lucide-react';
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
  const [showNextRoundConfirm, setShowNextRoundConfirm] = useState(false);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    setSelectedSlot(null);
    setShowNextRoundConfirm(false);
  }, [state.selectedTab, state.activeRound?.id]);

  useEffect(() => {
    if (!showNextRoundConfirm) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNextRoundConfirm(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showNextRoundConfirm]);

  const handleGenerate = () => {
    if (state.activeRound) {
      return;
    }

    const availableIds = getAvailablePlayerIds(state);
    if (availableIds.length < 4) {
      setNotice('参加可能人数が4人未満のため、組み合わせを生成できません。');
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

  const handleRequestGenerateNextRound = () => {
    if (!state.activeRound) {
      return;
    }

    setShowNextRoundConfirm(true);
  };

  const handleConfirmGenerateNextRound = () => {
    if (!state.activeRound || generating) {
      return;
    }

    const completedAt = new Date().toISOString();
    const completedState = appReducer(state, { type: 'complete-round', completedAt });

    setGenerating(true);
    try {
      const output = createSchedule(createScheduleInput(completedState));
      dispatch({
        type: 'complete-and-start-round',
        output,
        completedAt,
        createdAt: new Date().toISOString(),
      });
      setSelectedSlot(null);
      setNotice(null);
      setShowNextRoundConfirm(false);
    } catch (error) {
      const message =
        error instanceof SchedulerValidationError
          ? error.message
          : '次の試合生成中にエラーが発生しました。設定を確認して再試行してください。';
      setNotice(message);
    } finally {
      setGenerating(false);
    }
  };

  const nextRoundConfirmMatchCount = state.activeRound?.matches.length ?? 0;
  const nextRoundConfirmIncompleteCount =
    state.activeRound?.matches.filter((match) => match.winner === null).length ?? 0;
  const showIncompleteWarning = state.recordWins && nextRoundConfirmIncompleteCount > 0;

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
            onGenerateNextRound={handleRequestGenerateNextRound}
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
            onToggleRecordWins={(recordWins) => dispatch({ type: 'toggle-record-wins', recordWins })}
            onReset={handleReset}
          />
        ) : null}

        {state.selectedTab === 'history' ? <HistoryTab state={state} /> : null}
      </main>
      <BottomNav selectedTab={state.selectedTab} onSelect={(tab) => dispatch({ type: 'select-tab', tab })} />
      {showNextRoundConfirm ? (
        <div className="dialog-backdrop" role="presentation">
          <section
            className="confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="next-round-confirm-title"
          >
            <div className="dialog-header">
              <span className="dialog-icon" aria-hidden="true">
                <AlertTriangle size={22} />
              </span>
              <button
                type="button"
                className="icon-button"
                aria-label="確認画面を閉じる"
                disabled={generating}
                onClick={() => setShowNextRoundConfirm(false)}
              >
                <X aria-hidden="true" size={20} />
              </button>
            </div>

            <div>
              <p className="dialog-kicker">Next match</p>
              <h2 id="next-round-confirm-title" className="dialog-title">
                次の試合を生成しますか？
              </h2>
              <p className="dialog-copy">
                現在の試合を履歴に反映して、新しい組み合わせに切り替えます。
              </p>
            </div>

            <dl className="confirm-summary">
              <div>
                <dt>確定する試合</dt>
                <dd>{nextRoundConfirmMatchCount}試合</dd>
              </div>
              {showIncompleteWarning ? (
                <div className="warning-summary">
                  <dt>勝敗未入力</dt>
                  <dd>{nextRoundConfirmIncompleteCount}試合</dd>
                </div>
              ) : null}
            </dl>

            {showIncompleteWarning ? (
              <p className="dialog-warning">未入力の試合は勝利数に反映されません。</p>
            ) : null}

            <div className="dialog-actions">
              <button
                type="button"
                className="secondary-button"
                autoFocus
                disabled={generating}
                onClick={() => setShowNextRoundConfirm(false)}
              >
                キャンセル
              </button>
              <button
                type="button"
                className="primary-button"
                disabled={generating}
                onClick={handleConfirmGenerateNextRound}
              >
                <Shuffle aria-hidden="true" size={20} />
                {generating ? '生成中' : '生成する'}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default App;
