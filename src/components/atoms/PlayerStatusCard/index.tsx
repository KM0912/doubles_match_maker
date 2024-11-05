import React from "react";
import PlayerCard from "../../molecules/PlayerCard";
import { Player } from "../../../types";

type PlayerStatusCardProps = {
  player: Player;
  gameHistory: Record<number, number>;
  wins: Record<number, number>;
  onBreak: Record<number, boolean>;
  isPlaying: boolean;
  selectedPlayer: boolean;
  setOnBreak: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  isPlayerInMatch: (playerId: number) => boolean;
};

const PlayerStatusCard: React.FC<PlayerStatusCardProps> = ({
  player,
  gameHistory,
  wins,
  onBreak,
  isPlaying,
  selectedPlayer,
  setOnBreak,
  isPlayerInMatch,
}) => {
  return (
    <div
      key={player.id}
      className={`${onBreak[player.id] ? "opacity-50" : ""} ${
        isPlaying ? "ring-2 ring-green-500" : ""
      } relative rounded-lg ${
        selectedPlayer ? "cursor-pointer hover:bg-gray-100" : ""
      } mb-4`}
    >
      <PlayerCard
        key={player.id}
        player={player}
        gameHistory={gameHistory}
        winCount={wins[player.id] || 0}
        onBreakToggle={(playerId) => {
          if (!selectedPlayer) {
            setOnBreak((prev) => ({
              ...prev,
              [playerId]: !prev[playerId],
            }));
          }
        }}
        isPlayerInMatch={isPlayerInMatch}
        isPlayerOnBreak={onBreak[player.id]}
      />

      {isPlaying && (
        <div className="text-center mt-2 text-green-500 font-bold">試合中</div>
      )}
    </div>
  );
};

export default PlayerStatusCard;
