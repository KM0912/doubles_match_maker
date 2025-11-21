import { Box, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type PlayerStatusProps = {
  isPlaying: boolean;
  isOnBreak: boolean;
};

export const PlayerStatus = ({ isPlaying, isOnBreak }: PlayerStatusProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
      {isPlaying && (
        <Chip
          label='試合中'
          color='success'
          size='small'
          sx={{
            height: 24,
            fontSize: '0.6875rem',
            fontWeight: 700,
            borderRadius: 2,
            bgcolor: theme.palette.success.main,
            color: 'white',
            boxShadow: `0px 2px 8px ${theme.palette.success.main}40`,
            '& .MuiChip-label': {
              px: 1.5,
            },
          }}
        />
      )}
      {isOnBreak && (
        <Chip
          label='休憩中'
          size='small'
          sx={{
            height: 24,
            fontSize: '0.6875rem',
            fontWeight: 700,
            borderRadius: 2,
            bgcolor: theme.palette.warning.main,
            color: 'white',
            boxShadow: `0px 2px 8px ${theme.palette.warning.main}40`,
            '& .MuiChip-label': {
              px: 1.5,
            },
          }}
        />
      )}
    </Box>
  );
};
