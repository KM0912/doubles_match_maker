import React from "react";

type ActionButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 rounded ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ActionButton;
