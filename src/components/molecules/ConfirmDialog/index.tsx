import React from "react";

interface ConfirmDialogProps {
  confirmText: string;
  okText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  confirmText,
  okText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{ margin: 0 }}
    >
      <div className="bg-white p-4 rounded shadow-lg">
        <p>{confirmText}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            {okText}
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
