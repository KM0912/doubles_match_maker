import { Button, Typography, Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { usePlayerContext } from '../../../contexts/PlayerContext';

const AddPlayerButton: React.FC = () => {
  const { addPlayer, playerCount } = usePlayerContext();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Typography variant='body2' color='text.secondary'>
          現在: {playerCount}人
        </Typography>
      </Box>
      <Button
        onClick={addPlayer}
        variant='contained'
        color='primary'
        fullWidth
        startIcon={<PersonAddIcon />}
        sx={{
          py: 1.5,
          fontWeight: 600,
          borderRadius: 2.5,
          fontSize: { xs: '0.95rem', sm: '1rem' },
          textTransform: 'none',
          boxShadow: '0px 2px 4px rgba(25, 118, 210, 0.2)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(25, 118, 210, 0.3)',
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
