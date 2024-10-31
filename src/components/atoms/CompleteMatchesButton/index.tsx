import ActionButton from "../ActionButton";

type Props = {
  onClick: () => void;
};

const CompleteMatchesButton = ({ onClick }: Props) => {
  return (
    <ActionButton
      onClick={onClick}
      className="bg-purple-500 text-white hover:bg-purple-600 mt-8"
    >
      試合終了
    </ActionButton>
  );
};

export default CompleteMatchesButton;
