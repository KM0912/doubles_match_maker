import { useMatchContext } from "../../../contexts/MatchContext";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import useSwapPlayer from "../../../hooks/useSwapPlayer";

const WaitingPlayers = () => {
  const { players } = usePlayerContext();
  const { matches, setMatches, isPlayerInMatch } = useMatchContext();
  const { selectedPlayer, setSelectedPlayer } = useSwapPlayer();
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">待機中の選手</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {players
          .filter((player) => !isPlayerInMatch(player.id) && !player.onBreak)
          .map((player) => (
            <div
              key={player.id}
              className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100"
              onClick={() => {
                if (selectedPlayer) {
                  const team = selectedPlayer.team === 1 ? "team1" : "team2";
                  const newMatches = [...matches];
                  const currentMatch = newMatches[selectedPlayer.matchIndex];
                  currentMatch[team][selectedPlayer.playerIndex] = player;
                  setMatches(newMatches);
                  setSelectedPlayer(null);
                }
              }}
            >
              <div className="text-center">選手{player.id}</div>
              <div className="text-center text-gray-500">
                試合数: {player.gamesPlayed || 0}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WaitingPlayers;
