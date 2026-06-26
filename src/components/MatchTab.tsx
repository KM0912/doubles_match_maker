import { RotateCcw, Shuffle, Trophy, Undo2 } from 'lucide-react';
import type { AppState, ActiveMatch, PlayerId, PlayerSlot, TeamNumber } from '../types';
import { getAvailablePlayerIds, getPlayerLabel, getWaitingPlayerIds, slotKey } from '../state/selectors';

type MatchTabProps = {
  state: AppState;
  selectedSlot: PlayerSlot | null;
  generating: boolean;
  onGenerate: () => void;
  onCompleteRound: () => void;
  onUndoComplete: () => void;
  onSelectSlot: (slot: PlayerSlot) => void;
  onSelectWaitingPlayer: (playerId: PlayerId) => void;
  onSetWinner: (matchId: string, winner: TeamNumber) => void;
  onClearWinner: (matchId: string) => void;
};

function PlayerButton({
  slot,
  playerId,
  selectedSlot,
  disabled,
  onSelect,
}: {
  slot: PlayerSlot;
  playerId: PlayerId;
  selectedSlot: PlayerSlot | null;
  disabled: boolean;
  onSelect: (slot: PlayerSlot) => void;
}) {
  const selected = selectedSlot ? slotKey(selectedSlot) === slotKey(slot) : false;
  return (
    <button
      type="button"
      className={selected ? 'player-chip selected' : 'player-chip'}
      disabled={disabled}
      onClick={() => onSelect(slot)}
    >
      {getPlayerLabel(playerId)}
    </button>
  );
}

function TeamView({
  match,
  team,
  recordWins,
  selectedSlot,
  onSelectSlot,
}: {
  match: ActiveMatch;
  team: TeamNumber;
  recordWins: boolean;
  selectedSlot: PlayerSlot | null;
  onSelectSlot: (slot: PlayerSlot) => void;
}) {
  const players = team === 1 ? match.team1 : match.team2;
  const disabled = recordWins && match.winner !== null;
  return (
    <div className={recordWins && match.winner === team ? 'team winning-team' : 'team'}>
      <p className="team-label">チーム{team}</p>
      <div className="team-players">
        {players.map((playerId, index) => (
          <PlayerButton
            key={`${team}-${index}-${playerId}`}
            slot={{ matchId: match.id, team, index: index as 0 | 1 }}
            playerId={playerId}
            selectedSlot={selectedSlot}
            disabled={disabled}
            onSelect={onSelectSlot}
          />
        ))}
      </div>
    </div>
  );
}

function MatchCard({
  match,
  recordWins,
  selectedSlot,
  onSelectSlot,
  onSetWinner,
  onClearWinner,
}: {
  match: ActiveMatch;
  recordWins: boolean;
  selectedSlot: PlayerSlot | null;
  onSelectSlot: (slot: PlayerSlot) => void;
  onSetWinner: (matchId: string, winner: TeamNumber) => void;
  onClearWinner: (matchId: string) => void;
}) {
  return (
    <article className="match-card">
      <div className="match-card-header">
        <span className="court-badge">コート {match.courtNumber}</span>
        {recordWins && match.winner ? <span className="winner-badge">チーム{match.winner}の勝利</span> : null}
      </div>
      <div className="matchup">
        <TeamView
          match={match}
          team={1}
          recordWins={recordWins}
          selectedSlot={selectedSlot}
          onSelectSlot={onSelectSlot}
        />
        <div className="versus">VS</div>
        <TeamView
          match={match}
          team={2}
          recordWins={recordWins}
          selectedSlot={selectedSlot}
          onSelectSlot={onSelectSlot}
        />
      </div>
      {recordWins && match.winner === null ? (
        <div className="winner-actions">
          <button type="button" className="secondary-button" onClick={() => onSetWinner(match.id, 1)}>
            <Trophy aria-hidden="true" size={18} />
            チーム1勝利
          </button>
          <button type="button" className="secondary-button" onClick={() => onSetWinner(match.id, 2)}>
            <Trophy aria-hidden="true" size={18} />
            チーム2勝利
          </button>
        </div>
      ) : null}
      {recordWins && match.winner !== null ? (
        <button type="button" className="secondary-button full-width" onClick={() => onClearWinner(match.id)}>
          <RotateCcw aria-hidden="true" size={18} />
          勝敗を修正
        </button>
      ) : null}
    </article>
  );
}

