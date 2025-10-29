import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDialogProps {
  confirmText: string;
  okText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  confirmText,
  okText = "OK",
  cancelText = "キャンセル",
  onConfirm,
  onCancel,
  title = "確認",
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <Dialog open={isOpen} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{confirmText}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCancel} color="inherit">
          {cancelText}
        </Button>
        <Button variant="contained" onClick={handleConfirm} color="primary">
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
