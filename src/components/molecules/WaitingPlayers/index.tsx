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
        {selectedPlayer ? (
          <>
            <span style={{ marginRight: '0.5rem' }}>🔄</span>
            入れ替え先を選択してください
          </>
        ) : (
          <>
            <span style={{ marginRight: '0.5rem' }}>⏸️</span>
            待機中の選手 ({waitingPlayers.length}人)
          </>
        )}
      </Typography>

      {waitingPlayers.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            px: 2,
            borderRadius: 2,
            bgcolor: 'action.hover',
          }}
        >
          <Typography variant='body2' color='text.secondary'>
            {selectedPlayer ? '入れ替え可能な選手がいません' : '待機中の選手はいません'}
          </Typography>
        </Box>
      ) : (
        <Grid2 container spacing={1.5}>
          {waitingPlayers.map((player) => (
            <Grid2 size={{ xs: 3, sm: 3, md: 2 }} key={player.id}>
              <Card
                elevation={selectedPlayer ? 3 : 1}
                onClick={() => handlePlayerClick(player)}
                sx={{
                  cursor: selectedPlayer ? 'pointer' : 'default',
                  transition: 'all 0.3s ease',
                  border: selectedPlayer
                    ? `2px solid ${theme.palette.primary.main}`
                    : `1px solid ${theme.palette.divider}`,
                  '&:hover': {
                    bgcolor: selectedPlayer ? 'primary.light' : 'action.hover',
                    transform: selectedPlayer ? 'translateY(-4px) scale(1.02)' : 'translateY(-2px)',
                    boxShadow: selectedPlayer ? 6 : 2,
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
