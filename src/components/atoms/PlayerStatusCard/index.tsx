import React from "react";
import PlayerCard from "../../molecules/PlayerCard";
import { Player } from "../../../types";

type PlayerStatusCardProps = {
  player: Player;
  isPlaying: boolean;
  setOnBreak: (playerId: number, isOnBreak: boolean) => void;
  isInMatch: boolean;
};

const PlayerStatusCard: React.FC<PlayerStatusCardProps> = ({
  player,
  isPlaying,
  setOnBreak,
  isInMatch: isPlayerInMatch,
}) => {
  return (
    <div
      key={player.id}
      className={`${player.onBreak ? "opacity-50" : ""} ${
        isPlaying ? "ring-2 ring-green-500" : ""
      } relative rounded-lg mb-4`}
    >
      <PlayerCard
        key={player.id}
        player={player}
        winCount={player.wins}
        onBreakToggle={(playerId) => setOnBreak(playerId, !player.onBreak)}
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
