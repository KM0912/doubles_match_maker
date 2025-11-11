import { useMatchContext } from '../../../contexts/MatchContext';
import { usePlayerContext } from '../../../contexts/PlayerContext';
import ActionButton from '../ActionButton';
import ShuffleIcon from '@mui/icons-material/Shuffle';

type Props = {
  courts: number;
};
const GenerateMatchesButton: React.FC<Props> = ({ courts }) => {
  const { players } = usePlayerContext();
  const { matches, generateMatches } = useMatchContext();

  return (
    <ActionButton
      onClick={() => generateMatches(courts)}
      disabled={matches.length > 0 || players.length < 4}
      color='primary'
      startIcon={<ShuffleIcon />}
      size='large'
      sx={{
        py: { xs: 1, sm: 1.5 },
        fontSize: { xs: '0.9rem', sm: '1rem' },
      }}
    >
      試合組み合わせ生成
    </ActionButton>
  );
};

export default GenerateMatchesButton;
