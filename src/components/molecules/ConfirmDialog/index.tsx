import React, { useEffect, useState, useId } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  useTheme,
  Box,
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
  const theme = useTheme();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleConfirm = () => {
    setIsOpen(false);
    setTimeout(onConfirm, 300);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setTimeout(onCancel, 300);
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
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.15)',
          border: `1px solid ${theme.palette.divider}`,
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
          fontSize: { xs: '1.125rem', sm: '1.25rem' },
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          py: 2.5,
          px: 3,
          bgcolor: okColor === 'error' ? `${theme.palette.error.main}08` : 'background.paper',
        }}
      >
        {okColor === 'error' && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: `${theme.palette.error.main}15`,
              borderRadius: 2,
              p: 0.75,
            }}
          >
            <WarningAmberRoundedIcon color='error' sx={{ fontSize: '1.5rem' }} />
          </Box>
        )}
        {title}
      </DialogTitle>
      <DialogContent sx={{ pt: 3.5, pb: 1.5, px: 3 }}>
        <DialogContentText id={descriptionId}>
          <Typography
            variant='body1'
            sx={{
              fontSize: { xs: '0.9375rem', sm: '1rem' },
              lineHeight: 1.7,
              color: 'text.primary',
            }}
          >
            {confirmText}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{ px: 3, py: 2.5, gap: 1.5, borderTop: `1px solid ${theme.palette.divider}` }}
      >
        <Button
          variant='outlined'
          onClick={handleCancel}
          color='inherit'
          autoFocus
          sx={{
            borderRadius: 2.5,
            fontWeight: 600,
            px: 3,
            py: 1,
            textTransform: 'none',
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          variant='contained'
          onClick={handleConfirm}
          color={okColor}
          sx={{
            borderRadius: 2.5,
            fontWeight: 700,
            px: 3,
            py: 1,
            textTransform: 'none',
            boxShadow: `0px 4px 12px ${
              (
                theme.palette[
                  okColor as 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
                ] as any
              )?.main || theme.palette.primary.main
            }30`,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: `0px 6px 16px ${
                (
                  theme.palette[
                    okColor as 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
                  ] as any
                )?.main || theme.palette.primary.main
              }40`,
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
