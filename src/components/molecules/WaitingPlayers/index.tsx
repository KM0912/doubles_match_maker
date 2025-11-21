import { useMatchContext } from '../../../contexts/MatchContext';
import { usePlayerContext } from '../../../contexts/PlayerContext';
import { selectedPlayer } from '../../../hooks/useSwapPlayer';
import { Player } from '../../../types';
import { Box, Typography, Grid2, Card, CardContent, useTheme } from '@mui/material';
import { PlayerAvatar } from '../PlayerCard/PlayerAvatar';

type Props = {
  selectedPlayer: selectedPlayer;
  updateSelectedPlayer: (player: selectedPlayer) => void;
};

const WaitingPlayers: React.FC<Props> = ({ selectedPlayer, updateSelectedPlayer }) => {
  const { players } = usePlayerContext();
  const { matches, setMatches, isPlayerInMatch } = useMatchContext();
  const theme = useTheme();

  const handlePlayerClick = (player: Player) => {
    if (!selectedPlayer) return;

    try {
      const team = selectedPlayer.team === 1 ? 'team1' : 'team2';
      const newMatches = [...matches];
      const currentMatch = newMatches[selectedPlayer.matchIndex];

      if (!currentMatch) {
        throw new Error('Selected match not found');
      }

      currentMatch[team][selectedPlayer.playerIndex] = player;
      setMatches(newMatches);
      updateSelectedPlayer(null);
    } catch (error) {
      console.error('Error swapping players:', error);
    }
  };

  const waitingPlayers = players.filter((player) => !isPlayerInMatch(player.id) && !player.onBreak);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant='h6'
        fontWeight={700}
        sx={{
          mb: 2.5,
          fontSize: { xs: '1.125rem', sm: '1.25rem' },
          color: 'text.primary',
        }}
      >
        待機中の選手{selectedPlayer && <Box component='span' sx={{ color: 'primary.main' }}>（タップで入替）</Box>}
      </Typography>

      {waitingPlayers.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            borderRadius: 3,
            bgcolor: `${theme.palette.grey[100]}80`,
            border: `1px dashed ${theme.palette.divider}`,
          }}
        >
          <Typography variant='body2' color='text.secondary' sx={{ fontWeight: 500 }}>
            待機中の選手はいません
          </Typography>
        </Box>
      ) : (
        <Grid2 container spacing={2}>
          {waitingPlayers.map((player) => (
            <Grid2 size={{ xs: 3, sm: 3, md: 2 }} key={player.id}>
              <Card
                elevation={0}
                onClick={() => handlePlayerClick(player)}
                sx={{
                  cursor: selectedPlayer ? 'pointer' : 'default',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderRadius: 3,
                  border: selectedPlayer
                    ? `2px solid ${theme.palette.primary.main}`
                    : `1px solid ${theme.palette.divider}`,
                  bgcolor: selectedPlayer
                    ? `${theme.palette.primary.main}08`
                    : 'background.paper',
                  height: '100%',
                  '&:hover': {
                    bgcolor: selectedPlayer
                      ? `${theme.palette.primary.main}15`
                      : `${theme.palette.primary.main}08`,
                    transform: selectedPlayer ? 'translateY(-6px) scale(1.05)' : 'translateY(-4px)',
                    boxShadow: selectedPlayer
                      ? `0px 12px 24px ${theme.palette.primary.main}25`
                      : '0px 8px 16px rgba(0, 0, 0, 0.1)',
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    '&:last-child': { pb: { xs: 1.5, sm: 2 } },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  <PlayerAvatar player={player} size='small' />
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      mt: 0.5,
                    }}
                  >
                    試合数: {player.gamesPlayed || 0}
                  </Typography>
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
