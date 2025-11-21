import { useMatchContext } from '../../../contexts/MatchContext';
import useMatchWinner from '../../../hooks/useMatchWinner';
import { selectedPlayer } from '../../../hooks/useSwapPlayer';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  Card,
  CardContent,
  CardActions,
  useTheme,
} from '@mui/material';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import UndoIcon from '@mui/icons-material/Undo';
import PlayerBox from '../../atoms/PlayerBox';

type Props = {
  selectedPlayer: selectedPlayer;
  updateSelectedPlayer: (player: selectedPlayer) => void;
  isPlayerSelected: (matchIndex: number, team: number, playerIndex: number) => boolean;
  swapPlayers: (matchIndex: number, teamNumber: number, playerIndex: number) => void;
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

  const handleClickPlayer = (matchIndex: number, team: number, playerIndex: number) => {
    if (!selectedPlayer) {
      updateSelectedPlayer({ matchIndex, team: team, playerIndex });
      return;
    }

    swapPlayers(matchIndex, team, playerIndex);
  };

  return (
    <Box>
      <Typography
        variant='h6'
        fontWeight='bold'
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
        }}
      >
        <SportsTennisIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
        現在の試合 ({matches.length}コート)
      </Typography>
      <Grid container spacing={2}>
        {matches.map((match, index) => (
          <Grid item xs={12} sm={6} md={4} key={match.id}>
            <Card
              elevation={match.winner ? 4 : 2}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: match.winner
                  ? `2px solid ${theme.palette.success.main}`
                  : `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  p: { xs: 1, sm: 1.5 },
                  pb: { xs: 0.5, sm: 1 },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1.5,
                  }}
                >
                  <Typography
                    variant='subtitle2'
                    fontWeight='bold'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: { xs: '0.85rem', sm: '0.95rem' },
                      color: 'text.primary',
                    }}
                  >
                    <SportsTennisIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
                    コート {index + 1}
                  </Typography>
                  {match.winner && (
                    <Box
                      sx={{
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        bgcolor: 'success.light',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <EmojiEventsIcon sx={{ fontSize: '0.75rem', mr: 0.25 }} />
                      <Typography variant='caption' sx={{ fontSize: '0.65rem', fontWeight: 600 }}>
                        完了
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* 試合の組み合わせを1行で表示 */}
                <Stack direction='row' alignItems='center' spacing={0.5} sx={{ width: '100%' }}>
                  {/* チーム1 */}
                  <Stack direction='row' spacing={0.5} sx={{ width: '42.5%' }}>
                    <PlayerBox
                      match={match}
                      index={index}
                      team={1}
                      playerIndex={0}
                      isPlayerSelected={isPlayerSelected}
                      handleClickPlayer={handleClickPlayer}
                    />
                    <PlayerBox
                      match={match}
                      index={index}
                      team={1}
                      playerIndex={1}
                      isPlayerSelected={isPlayerSelected}
                      handleClickPlayer={handleClickPlayer}
                    />
                  </Stack>

                  {/* VS表示 */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '15%',
                    }}
                  >
                    <Typography
                      variant='caption'
                      fontWeight='bold'
                      sx={{
                        fontSize: { xs: '0.6rem', sm: '0.65rem' },
                        color: 'text.secondary',
                        px: 0.5,
                        py: 0.1,
                        borderRadius: 5,
                        bgcolor: 'action.hover',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      VS
                    </Typography>
                  </Box>

                  {/* チーム2 */}
                  <Stack direction='row' spacing={0.5} sx={{ width: '42.5%' }}>
                    <PlayerBox
                      match={match}
                      index={index}
                      team={2}
                      playerIndex={0}
                      isPlayerSelected={isPlayerSelected}
                      handleClickPlayer={handleClickPlayer}
                    />
                    <PlayerBox
                      match={match}
                      index={index}
                      team={2}
                      playerIndex={1}
                      isPlayerSelected={isPlayerSelected}
                      handleClickPlayer={handleClickPlayer}
                    />
                  </Stack>
                </Stack>
              </CardContent>

              <CardActions
                sx={{
                  p: { xs: 0.5, sm: 1 },
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                {!match.winner ? (
                  <Stack
                    direction='row'
                    spacing={1}
                    sx={{ width: '100%', justifyContent: 'space-between' }}
                  >
                    <Button
                      variant='contained'
                      color='primary'
                      size='medium'
                      fullWidth
                      onClick={() => updateMatchWinner(index, 1)}
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.85rem' },
                        py: 1,
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: 1.5,
                      }}
                    >
                      チーム1勝利
                    </Button>
                    <Button
                      variant='contained'
                      color='secondary'
                      size='medium'
                      fullWidth
                      onClick={() => updateMatchWinner(index, 2)}
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.85rem' },
                        py: 1,
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: 1.5,
                      }}
                    >
                      チーム2勝利
                    </Button>
                  </Stack>
                ) : (
                  <Stack spacing={0.5} sx={{ width: '100%' }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        bgcolor: 'success.light',
                        textAlign: 'center',
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant='body2'
                        fontWeight='bold'
                        color='success.dark'
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: { xs: '0.85rem', sm: '0.95rem' },
                        }}
                      >
                        <EmojiEventsIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
                        チーム{match.winner}の勝利！
                      </Typography>
                    </Box>
                    <Button
                      variant='outlined'
                      color='error'
                      size='small'
                      startIcon={<UndoIcon />}
                      onClick={() => resetMatchWinner(index)}
                      fullWidth
                      sx={{
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        py: 0.75,
                        textTransform: 'none',
                        borderRadius: 1.5,
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
