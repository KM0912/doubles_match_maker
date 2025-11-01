import React from "react";
import { Button, ButtonProps } from "@mui/material";

type ActionButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
  size?: ButtonProps["size"];
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: ButtonProps["sx"];
  children: React.ReactNode;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  disabled = false,
  variant = "contained",
  color = "primary",
  size = "medium",
  fullWidth = true,
  startIcon,
  endIcon,
  sx,
  children,
}) => {
  const buttonShadow =
    variant === "contained"
      ? "0 12px 28px rgba(56, 96, 240, 0.25)"
      : "0 8px 20px rgba(15, 23, 42, 0.08)";

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
        borderRadius: 1.5,
        fontWeight: "medium",
        py: 1.2,
        boxShadow: buttonShadow,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: disabled ? "none" : "translateY(-2px)",
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
