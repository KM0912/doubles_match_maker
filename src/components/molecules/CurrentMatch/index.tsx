import { useMatchContext } from "../../../contexts/MatchContext";
import useMatchWinner from "../../../hooks/useMatchWinner";
import { selectedPlayer } from "../../../hooks/useSwapPlayer";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
  Divider,
  Card,
  CardContent,
  CardActions,
  useTheme,
} from "@mui/material";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import UndoIcon from "@mui/icons-material/Undo";

type Props = {
  selectedPlayer: selectedPlayer;
  updateSelectedPlayer: (player: selectedPlayer) => void;
  isPlayerSelected: (
    matchIndex: number,
    team: number,
    playerIndex: number
  ) => boolean;
  swapPlayers: (
    matchIndex: number,
    teamNumber: number,
    playerIndex: number
  ) => void;
};

const CurrentMatch: React.FC<Props> = ({
  selectedPlayer,
  updateSelectedPlayer,
  isPlayerSelected,
  swapPlayers,
}) => {
  const { matches } = useMatchContext();
  const { updateMatchWinner, resetMatchWinner } = useMatchWinner();
  const theme = useTheme();

  const handleClickPlayer = (
    matchIndex: number,
    team: number,
    playerIndex: number
  ) => {
    if (!selectedPlayer) {
      updateSelectedPlayer({ matchIndex, team: team, playerIndex });
      return;
    }

    swapPlayers(matchIndex, team, playerIndex);
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5 }}>
        現在の試合
      </Typography>
      <Grid container spacing={1.5}>
        {matches.map((match, index) => (
          <Grid item xs={12} sm={6} md={4} key={match.id}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  p: { xs: 1, sm: 1.5 },
                  pb: { xs: 0.5, sm: 1 },
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  }}
                >
                  <SportsTennisIcon sx={{ mr: 0.5, fontSize: "0.8rem" }} />
                  コート {index + 1}
                </Typography>

                {/* 試合の組み合わせを1行で表示 */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                  sx={{ width: "100%" }}
                >
                  {/* チーム1 */}
                  <Stack direction="row" spacing={0.5} sx={{ width: "42.5%" }}>
                    <Box
                      sx={{
                        p: 0.5,
                        textAlign: "center",
                        borderRadius: 1,
                        cursor: "pointer",
                        bgcolor: isPlayerSelected(index, 1, 0)
                          ? "primary.light"
                          : "background.paper",
                        border: isPlayerSelected(index, 1, 0)
                          ? `2px solid ${theme.palette.primary.main}`
                          : "1px solid #e0e0e0",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                        width: "50%",
                        minWidth: 0,
                      }}
                      onClick={() => handleClickPlayer(index, 1, 0)}
                    >
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                      >
                        #{match.team1[0].id}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        p: 0.5,
                        textAlign: "center",
                        borderRadius: 1,
                        cursor: "pointer",
                        bgcolor: isPlayerSelected(index, 1, 1)
                          ? "primary.light"
                          : "background.paper",
                        border: isPlayerSelected(index, 1, 1)
                          ? `2px solid ${theme.palette.primary.main}`
                          : "1px solid #e0e0e0",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                        width: "50%",
                        minWidth: 0,
                      }}
                      onClick={() => handleClickPlayer(index, 1, 1)}
                    >
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                      >
                        #{match.team1[1].id}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* VS表示 */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "15%",
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "0.6rem", sm: "0.65rem" },
                        color: "text.secondary",
                        px: 0.5,
                        py: 0.1,
                        borderRadius: 5,
                        bgcolor: "action.hover",
                        whiteSpace: "nowrap",
                      }}
                    >
                      VS
                    </Typography>
                  </Box>

                  {/* チーム2 */}
                  <Stack direction="row" spacing={0.5} sx={{ width: "42.5%" }}>
                    <Box
                      sx={{
                        p: 0.5,
                        textAlign: "center",
                        borderRadius: 1,
                        cursor: "pointer",
                        bgcolor: isPlayerSelected(index, 2, 0)
                          ? "primary.light"
                          : "background.paper",
                        border: isPlayerSelected(index, 2, 0)
                          ? `2px solid ${theme.palette.primary.main}`
                          : "1px solid #e0e0e0",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                        width: "50%",
                        minWidth: 0,
                      }}
                      onClick={() => handleClickPlayer(index, 2, 0)}
                    >
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                      >
                        #{match.team2[0].id}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        p: 0.5,
                        textAlign: "center",
                        borderRadius: 1,
                        cursor: "pointer",
                        bgcolor: isPlayerSelected(index, 2, 1)
                          ? "primary.light"
                          : "background.paper",
                        border: isPlayerSelected(index, 2, 1)
                          ? `2px solid ${theme.palette.primary.main}`
                          : "1px solid #e0e0e0",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                        width: "50%",
                        minWidth: 0,
                      }}
                      onClick={() => handleClickPlayer(index, 2, 1)}
                    >
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                      >
                        #{match.team2[1].id}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>

              <CardActions
                sx={{
                  p: { xs: 0.5, sm: 1 },
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                {!match.winner ? (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      fullWidth
                      onClick={() => updateMatchWinner(index, 1)}
                      sx={{
                        fontSize: { xs: "0.65rem", sm: "0.7rem" },
                        py: 0.5,
                      }}
                    >
                      チーム1勝利
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      fullWidth
                      onClick={() => updateMatchWinner(index, 2)}
                      sx={{
                        fontSize: { xs: "0.65rem", sm: "0.7rem" },
                        py: 0.5,
                      }}
                    >
                      チーム2勝利
                    </Button>
                  </Stack>
                ) : (
                  <Stack spacing={0.5} sx={{ width: "100%" }}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="success.main"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: { xs: "0.7rem", sm: "0.75rem" },
                      }}
                    >
                      <EmojiEventsIcon sx={{ mr: 0.5, fontSize: "0.8rem" }} />
                      チーム{match.winner}の勝利！
                    </Typography>
                    <Button
                      variant="outlined"
                      color="warning"
                      size="small"
                      startIcon={<UndoIcon sx={{ fontSize: "0.8rem" }} />}
                      onClick={() => resetMatchWinner(index)}
                      sx={{
                        fontSize: { xs: "0.65rem", sm: "0.7rem" },
                        py: 0.3,
                      }}
                    >
                      勝敗を修正
                    </Button>
                  </Stack>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CurrentMatch;
