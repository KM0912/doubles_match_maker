import { Box, Tooltip } from '@mui/material';
import SportsIcon from '@mui/icons-material/SportsTennis';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Player } from '../../../types';

type PlayerStatsProps = {
  player: Player;
};

export const PlayerStats = ({ player }: PlayerStatsProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Tooltip title='試合数'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          <SportsIcon fontSize='small' sx={{ mr: 0.5, fontSize: '1rem' }} />
          {player.gamesPlayed}
        </Box>
      </Tooltip>

      <Tooltip title='勝利数'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: 'warning.main',
            fontWeight: 600,
          }}
        >
          <EmojiEventsIcon fontSize='small' sx={{ mr: 0.5, fontSize: '1rem' }} />
          {player.wins}
        </Box>
      </Tooltip>
    </Box>
  );
};
