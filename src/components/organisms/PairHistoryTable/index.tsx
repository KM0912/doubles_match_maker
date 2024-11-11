import { useState } from "react";
import { usePlayerContext } from "../../../contexts/PlayerContext";

const PairHistoryTable: React.FC = () => {
  const { players, pairHistory } = usePlayerContext();
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setIsHistoryOpen(!isHistoryOpen)}
        className="flex justify-between items-center w-full bg-gray-100 p-4 rounded-lg mb-2"
      >
        <h2 className="text-xl font-bold">ペア履歴</h2>
        <i
          className={`fas ${
            isHistoryOpen ? "fa-chevron-up" : "fa-chevron-down"
          }`}
        ></i>
      </button>

      {isHistoryOpen && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="p-2 border">選手</th>
                {players.map((player) => (
                  <th key={player.id} className="p-2 border">
                    No.{player.id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id}>
                  <td className="p-2 border font-bold">No.{player.id}</td>
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
      )}
    </>
  );
};
export default PairHistoryTable;
