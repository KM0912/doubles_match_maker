import { useState } from "react";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import ConfirmDialog from "../../molecules/ConfirmDialog";

const ResetButton: React.FC = () => {
  const { resetPlayers } = usePlayerContext();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    resetPlayers();
    setShowConfirm(false);
  };

  const cancelReset = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <button
        onClick={handleReset}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
      >
        リセット
      </button>
      {showConfirm && (
        <ConfirmDialog
          confirmText="本当にリセットしますか？"
          okText="リセット"
          cancelText="キャンセル"
          onConfirm={confirmReset}
          onCancel={cancelReset}
        />
      )}
    </>
  );
};

export default ResetButton;
