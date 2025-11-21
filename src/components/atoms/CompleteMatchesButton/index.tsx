import { useMatchContext } from '../../../contexts/MatchContext';
import ActionButton from '../ActionButton';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const CompleteMatchesButton: React.FC = () => {
  const { completeMatches } = useMatchContext();
  return (
    <ActionButton
      onClick={() => completeMatches()}
      color='success'
      variant='contained'
      startIcon={<DoneAllIcon />}
      size='large'
      sx={{
        py: { xs: 1.5, sm: 2 },
        px: { xs: 4, sm: 6 },
        fontSize: { xs: '1rem', sm: '1.1rem' },
        fontWeight: 700,
        borderRadius: 2,
        textTransform: 'none',
        boxShadow: 3,
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.3s ease',
      }}
    >
      すべての試合を終了
    </ActionButton>
  );
};

export default CompleteMatchesButton;
