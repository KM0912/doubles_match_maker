import { Coffee, Minus, Plus, RotateCcw, Trash2, UserPlus } from 'lucide-react';
import type { AppState, PlayerId } from '../types';
import { getPlayerLabel, isPlayerInActiveRound } from '../state/selectors';

type SettingsTabProps = {
  state: AppState;
  onAddPlayer: () => void;
  onRemovePlayer: (playerId: PlayerId) => void;
  onToggleBreak: (playerId: PlayerId) => void;
  onChangeCourtCount: (delta: 1 | -1) => void;
  onToggleRecordWins: (recordWins: boolean) => void;
  onReset: () => void;
};

export function SettingsTab({
  state,
  onAddPlayer,
  onRemovePlayer,
  onToggleBreak,
  onChangeCourtCount,
  onToggleRecordWins,
  onReset,
}: SettingsTabProps) {
  const sortedPlayers = [...state.players].sort((a, b) => a.id - b.id);

  return (
    <section className="tab-panel settings-tab" aria-labelledby="settings-heading">
      <div className="section-heading">
        <p className="section-kicker">Setup</p>
        <h2 id="settings-heading">設定</h2>
      </div>

      <section className="control-section" aria-labelledby="court-heading">
        <div>
          <h3 id="court-heading">コート数</h3>
          <p className="hint-text">次回の生成から反映されます。</p>
        </div>
        <div className="stepper" aria-label="コート数">
          <button
            type="button"
            className="icon-button"
            disabled={state.courtCount <= 1}
            onClick={() => onChangeCourtCount(-1)}
            aria-label="コート数を減らす"
          >
            <Minus aria-hidden="true" size={18} />
          </button>
          <span className="stepper-value">{state.courtCount}</span>
          <button
            type="button"
            className="icon-button"
            disabled={state.courtCount >= 10}
            onClick={() => onChangeCourtCount(1)}
            aria-label="コート数を増やす"
          >
            <Plus aria-hidden="true" size={18} />
          </button>
        </div>
      </section>

      <section className="control-section" aria-labelledby="record-wins-heading">
        <div>
          <h3 id="record-wins-heading">勝敗記録</h3>
          <p className="hint-text">オンにすると試合ごとの勝敗入力と勝利数の表示を使えます。</p>
        </div>
        <label className="switch-control">
          <input
            type="checkbox"
            checked={state.recordWins}
            onChange={(event) => onToggleRecordWins(event.currentTarget.checked)}
          />
          <span className="switch-track" aria-hidden="true">
            <span className="switch-thumb" />
          </span>
          <span className="switch-label">{state.recordWins ? 'オン' : 'オフ'}</span>
        </label>
      </section>

      <section className="control-section stacked" aria-labelledby="players-heading">
        <div className="subheading-row">
          <div>
            <h3 id="players-heading">参加者</h3>
            <p className="hint-text">番号で管理します。</p>
          </div>
          <button type="button" className="secondary-button" onClick={onAddPlayer}>
            <UserPlus aria-hidden="true" size={18} />
            参加者を追加
          </button>
        </div>

        <div className="player-list">
          {sortedPlayers.map((player) => {
            const inMatch = isPlayerInActiveRound(state, player.id);
            const status = inMatch ? '試合中' : player.onBreak ? '休憩中' : '参加中';
            return (
              <article key={player.id} className={inMatch ? 'player-card in-match' : 'player-card'}>
                <div className="player-card-main">
                  <div>
                    <p className="player-number">{getPlayerLabel(player.id)}</p>
                    <p className="player-status">{status}</p>
                  </div>
                  <dl className={state.recordWins ? 'player-stats' : 'player-stats single-stat'}>
                    <div>
                      <dt>試合</dt>
                      <dd>{player.gamesPlayed}</dd>
                    </div>
                    {state.recordWins ? (
                      <div>
                        <dt>勝利</dt>
                        <dd>{player.wins}</dd>
                      </div>
                    ) : null}
                  </dl>
                </div>
                <div className="player-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    disabled={inMatch}
                    onClick={() => onToggleBreak(player.id)}
                  >
                    <Coffee aria-hidden="true" size={18} />
                    {player.onBreak ? '参加に戻す' : '休憩'}
                  </button>
                  <button
                    type="button"
                    className="danger-button"
                    disabled={inMatch}
                    onClick={() => onRemovePlayer(player.id)}
                  >
                    <Trash2 aria-hidden="true" size={18} />
                    削除
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="reset-section" aria-labelledby="reset-heading">
        <div>
          <h3 id="reset-heading">データリセット</h3>
          <p className="hint-text">試合、履歴、設定、終了取消データを初期化します。</p>
        </div>
        <button type="button" className="danger-button" onClick={onReset}>
          <RotateCcw aria-hidden="true" size={18} />
          リセット
        </button>
      </section>
    </section>
  );
}
