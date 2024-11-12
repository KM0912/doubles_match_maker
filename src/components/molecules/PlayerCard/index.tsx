import React from "react";
import { Player } from "../../../types";

type PlayerStatusCardProps = {
  player: Player;
  isPlaying: boolean;
  setOnBreak: (playerId: number, isOnBreak: boolean) => void;
  isInMatch: boolean;
};

const PlayerCard: React.FC<PlayerStatusCardProps> = ({
  player,
  isPlaying,
  setOnBreak,
  isInMatch: isPlayerInMatch,
}) => {
  const onBreakToggle = (playerId: number) => {
    setOnBreak(playerId, !player.onBreak);
  };

  return (
    <div
      key={player.id}
      className={`${player.onBreak ? "opacity-50" : ""} ${
        isPlaying ? "ring-2 ring-green-500" : ""
      } rounded-lg mb-4`}
    >
      <div className="bg-white p-4 rounded shadow flex gap-4 items-center">
        <div className="font-bold">選手 {player.id}</div>
        <div>試合数: {player.gamesPlayed}</div>
        <div>勝利数: {player.wins}</div>

        {!isPlayerInMatch && (
          <div className="ml-auto">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded inline-block ${
                player.onBreak ? "bg-red-500 hover:bg-red-700" : ""
              }`}
              onClick={() => onBreakToggle(player.id)}
            >
              {player.onBreak ? "休憩中" : "休憩"}
            </button>
          </div>
        )}
      </div>

      {isPlaying && (
        <div className="text-center mt-2 text-green-500 font-bold">試合中</div>
      )}
    </div>
  );
};

export default PlayerCard;
