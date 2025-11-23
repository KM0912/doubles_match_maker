import { Button, Typography, Box, useTheme } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { usePlayerContext } from '../../../contexts/PlayerContext';

const AddPlayerButton: React.FC = () => {
  const { addPlayer, playerCount } = usePlayerContext();
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ fontWeight: 500, fontSize: '0.875rem' }}
        >
          現在:{' '}
          <Box component='span' sx={{ fontWeight: 700, color: 'text.primary' }}>
            {playerCount}
          </Box>
          人
        </Typography>
      </Box>
      <Button
        onClick={addPlayer}
        variant='contained'
        color='primary'
        fullWidth
        startIcon={<PersonAddIcon />}
        sx={{
          py: 1.75,
          fontWeight: 700,
          borderRadius: 4,
          fontSize: { xs: '0.9375rem', sm: '1rem' },
          textTransform: 'none',
          boxShadow: `0px 4px 12px ${theme.palette.primary.main}30`,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: `0px 6px 16px ${theme.palette.primary.main}40`,
            transform: 'translateY(-2px)',
          },
        }}
      >
        参加者を追加
      </Button>
    </>
  );
};

export default AddPlayerButton;
