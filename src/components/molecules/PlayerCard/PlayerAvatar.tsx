import { Avatar } from "@mui/material";
import { Player } from "../../../types";

type PlayerAvatarProps = {
  player: Player;
  isPlaying?: boolean;
};

export const PlayerAvatar = ({ player, isPlaying }: PlayerAvatarProps) => {
  return (
    <Avatar
      sx={{
        width: 40,
        height: 40,
        mr: 1.5,
        bgcolor: isPlaying ? "#4caf50" : player.onBreak ? "#9e9e9e" : "#1976d2",
        fontSize: "1rem",
        fontWeight: "bold",
      }}
    >
      {player.id}
    </Avatar>
  );
};
