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
        fontWeight={700}
        sx={{
          mb: 3,
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: `${theme.palette.primary.main}15`,
            borderRadius: 2,
            p: 1,
          }}
        >
          <SportsTennisIcon sx={{ fontSize: '1.75rem', color: 'primary.main' }} />
        </Box>
        現在の試合
      </Typography>
      <Grid container spacing={2.5}>
        {matches.map((match, index) => (
          <Grid item xs={12} sm={6} md={4} key={match.id}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.12)',
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  p: { xs: 2, sm: 2.5 },
                  pb: { xs: 1.5, sm: 2 },
                  bgcolor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography
                    variant='subtitle2'
                    fontWeight={700}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                      color: 'text.primary',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 28,
                        height: 28,
                        borderRadius: 1.5,
                        bgcolor: `${theme.palette.primary.main}15`,
                        color: 'primary.main',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      {index + 1}
                    </Box>
                    コート {index + 1}
                  </Typography>
                </Box>

                <Stack direction='row' alignItems='center' spacing={1} sx={{ width: '100%' }}>
                  <Stack direction='row' spacing={0.75} sx={{ flex: 1 }}>
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

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minWidth: 48,
                    }}
                  >
                    <Typography
                      variant='caption'
                      fontWeight={800}
                      sx={{
                        fontSize: { xs: '0.625rem', sm: '0.6875rem' },
                        color: 'text.secondary',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        bgcolor: `${theme.palette.primary.main}10`,
                        border: `1px solid ${theme.palette.primary.main}20`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      VS
                    </Typography>
                  </Box>

                  <Stack direction='row' spacing={0.75} sx={{ flex: 1 }}>
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
                  p: { xs: 1.5, sm: 2 },
                  pt: 0,
                  flexDirection: 'column',
                  width: '100%',
                  gap: 1.5,
                }}
              >
                {!match.winner ? (
                  <Stack direction='row' spacing={1.5} sx={{ width: '100%' }}>
                    <Button
                      variant='contained'
                      color='primary'
                      size='medium'
                      fullWidth
                      onClick={() => updateMatchWinner(index, 1)}
                      sx={{
                        fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                        py: 1.25,
                        fontWeight: 700,
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: `0px 4px 12px ${theme.palette.primary.main}30`,
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0px 6px 16px ${theme.palette.primary.main}40`,
                        },
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
                        fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                        py: 1.25,
                        fontWeight: 700,
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: `0px 4px 12px ${theme.palette.secondary.main}30`,
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0px 6px 16px ${theme.palette.secondary.main}40`,
                        },
                      }}
                    >
                      チーム2勝利
                    </Button>
                  </Stack>
                ) : (
                  <Stack spacing={1.5} sx={{ width: '100%' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        py: 1.5,
                        borderRadius: 2,
                        bgcolor: `${theme.palette.success.main}10`,
                        border: `2px solid ${theme.palette.success.main}30`,
                      }}
                    >
                      <EmojiEventsIcon sx={{ fontSize: '1.25rem', color: 'success.main' }} />
                      <Typography
                        variant='body2'
                        fontWeight={700}
                        color='success.main'
                        sx={{
                          fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                        }}
                      >
                        チーム{match.winner}の勝利！
                      </Typography>
                    </Box>
                    <Button
                      variant='outlined'
                      color='error'
                      size='medium'
                      startIcon={<UndoIcon />}
                      onClick={() => resetMatchWinner(index)}
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                        py: 1,
                        fontWeight: 600,
                        borderRadius: 2,
                        textTransform: 'none',
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          transform: 'translateY(-1px)',
                        },
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
