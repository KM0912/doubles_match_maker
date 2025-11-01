import { Avatar, SxProps, Theme } from "@mui/material";
import { Player } from "../../../types";

type PlayerAvatarProps = {
  player: Player;
  isPlaying?: boolean;
  size?: "small" | "medium" | "large";
  sx?: SxProps<Theme>;
};

export const PlayerAvatar = ({
  player,
  isPlaying,
  size,
  sx,
}: PlayerAvatarProps) => {
  const avatarSize = size === "small" ? 30 : size === "large" ? 50 : 40;
  return (
    <Avatar
      sx={{
        width: avatarSize,
        height: avatarSize,
        bgcolor: isPlaying
          ? "#22c55e"
          : player.onBreak
          ? "#94a3b8"
          : "#3860F0",
        color: "#fff",
        fontSize: "1rem",
        fontWeight: 700,
        border: isPlaying
          ? "2px solid rgba(34, 197, 94, 0.6)"
          : player.onBreak
          ? "2px dashed rgba(148, 163, 184, 0.8)"
          : "2px solid rgba(56, 96, 240, 0.35)",
        boxShadow: isPlaying
          ? "0 8px 20px rgba(34, 197, 94, 0.25)"
          : "0 6px 14px rgba(15, 23, 42, 0.12)",
        ...sx,
      }}
    >
      {player.id}
    </Avatar>
  );
};
