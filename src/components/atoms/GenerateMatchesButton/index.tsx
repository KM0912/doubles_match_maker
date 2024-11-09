import { useMatchContext } from "../../../contexts/MatchContext";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import ActionButton from "../ActionButton";

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
      className="bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      試合組み合わせ生成
    </ActionButton>
  );
};

export default GenerateMatchesButton;
