import { Box, Chip } from '@mui/material';

type PlayerStatusProps = {
  isPlaying: boolean;
  isOnBreak: boolean;
};

export const PlayerStatus = ({ isPlaying, isOnBreak }: PlayerStatusProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
      {isPlaying && (
        <Chip
          label='試合中'
          color='success'
          size='small'
          sx={{
            height: 22,
            fontSize: '0.65rem',
            fontWeight: 600,
            '& .MuiChip-label': {
              px: 1,
            },
          }}
        />
      )}
      {isOnBreak && (
        <Chip
          label='休憩中'
          color='default'
          size='small'
          sx={{
            height: 22,
            fontSize: '0.65rem',
            fontWeight: 600,
            bgcolor: 'grey.200',
            '& .MuiChip-label': {
              px: 1,
            },
          }}
        />
      )}
    </Box>
  );
};
