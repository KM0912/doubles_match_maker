import React from 'react';
import { Button, ButtonProps, useTheme } from '@mui/material';

type ActionButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  size?: ButtonProps['size'];
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: ButtonProps['sx'];
  children: React.ReactNode;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  disabled = false,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = true,
  startIcon,
  endIcon,
  sx,
  children,
}) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        borderRadius: 4,
        fontWeight: 700,
        textTransform: 'none',
        fontSize: '0.9375rem',
        py: 1.5,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        ...(variant === 'contained' && {
          boxShadow: `0px 4px 12px ${
            (
              theme.palette[
                color as 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
              ] as any
            )?.main || theme.palette.primary.main
          }30`,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0px 6px 16px ${
              (
                theme.palette[
                  color as 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
                ] as any
              )?.main || theme.palette.primary.main
            }40`,
          },
        }),
        ...(variant === 'outlined' && {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            transform: 'translateY(-1px)',
          },
        }),
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
