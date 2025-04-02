import { usePlayerContext } from "../../../contexts/PlayerContext";

const PairHistoryTable: React.FC = () => {
  const { players, pairHistory } = usePlayerContext();

  // 最大ペア回数を取得
  const getMaxPairCount = () => {
    let max = 0;
    players.forEach((player) => {
      players.forEach((partner) => {
        if (player.id !== partner.id) {
          const count = pairHistory[player.id]?.[partner.id] || 0;
          max = Math.max(max, count);
        }
      });
    });
    return max;
  };

  // 背景色の濃さを計算
  const getBackgroundColor = (count: number) => {
    const maxCount = getMaxPairCount();
    if (maxCount === 0) return "rgb(255, 255, 255)";
    const intensity = count / maxCount;
    // 青系の色を使用
    return `rgba(59, 130, 246, ${intensity * 0.5})`;
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
                {players.map((partner) => {
                  const count =
                    player.id === partner.id
                      ? 0
                      : pairHistory[player.id]?.[partner.id] || 0;
                  return (
                    <td
                      key={partner.id}
                      className="p-2 border text-center"
                      style={{
                        backgroundColor: getBackgroundColor(count),
                      }}
                    >
                      {player.id === partner.id ? "-" : count}
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

export default PairHistoryTable;
