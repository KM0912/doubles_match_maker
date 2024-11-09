import { useMatchContext } from "../../../contexts/MatchContext";
import useMatchWinner from "../../../hooks/useMatchWinner";

const CurrentMatch: React.FC = () => {
  const { matches, selectedPlayer, swapPlayers, setSelectedPlayer } =
    useMatchContext();
  const { updateMatchWinner, resetMatchWinner } = useMatchWinner();

  const isSelected = (
    matchIndex: number,
    team: number,
    playerIndex: number
  ) => {
    return (
      selectedPlayer &&
      selectedPlayer.matchIndex === matchIndex &&
      selectedPlayer.team === team &&
      selectedPlayer.playerIndex === playerIndex
    );
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">現在の試合</h2>
      <div className="flex flex-col md:flex-row flex-wrap gap-2 md:gap-4">
        {matches.map((match, index) => (
          <div
            key={match.id}
            className="bg-white p-4 rounded shadow w-full md:flex-1 min-w-[250px]"
          >
            <div className="text-lg font-bold mb-2">コート {index + 1}</div>
            <div className="flex justify-center items-center gap-4 md:gap-8">
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={`w-full text-center cursor-pointer hover:bg-gray-100 p-2 rounded ${
                    isSelected(index, 1, 0)
                      ? "bg-blue-100 ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => {
                    if (selectedPlayer) {
                      swapPlayers(index, 1, 0);
                    } else {
                      setSelectedPlayer({
                        matchIndex: index,
                        team: 1,
                        playerIndex: 0,
                      });
                    }
                  }}
                >
                  選手{match.team1[0].id}
                </div>
                <div
                  className={`w-full text-center cursor-pointer hover:bg-gray-100 p-2 rounded ${
                    isSelected(index, 1, 1)
                      ? "bg-blue-100 ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => {
                    if (selectedPlayer) {
                      swapPlayers(index, 1, 1);
                    } else {
                      setSelectedPlayer({
                        matchIndex: index,
                        team: 1,
                        playerIndex: 1,
                      });
                    }
                  }}
                >
                  選手{match.team1[1].id}
                </div>
              </div>

              <div className="text-center font-bold">vs</div>

              <div className="flex flex-col items-center space-y-2">
                <div
                  className={`w-full text-center cursor-pointer hover:bg-gray-100 p-2 rounded ${
                    isSelected(index, 2, 0)
                      ? "bg-blue-100 ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => {
                    if (selectedPlayer) {
                      swapPlayers(index, 2, 0);
                    } else {
                      setSelectedPlayer({
                        matchIndex: index,
                        team: 2,
                        playerIndex: 0,
                      });
                    }
                  }}
                >
                  選手{match.team2[0].id}
                </div>
                <div
                  className={`w-full text-center cursor-pointer hover:bg-gray-100 p-2 rounded ${
                    isSelected(index, 2, 1)
                      ? "bg-blue-100 ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => {
                    if (selectedPlayer) {
                      swapPlayers(index, 2, 1);
                    } else {
                      setSelectedPlayer({
                        matchIndex: index,
                        team: 2,
                        playerIndex: 1,
                      });
                    }
                  }}
                >
                  選手{match.team2[1].id}
                </div>
              </div>
            </div>

            {!match.winner && (
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => updateMatchWinner(index, 1)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  チーム1勝利
                </button>
                <button
                  onClick={() => updateMatchWinner(index, 2)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  チーム2勝利
                </button>
              </div>
            )}

            {match.winner && (
              <div className="text-center mt-4 font-bold text-green-500">
                チーム{match.winner}の勝利！
              </div>
            )}

            {match.winner && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => resetMatchWinner(index)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  勝敗を修正
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CurrentMatch;
