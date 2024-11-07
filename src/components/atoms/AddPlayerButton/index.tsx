import { usePlayerContext } from "../../../contexts/PlayerContext";

const AddPlayerButton: React.FC = () => {
  const { addPlayer, playerCount } = usePlayerContext();
  return (
    <button
      onClick={addPlayer}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
    >
      参加者を追加（現在: {playerCount}人）
    </button>
  );
};

export default AddPlayerButton;
