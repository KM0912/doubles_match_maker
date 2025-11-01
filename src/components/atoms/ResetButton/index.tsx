import { useState } from "react";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import ConfirmDialog from "../../molecules/ConfirmDialog";
import { Button, Box, Alert } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useMatchContext } from "../../../contexts/MatchContext";

const ResetButton: React.FC = () => {
  const { resetPlayers } = usePlayerContext();
  const { resetMatch } = useMatchContext();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    resetPlayers();
    resetMatch();
    setShowConfirm(false);
  };

  const cancelReset = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Alert
          severity="warning"
          icon={<RestartAltIcon fontSize="small" />}
          sx={{
            borderRadius: 2,
            bgcolor: "rgba(255, 193, 7, 0.15)",
            color: "warning.dark",
            mb: 2,
          }}
        >
          すべての参加者情報と試合履歴が削除されます。
        </Alert>
        <Button
          onClick={handleReset}
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<RestartAltIcon />}
          sx={{
            py: 1.2,
            fontWeight: "bold",
            borderRadius: 2,
            borderWidth: 2,
            "&:hover": {
              bgcolor: "rgba(244, 67, 54, 0.1)",
              borderColor: "error.main",
            },
          }}
        >
          リセット
        </Button>
      </Box>
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
