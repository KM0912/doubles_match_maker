import { useState } from "react";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import ConfirmDialog from "../../molecules/ConfirmDialog";
import { Button, Paper, Typography, Box } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

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
      <Paper elevation={1} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6">データリセット</Typography>
          <Typography variant="body2" color="text.secondary">
            すべての参加者情報と試合履歴を削除します
          </Typography>
        </Box>
        <Button
          onClick={handleReset}
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<RestartAltIcon />}
          sx={{
            py: 1,
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "rgba(211, 47, 47, 0.04)",
            },
          }}
        >
          リセット
        </Button>
      </Paper>
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
