import { useState } from "react";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import ConfirmDialog from "../../molecules/ConfirmDialog";
import { Button, Paper, Typography, Box, Divider } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
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
      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          border: "1px solid rgba(211, 47, 47, 0.2)",
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <WarningAmberIcon
            color="error"
            sx={{
              mr: 1.5,
              mt: 0.5,
            }}
          />
          <Box>
            <Typography variant="h6" align="left">
              データリセット
            </Typography>
            <Typography variant="body2" color="text.secondary" align="left">
              すべての参加者情報と試合履歴を削除します
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 1.5 }} />
        <Button
          onClick={handleReset}
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<RestartAltIcon />}
          sx={{
            py: 1,
            mt: 1,
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "rgba(211, 47, 47, 0.08)",
              borderColor: "error.main",
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
