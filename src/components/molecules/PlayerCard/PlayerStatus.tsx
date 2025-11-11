import { Box, Chip } from '@mui/material';

type PlayerStatusProps = {
  isPlaying: boolean;
  isOnBreak: boolean;
};

export const PlayerStatus = ({ isPlaying, isOnBreak }: PlayerStatusProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {isPlaying && (
        <Chip
          label='試合中'
          color='success'
          size='small'
          sx={{ height: 20, fontSize: '0.625rem', mb: 0.5 }}
        />
      )}
      {isOnBreak && (
        <Chip
          label='休憩中'
          color='default'
          size='small'
          sx={{
            height: 20,
            fontSize: '0.625rem',
            mb: 0.5,
            ml: isPlaying ? 0.5 : 0,
          }}
        />
      )}
    </Box>
  );
};
