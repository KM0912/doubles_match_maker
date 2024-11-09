import { useMatchContext } from "../../../contexts/MatchContext";
import ActionButton from "../ActionButton";

const CompleteMatchesButton = () => {
  const { completeMatches } = useMatchContext();
  return (
    <ActionButton
      onClick={() => completeMatches()}
      className="bg-purple-500 text-white hover:bg-purple-600 mt-8"
    >
      試合終了
    </ActionButton>
  );
};

export default CompleteMatchesButton;
