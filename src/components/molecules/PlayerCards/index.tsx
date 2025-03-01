import { useMatchContext } from "../../../contexts/MatchContext";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import PlayerCard from "../PlayerCard";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";

const PlayerCards: React.FC = () => {
  const { players, setOnBreak } = usePlayerContext();
  const { isPlayerInMatch } = useMatchContext();
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // プレイヤーを試合中と待機中に分類
  const playingPlayers = players.filter((player) => isPlayerInMatch(player.id));
  const waitingPlayers = players.filter(
    (player) => !isPlayerInMatch(player.id)
  );

  return (
    <Box>
      {/* 試合中のプレイヤー */}
      {playingPlayers.length > 0 && (
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {playingPlayers.map((player) => (
            <Grid item xs={isXsScreen ? 12 : 6} key={player.id}>
              <PlayerCard
                player={player}
                isPlaying={true}
                setOnBreak={setOnBreak}
                isInMatch={true}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* 待機中のプレイヤー */}
      <Grid container spacing={1}>
        {waitingPlayers.map((player) => (
          <Grid item xs={isXsScreen ? 12 : 6} key={player.id}>
            <PlayerCard
              player={player}
              isPlaying={false}
              setOnBreak={setOnBreak}
              isInMatch={false}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlayerCards;
