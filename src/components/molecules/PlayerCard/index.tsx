import { GameHistory, Player } from "../../../types";

type Props = {
  player: Player;
  gameHistory: GameHistory;
  winCount: number;
  onBreakToggle: (playerId: number) => void;
  isPlayerInMatch: (playerId: number) => boolean; // Add this line to the interface
};

const PlayerCard = ({
  player,
  gameHistory,
  winCount,
  onBreakToggle,
  isPlayerInMatch,
}: Props) => {
  const gamesPlayed = gameHistory[player.id] || 0;

  return (
    <div className="bg-white p-4 rounded shadow flex gap-4 items-center">
      <div className="font-bold">選手 {player.id}</div>
      <div>試合数: {gamesPlayed}</div>
      <div>勝利数: {winCount}</div>

      {!isPlayerInMatch(player.id) && (
        <div className="ml-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded inline-block"
            onClick={() => onBreakToggle(player.id)}
          >
            休憩
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
