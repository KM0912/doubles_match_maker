import type { AppState, History, PlayerId } from '../types';
import { getHistoryValue, getMaxHistoryValue } from '../state/history';
import { getPlayerLabel } from '../state/selectors';

type HistoryTabProps = {
  state: AppState;
};

function intensityStyle(value: number, max: number) {
  if (value <= 0 || max <= 0) {
    return undefined;
  }

  const opacity = Math.min(0.78, 0.18 + (value / max) * 0.5);
  return {
    backgroundColor: `rgba(15, 107, 88, ${opacity})`,
    color: value / max > 0.55 ? '#ffffff' : '#13251f',
  };
}

function HistoryMatrix({
  title,
  history,
  playerIds,
}: {
  title: string;
  history: History;
  playerIds: PlayerId[];
}) {
  const max = getMaxHistoryValue(history);

  return (
    <details className="history-accordion" open>
      <summary>{title}</summary>
      {max === 0 ? (
        <p className="empty-text">次の試合を生成すると履歴が表示されます。</p>
      ) : (
        <div className="matrix-scroll" role="region" aria-label={title} tabIndex={0}>
          <table className="history-matrix">
            <thead>
              <tr>
                <th scope="col" className="corner-cell">
                  選手
                </th>
                {playerIds.map((playerId) => (
                  <th key={playerId} scope="col">
                    {getPlayerLabel(playerId)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {playerIds.map((rowId) => (
                <tr key={rowId}>
                  <th scope="row">{getPlayerLabel(rowId)}</th>
                  {playerIds.map((colId) => {
                    const value = rowId === colId ? null : getHistoryValue(history, rowId, colId);
                    return (
                      <td key={colId} style={value === null ? undefined : intensityStyle(value, max)}>
                        {value === null ? '-' : value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </details>
  );
}

export function HistoryTab({ state }: HistoryTabProps) {
  const playerIds = state.players.map((player) => player.id).sort((a, b) => a - b);

  return (
    <section className="tab-panel history-tab" aria-labelledby="history-heading">
      <div className="section-heading">
        <p className="section-kicker">History</p>
        <h2 id="history-heading">履歴</h2>
      </div>

      <HistoryMatrix title="ペア履歴" history={state.pairHistory} playerIds={playerIds} />
      <HistoryMatrix title="対戦履歴" history={state.opponentHistory} playerIds={playerIds} />
    </section>
  );
}
