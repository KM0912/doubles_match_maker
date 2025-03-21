import { usePlayerContext } from "../../../contexts/PlayerContext";

const PairHistoryTable: React.FC = () => {
  const { players, pairHistory } = usePlayerContext();
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
                {players.map((partner) => (
                  <td key={partner.id} className="p-2 border text-center">
                    {player.id === partner.id
                      ? "-"
                      : pairHistory[player.id]?.[partner.id] || 0}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default PairHistoryTable;
