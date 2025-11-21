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
        py: { xs: 1.5, sm: 2 },
        px: { xs: 3, sm: 4 },
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
      {matches.length > 0
        ? '試合進行中'
        : players.length < 4
          ? 'プレイヤーが不足しています（4人以上必要）'
          : '試合組み合わせを生成'}
    </ActionButton>
  );
};

export default GenerateMatchesButton;
