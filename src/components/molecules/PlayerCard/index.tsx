import React, { useState } from "react";
import { Player } from "../../../types";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import ConfirmDialog from "../ConfirmDialog";
import {
  Button,
  Chip,
  Card,
  CardContent,
  Typography,
  Box,
  Badge,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
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
        elevation={isPlaying ? 3 : 1}
        sx={{
          mb: 2,
          opacity: player.onBreak ? 0.6 : 1,
          border: isPlaying ? "2px solid #4caf50" : "none",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: 3,
          },
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Badge
              color={isPlaying ? "success" : "primary"}
              badgeContent={isPlaying ? "試合中" : null}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <PersonIcon sx={{ mr: 1 }} />
                選手 {player.id}
              </Typography>
            </Badge>
          </Box>

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Chip
              icon={<SportsIcon />}
              label={`試合数: ${player.gamesPlayed}`}
              variant="outlined"
              size="small"
            />
            <Chip
              icon={<EmojiEventsIcon />}
              label={`勝利数: ${player.wins}`}
              variant="outlined"
              color="primary"
              size="small"
            />
          </Box>

          {!isPlayerInMatch && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="outlined"
                color={player.onBreak ? "secondary" : "primary"}
                size="small"
                onClick={() => onBreakToggle(player.id)}
                startIcon={
                  player.onBreak ? <PlayCircleIcon /> : <PauseCircleIcon />
                }
              >
                {player.onBreak ? "復帰" : "休憩"}
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleRemove}
                startIcon={<DeleteIcon />}
              >
                削除
              </Button>
            </Box>
          )}
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
