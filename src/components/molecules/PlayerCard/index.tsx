import { Player } from "../../../types";

type Props = {
  player: Player;
  winCount: number;
  onBreakToggle: (playerId: number) => void;
  isPlayerInMatch: boolean;
  isPlayerOnBreak: boolean;
};

const PlayerCard = ({
  player,
  winCount,
  onBreakToggle,
  isPlayerInMatch,
  isPlayerOnBreak,
}: Props) => {
  return (
    <div className="bg-white p-4 rounded shadow flex gap-4 items-center">
      <div className="font-bold">選手 {player.id}</div>
      <div>試合数: {player.gamesPlayed}</div>
      <div>勝利数: {winCount}</div>

      {!isPlayerInMatch && (
        <div className="ml-auto">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded inline-block ${
              isPlayerOnBreak ? "bg-red-500 hover:bg-red-700" : ""
            }`}
            onClick={() => onBreakToggle(player.id)}
          >
            {isPlayerOnBreak ? "休憩中" : "休憩"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
