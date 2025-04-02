import { usePlayerContext } from "../../../contexts/PlayerContext";

const OpponentHistoryTable: React.FC = () => {
  const { players, opponentHistory } = usePlayerContext();

  // 最大対戦回数を取得
  const getMaxOpponentCount = () => {
    let max = 0;
    players.forEach((player) => {
      players.forEach((opponent) => {
        if (player.id !== opponent.id) {
          const count = opponentHistory[player.id]?.[opponent.id] || 0;
          max = Math.max(max, count);
        }
      });
    });
    return max;
  };

  // 背景色の濃さを計算
  const getBackgroundColor = (count: number) => {
    const maxCount = getMaxOpponentCount();
    if (maxCount === 0) return "rgb(255, 255, 255)";
    const intensity = count / maxCount;
    // 赤系の色を使用（対戦履歴は赤系で区別）
    return `rgba(239, 68, 68, ${intensity * 0.5})`;
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="p-2 border min-w-[60px] bg-gray-100 font-bold">
                選手
              </th>
              {players.map((player) => (
                <th key={player.id} className="p-2 border bg-gray-100">
                  #{player.id}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td className="p-2 border font-bold bg-gray-50">
                  #{player.id}
                </td>
                {players.map((opponent) => {
                  const count =
                    player.id === opponent.id
                      ? 0
                      : opponentHistory[player.id]?.[opponent.id] || 0;
                  return (
                    <td
                      key={opponent.id}
                      className="p-2 border text-center"
                      style={{
                        backgroundColor: getBackgroundColor(count),
                      }}
                    >
                      {player.id === opponent.id ? "-" : count}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OpponentHistoryTable;
