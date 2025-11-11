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
          borderRadius: 2,
          overflow: 'hidden',
        },
        elevation: 3,
      }}
    >
      <DialogTitle
        id={titleId}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontWeight: 700,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          py: 1.5,
        }}
      >
        {okColor === 'error' && <WarningAmberRoundedIcon color='error' sx={{ mr: 0.5 }} />}
        {title}
      </DialogTitle>
      <DialogContent sx={{ pt: 2, pb: 0 }}>
        <DialogContentText id={descriptionId}>
          <Typography variant='body1'>{confirmText}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, gap: 1.5 }}>
        <Button variant='outlined' onClick={handleCancel} color='inherit' autoFocus>
          {cancelText}
        </Button>
        <Button variant='contained' onClick={handleConfirm} color={okColor}>
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
