import { usePlayerContext } from '../../../contexts/PlayerContext';
import { useMatchContext } from '../../../contexts/MatchContext';
import { Box, Paper, Typography, Grid2, useTheme } from '@mui/material';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StadiumIcon from '@mui/icons-material/Stadium';

interface QuickStatsProps {
  courts: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({ courts }) => {
  const { players, availablePlayers } = usePlayerContext();
  const { matches } = useMatchContext();
  const theme = useTheme();

  const totalWins = players.reduce((sum, p) => sum + p.wins, 0);
  const playersInMatch = matches.reduce(
    (acc, match) => [...acc, ...match.team1, ...match.team2],
    [] as typeof players,
  ).length;

  const stats = [
    {
      label: '参加者',
      value: `${availablePlayers.length} / ${players.length}`,
      icon: <PeopleIcon />,
      color: theme.palette.primary.main,
    },
    {
      label: 'コート数',
      value: `${courts}`,
      icon: <StadiumIcon />,
      color: theme.palette.info.main,
    },
    {
      label: '試合中',
      value: `${playersInMatch}人`,
      icon: <SportsTennisIcon />,
      color: theme.palette.success.main,
    },
    {
      label: '総勝利数',
      value: `${totalWins}`,
      icon: <EmojiEventsIcon />,
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Grid2 container spacing={{ xs: 1, sm: 2 }}>
        {stats.map((stat, index) => (
          <Grid2 size={{ xs: 6, sm: 3 }} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 1,
              }}
            >
              <Box
                sx={{
                  color: stat.color,
                  mb: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {stat.icon}
              </Box>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  color: 'text.primary',
                  mb: 0.25,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant='caption'
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.65rem', sm: '0.75rem' },
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Paper>
  );
};

export default QuickStats;
