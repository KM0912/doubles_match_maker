import React, { useEffect, useState, useId } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

interface ConfirmDialogProps {
  confirmText: string;
  okText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  okColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  confirmText,
  okText = 'OK',
  cancelText = 'キャンセル',
  onConfirm,
  onCancel,
  title = '確認',
  okColor = 'primary',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleConfirm = () => {
    setIsOpen(false);
    setTimeout(onConfirm, 300); // アニメーション完了後に実行
  };

  const handleCancel = () => {
    setIsOpen(false);
    setTimeout(onCancel, 300); // アニメーション完了後に実行
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      fullWidth
      maxWidth='sm'
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      role='dialog'
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.15)',
        },
        elevation: 0,
      }}
    >
      <DialogTitle
        id={titleId}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          fontWeight: 700,
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          py: 2,
          px: 3,
        }}
      >
        {okColor === 'error' && <WarningAmberRoundedIcon color='error' sx={{ mr: 0.5 }} />}
        {title}
      </DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 1, px: 3 }}>
        <DialogContentText id={descriptionId}>
          <Typography variant='body1' sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
            {confirmText}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2.5, gap: 1.5 }}>
        <Button
          variant='outlined'
          onClick={handleCancel}
          color='inherit'
          autoFocus
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            px: 3,
            textTransform: 'none',
          }}
        >
          {cancelText}
        </Button>
        <Button
          variant='contained'
          onClick={handleConfirm}
          color={okColor}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            px: 3,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
