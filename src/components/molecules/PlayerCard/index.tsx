import React, { useState } from "react";
import { Player } from "../../../types";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import ConfirmDialog from "../ConfirmDialog";
import { Card, CardContent, Box } from "@mui/material";
import { PlayerAvatar } from "./PlayerAvatar";
import { PlayerStats } from "./PlayerStats";
import { PlayerStatus } from "./PlayerStatus";
import { PlayerActions } from "./PlayerActions";

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
  const [showConfirm, setShowConfirm] = useState(false);
  const { removePlayer } = usePlayerContext();

  const handleBreakToggle = () => {
    setOnBreak(player.id, !player.onBreak);
  };

  const handleRemove = () => {
    setShowConfirm(true);
  };

  return (
    <>
      <Card
        elevation={isPlaying ? 2 : 1}
        sx={{
          mb: 1,
          border: isPlaying ? "2px solid #4caf50" : "none",
          transition: "all 0.2s ease",
          borderRadius: 1.5,
        }}
      >
        <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PlayerAvatar
                player={player}
                isPlaying={isPlaying}
                sx={{ mr: 1.5 }}
              />
              <Box>
                <PlayerStatus
                  isPlaying={isPlaying}
                  isOnBreak={player.onBreak}
                />
                <PlayerStats player={player} />
              </Box>
            </Box>

            {!isPlayerInMatch && (
              <PlayerActions
                isOnBreak={player.onBreak}
                onBreakToggle={handleBreakToggle}
                onRemove={handleRemove}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      {showConfirm && (
        <ConfirmDialog
          confirmText="本当に削除しますか？"
          okText="削除"
          cancelText="キャンセル"
          onConfirm={() => {
            removePlayer(player.id);
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default PlayerCard;
