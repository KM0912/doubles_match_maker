import { useState } from "react";
import { usePlayerContext } from "../../../contexts/PlayerContext";

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
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          style={{ margin: 0 }}
        >
          <div className="bg-white p-4 rounded shadow-lg">
            <p>本当にリセットしますか？</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={confirmReset}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                はい
              </button>
              <button
                onClick={cancelReset}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetButton;
