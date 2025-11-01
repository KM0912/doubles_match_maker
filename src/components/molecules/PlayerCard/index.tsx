import React, { useState } from "react";
import { Player } from "../../../types";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import ConfirmDialog from "../ConfirmDialog";
import { Card, CardContent, Box, Typography, useTheme } from "@mui/material";
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
  const theme = useTheme();

  const handleBreakToggle = () => {
    setOnBreak(player.id, !player.onBreak);
  };

  const handleRemove = () => {
    setShowConfirm(true);
  };

  return (
    <>
      <Card
        elevation={isPlaying ? 3 : 1}
        sx={{
          mb: 1.5,
          border: `1px solid ${
            isPlaying
              ? theme.palette.success.light
              : "rgba(15, 23, 42, 0.08)"
          }`,
          transition: "all 0.25s ease",
          borderRadius: 2,
          background: isPlaying
            ? "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(255,255,255,0.95))"
            : "rgba(255,255,255,0.95)",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 1.5, sm: 2 },
            "&:last-child": { pb: { xs: 1.5, sm: 2 } },
          }}
        >
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
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    fontSize: { xs: "0.85rem", sm: "0.9rem" },
                  }}
                >
                  選手 #{player.id}
                </Typography>
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
