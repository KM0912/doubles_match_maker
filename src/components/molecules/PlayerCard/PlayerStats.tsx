import { Chip, Stack } from "@mui/material";
import SportsIcon from "@mui/icons-material/SportsTennis";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Player } from "../../../types";

type PlayerStatsProps = {
  player: Player;
};

export const PlayerStats = ({ player }: PlayerStatsProps) => {
  return (
    <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
      <Chip
        icon={<SportsIcon sx={{ fontSize: "1rem" }} />}
        label={`試合 ${player.gamesPlayed}`}
        size="small"
        variant="outlined"
        sx={{
          fontSize: "0.7rem",
          px: 0.5,
          color: "primary.main",
          borderColor: "rgba(56, 96, 240, 0.35)",
        }}
      />
      <Chip
        icon={<EmojiEventsIcon sx={{ fontSize: "1rem" }} />}
        label={`勝利 ${player.wins}`}
        size="small"
        variant="outlined"
        sx={{
          fontSize: "0.7rem",
          px: 0.5,
          color: "secondary.main",
          borderColor: "rgba(244, 91, 105, 0.35)",
        }}
      />
    </Stack>
  );
};
