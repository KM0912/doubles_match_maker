import { useState } from "react";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import ConfirmDialog from "../../molecules/ConfirmDialog";
import { Button } from "@mui/material";

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
      <Button
        onClick={handleReset}
        variant="contained"
        color="warning"
        fullWidth
      >
        リセット
      </Button>
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
