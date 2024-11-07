import { usePlayerContext } from "../../../contexts/PlayerContext";
import { Match } from "../../../types";
import ActionButton from "../ActionButton";

type Props = {
  onClick: () => void;
  matches: Match[];
};

const GenerateMatchesButton = ({ onClick, matches }: Props) => {
  const { players } = usePlayerContext();
  return (
    <ActionButton
      onClick={onClick}
      disabled={matches.length > 0 || players.length < 4}
      className="bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      試合組み合わせ生成
    </ActionButton>
  );
};

export default GenerateMatchesButton;
