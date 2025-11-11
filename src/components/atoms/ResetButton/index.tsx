import { useState } from 'react';
import { usePlayerContext } from '../../../contexts/PlayerContext';
import ConfirmDialog from '../../molecules/ConfirmDialog';
import { Button, Typography, Box } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useMatchContext } from '../../../contexts/MatchContext';

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
        <Typography variant='body2' color='text.secondary' align='left' sx={{ mb: 1.5 }}>
          すべての参加者情報と試合履歴を削除します
        </Typography>
        <Button
          onClick={handleReset}
          variant='outlined'
          color='error'
          fullWidth
          startIcon={<RestartAltIcon />}
          sx={{
            py: 1,
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: 'rgba(211, 47, 47, 0.08)',
              borderColor: 'error.main',
            },
          }}
        >
          リセット
        </Button>
      </Box>
      {showConfirm && (
        <ConfirmDialog
          confirmText='本当にリセットしますか？'
          okText='リセット'
          cancelText='キャンセル'
          onConfirm={confirmReset}
          onCancel={cancelReset}
        />
      )}
    </>
  );
};

export default ResetButton;