export function MatchTab({
  state,
  selectedSlot,
  generating,
  onGenerate,
  onCompleteRound,
  onUndoComplete,
  onSelectSlot,
  onSelectWaitingPlayer,
  onSetWinner,
  onClearWinner,
}: MatchTabProps) {
  const availableIds = getAvailablePlayerIds(state);
  const waitingIds = getWaitingPlayerIds(state);
  const canGenerate = !state.activeRound && availableIds.length >= 4;
  const possibleMatches = Math.min(Math.floor(availableIds.length / 4), state.courtCount);

  if (!state.activeRound) {
    return (
      <section className="tab-panel match-tab" aria-labelledby="matches-heading">
        <div className="section-heading">
          <p className="section-kicker">Match</p>
          <h2 id="matches-heading">試合</h2>
        </div>

        {state.undoRecord ? (
          <div className="status-panel complete-panel">
            <p className="status-title">直前の試合を終了しました</p>
            <p className="status-copy">次の組み合わせを作ると、終了取消はできなくなります。</p>
            <div className="split-actions">
              <button type="button" className="primary-button" disabled={!canGenerate || generating} onClick={onGenerate}>
                <Shuffle aria-hidden="true" size={20} />
                次の試合を生成
              </button>
              <button type="button" className="secondary-button" onClick={onUndoComplete}>
                <Undo2 aria-hidden="true" size={18} />
                終了を取り消す
              </button>
            </div>
            {!canGenerate ? <p className="hint-text">参加可能人数が4人未満のため、次の試合は生成できません。</p> : null}
          </div>
        ) : null}

        {!state.undoRecord && availableIds.length < 4 ? (
          <div className="status-panel">
            <p className="status-title">参加可能人数が不足しています</p>
            <p className="status-copy">設定で参加者を追加するか、休憩中の選手を参加に戻してください。</p>
            <dl className="inline-stats">
              <div>
                <dt>参加可能</dt>
                <dd>{availableIds.length}人</dd>
              </div>
              <div>
                <dt>コート</dt>
                <dd>{state.courtCount}面</dd>
              </div>
            </dl>
          </div>
        ) : null}

        {!state.undoRecord && availableIds.length >= 4 ? (
          <div className="status-panel ready-panel">
            <p className="status-title">組み合わせを生成できます</p>
            <dl className="inline-stats">
              <div>
                <dt>参加可能</dt>
                <dd>{availableIds.length}人</dd>
              </div>
              <div>
                <dt>コート</dt>
                <dd>{state.courtCount}面</dd>
              </div>
              <div>
                <dt>生成予定</dt>
                <dd>{possibleMatches}試合</dd>
              </div>
            </dl>
            <button type="button" className="primary-button full-width" disabled={!canGenerate || generating} onClick={onGenerate}>
              <Shuffle aria-hidden="true" size={20} />
              組み合わせ生成
            </button>
          </div>
        ) : null}
      </section>
    );
  }

  const incompleteCount = state.activeRound.matches.filter((match) => match.winner === null).length;

  return (
    <section className="tab-panel match-tab" aria-labelledby="current-matches-heading">
      <div className="section-heading">
        <p className="section-kicker">Live round</p>
        <h2 id="current-matches-heading">現在の試合</h2>
      </div>

      <div className="match-list">
        {state.activeRound.matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            recordWins={state.recordWins}
            selectedSlot={selectedSlot}
            onSelectSlot={onSelectSlot}
            onSetWinner={onSetWinner}
            onClearWinner={onClearWinner}
          />
        ))}
      </div>

      <section className="waiting-section" aria-labelledby="waiting-heading">
        <div className="subheading-row">
          <h3 id="waiting-heading">待機中の選手</h3>
          {selectedSlot ? <span className="small-badge">入替先を選択中</span> : null}
        </div>
        {waitingIds.length > 0 ? (
          <div className="waiting-list">
            {waitingIds.map((playerId) => (
              <button
                key={playerId}
                type="button"
                className="waiting-chip"
                disabled={!selectedSlot}
                onClick={() => onSelectWaitingPlayer(playerId)}
              >
                {getPlayerLabel(playerId)}
              </button>
            ))}
          </div>
        ) : (
          <p className="empty-text">待機中の選手はいません。</p>
        )}
      </section>

      <div className="action-bar">
        {state.recordWins && incompleteCount > 0 ? (
          <p className="hint-text">{incompleteCount}試合が勝敗未入力です。</p>
        ) : null}
        <button type="button" className="primary-button full-width" onClick={onCompleteRound}>
          試合終了
        </button>
      </div>
    </section>
  );
}
