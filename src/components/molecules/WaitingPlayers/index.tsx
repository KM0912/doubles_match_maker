import { useMatchContext } from '../../../contexts/MatchContext';
import { usePlayerContext } from '../../../contexts/PlayerContext';
import { selectedPlayer } from '../../../hooks/useSwapPlayer';
import { Player } from '../../../types';
import { Box, Typography, Grid2, Card, CardContent } from '@mui/material';
import { PlayerAvatar } from '../PlayerCard/PlayerAvatar';

type Props = {
  selectedPlayer: selectedPlayer;
  updateSelectedPlayer: (player: selectedPlayer) => void;
};

const WaitingPlayers: React.FC<Props> = ({ selectedPlayer, updateSelectedPlayer }) => {
  const { players } = usePlayerContext();
  const { matches, setMatches, isPlayerInMatch } = useMatchContext();

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
    <Box sx={{ mt: 3 }}>
      <Typography variant='h6' fontWeight='bold' sx={{ mb: 2 }}>
        待機中の選手{selectedPlayer ? '（タップで入替）' : ''}
      </Typography>

      {waitingPlayers.length === 0 ? (
        <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center', py: 2 }}>
          待機中の選手はいません
        </Typography>
      ) : (
        <Grid2 container spacing={1.5}>
          {waitingPlayers.map((player) => (
            <Grid2 size={{ xs: 3, sm: 3, md: 2 }} key={player.id}>
              <Card
                elevation={1}
                onClick={() => handlePlayerClick(player)}
                sx={{
                  cursor: selectedPlayer ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: selectedPlayer ? 'action.hover' : 'background.paper',
                    transform: selectedPlayer ? 'translateY(-2px)' : 'none',
                  },
                  height: '100%',
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 1, sm: 1.5 },
                    '&:last-child': { pb: { xs: 1, sm: 1.5 } },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant='body1'
                    fontWeight='medium'
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  >
                    <PlayerAvatar player={player} size='small' sx={{ mr: 0 }} />
                  </Typography>
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mt: 0.5,
                      fontSize: '0.7rem',
                    }}
                  >
                    試合数:{player.gamesPlayed || 0}
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
