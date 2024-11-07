import React from "react";
import PlayerCard from "../../molecules/PlayerCard";
import { Player } from "../../../types";

type PlayerStatusCardProps = {
  player: Player;
  gameHistory: Record<number, number>;
  isPlaying: boolean;
  selectedPlayer: boolean;
  setOnBreak: (playerId: number, isOnBreak: boolean) => void;
  isPlayerInMatch: (playerId: number) => boolean;
};

const PlayerStatusCard: React.FC<PlayerStatusCardProps> = ({
  player,
  gameHistory,
  isPlaying,
  selectedPlayer,
  setOnBreak,
  isPlayerInMatch,
}) => {
  return (
    <div
      key={player.id}
      className={`${player.onBreak ? "opacity-50" : ""} ${
        isPlaying ? "ring-2 ring-green-500" : ""
      } relative rounded-lg ${
        selectedPlayer ? "cursor-pointer hover:bg-gray-100" : ""
      } mb-4`}
    >
      <PlayerCard
        key={player.id}
        player={player}
        gameHistory={gameHistory}
        winCount={player.wins}
        onBreakToggle={(playerId) => {
          if (!selectedPlayer) {
            setOnBreak(playerId, !player.onBreak);
          }
        }}
        isPlayerInMatch={isPlayerInMatch}
        isPlayerOnBreak={player.onBreak}
      />

      {isPlaying && (
        <div className="text-center mt-2 text-green-500 font-bold">試合中</div>
      )}
    </div>
  );
};

export default PlayerStatusCard;
