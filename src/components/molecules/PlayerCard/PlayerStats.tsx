import { Box, Tooltip } from "@mui/material";
import SportsIcon from "@mui/icons-material/SportsTennis";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Player } from "../../../types";

type PlayerStatsProps = {
  player: Player;
};

export const PlayerStats = ({ player }: PlayerStatsProps) => {
  return (
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
          <SportsIcon fontSize="small" sx={{ mr: 0.5, fontSize: "0.875rem" }} />
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
  );
};
