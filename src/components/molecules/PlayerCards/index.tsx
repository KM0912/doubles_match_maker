import { useMatchContext } from "../../../contexts/MatchContext";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import PlayerCard from "../PlayerCard";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";

const PlayerCards: React.FC = () => {
  const { players, setOnBreak } = usePlayerContext();
  const { isPlayerInMatch } = useMatchContext();
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // プレイヤーをID順にソート
  const sortedPlayers = [...players].sort((a, b) => a.id - b.id);

  return (
    <Box>
      <Grid container spacing={1}>
        {sortedPlayers.map((player) => (
          <Grid item xs={isXsScreen ? 12 : 6} key={player.id}>
            <PlayerCard
              player={player}
              isPlaying={isPlayerInMatch(player.id)}
              setOnBreak={setOnBreak}
              isInMatch={isPlayerInMatch(player.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlayerCards;
