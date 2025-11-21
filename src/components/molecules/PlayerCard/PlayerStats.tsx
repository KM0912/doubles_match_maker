import { Box, Tooltip } from '@mui/material';
import SportsIcon from '@mui/icons-material/SportsTennis';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Player } from '../../../types';
import { useTheme } from '@mui/material/styles';

type PlayerStatsProps = {
  player: Player;
};

export const PlayerStats = ({ player }: PlayerStatsProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
      <Tooltip title='試合数' arrow>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            fontSize: '0.875rem',
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          <SportsIcon sx={{ fontSize: '1.125rem', color: theme.palette.primary.main }} />
          <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
            {player.gamesPlayed}
          </Box>
        </Box>
      </Tooltip>

      <Tooltip title='勝利数' arrow>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            fontSize: '0.875rem',
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          <EmojiEventsIcon
            sx={{ fontSize: '1.125rem', color: theme.palette.warning.main }}
          />
          <Box component='span' sx={{ fontWeight: 700, color: theme.palette.warning.main }}>
            {player.wins}
          </Box>
        </Box>
      </Tooltip>
    </Box>
  );
};
