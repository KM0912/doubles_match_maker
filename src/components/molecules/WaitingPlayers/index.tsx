import { useMatchContext } from "../../../contexts/MatchContext";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import { selectedPlayer } from "../../../hooks/useSwapPlayer";
import { Player } from "../../../types";
import { Box, Typography, Grid2, Card, CardContent, Chip, Stack } from "@mui/material";
import { PlayerAvatar } from "../PlayerCard/PlayerAvatar";

type Props = {
  selectedPlayer: selectedPlayer;
  updateSelectedPlayer: (player: selectedPlayer) => void;
};

const WaitingPlayers: React.FC<Props> = ({
  selectedPlayer,
  updateSelectedPlayer,
}) => {
  const { players } = usePlayerContext();
  const { matches, setMatches, isPlayerInMatch } = useMatchContext();

  const handlePlayerClick = (player: Player) => {
    if (!selectedPlayer) return;

    try {
      const team = selectedPlayer.team === 1 ? "team1" : "team2";
      const newMatches = [...matches];
      const currentMatch = newMatches[selectedPlayer.matchIndex];

      if (!currentMatch) {
        throw new Error("Selected match not found");
      }

      currentMatch[team][selectedPlayer.playerIndex] = player;
      setMatches(newMatches);
      updateSelectedPlayer(null);
    } catch (error) {
      console.error("Error swapping players:", error);
    }
  };

  const waitingPlayers = players.filter(
    (player) => !isPlayerInMatch(player.id) && !player.onBreak
  );

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        待機中の選手
      </Typography>

      {waitingPlayers.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", py: 2 }}
        >
          待機中の選手はいません
        </Typography>
      ) : (
        <Grid2 container spacing={1.5}>
          {waitingPlayers.map((player) => (
            <Grid2 size={{ xs: 3, sm: 3, md: 2 }} key={player.id}>
              <Card
                elevation={2}
                onClick={() => handlePlayerClick(player)}
                sx={{
                  cursor: selectedPlayer ? "pointer" : "default",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: selectedPlayer
                      ? "action.hover"
                      : "background.paper",
                    transform: selectedPlayer ? "translateY(-2px)" : "none",
                  },
                  height: "100%",
                  border: "1px solid rgba(56, 96, 240, 0.12)",
                  borderRadius: 3,
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 1, sm: 1.5 },
                    "&:last-child": { pb: { xs: 1, sm: 1.5 } },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <PlayerAvatar
                    player={player}
                    size="medium"
                    sx={{ mr: 0, width: 48, height: 48 }}
                  />
                  <Stack spacing={0.5} alignItems="center">
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      sx={{ fontSize: "0.85rem" }}
                    >
                      選手 #{player.id}
                    </Typography>
                    <Chip
                      size="small"
                      variant="outlined"
                      label={`試合数 ${player.gamesPlayed || 0}`}
                      sx={{
                        fontSize: "0.65rem",
                        color: "primary.main",
                        borderColor: "rgba(56, 96, 240, 0.35)",
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default WaitingPlayers;
