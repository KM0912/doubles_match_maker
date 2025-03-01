import React, { useState } from "react";
import { Player } from "../../../types";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import ConfirmDialog from "../ConfirmDialog";
import {
  Card,
  CardContent,
  Box,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SportsIcon from "@mui/icons-material/Sports";
import DeleteIcon from "@mui/icons-material/Delete";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

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
  const onBreakToggle = (playerId: number) => {
    setOnBreak(playerId, !player.onBreak);
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
          opacity: player.onBreak ? 0.6 : 1,
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
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  mr: 1.5,
                  bgcolor: isPlaying
                    ? "#4caf50"
                    : player.onBreak
                    ? "#9e9e9e"
                    : "#1976d2",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                {player.id}
              </Avatar>

              <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {isPlaying && (
                    <Chip
                      label="試合中"
                      color="success"
                      size="small"
                      sx={{ height: 20, fontSize: "0.625rem", mb: 0.5 }}
                    />
                  )}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title="試合数">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mr: 1.5,
                        fontSize: "0.75rem",
                      }}
                    >
                      <SportsIcon
                        fontSize="small"
                        sx={{ mr: 0.5, fontSize: "0.875rem" }}
                      />
                      {player.gamesPlayed}
                    </Box>
                  </Tooltip>

                  <Tooltip title="勝利数">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "0.75rem",
                      }}
                    >
                      <EmojiEventsIcon
                        fontSize="small"
                        sx={{ mr: 0.5, fontSize: "0.875rem", color: "#f57c00" }}
                      />
                      {player.wins}
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            </Box>

            {!isPlayerInMatch && (
              <Box sx={{ display: "flex" }}>
                <Tooltip title={player.onBreak ? "復帰" : "休憩"}>
                  <IconButton
                    size="small"
                    color={player.onBreak ? "secondary" : "primary"}
                    onClick={() => onBreakToggle(player.id)}
                    sx={{ p: 0.5 }}
                  >
                    {player.onBreak ? (
                      <PlayCircleIcon fontSize="small" />
                    ) : (
                      <PauseCircleIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>

                <Tooltip title="削除">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={handleRemove}
                    sx={{ p: 0.5 }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
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
