import React, { useEffect, useState } from "react";

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
    // ダイアログが開いたときにスクロールを無効化
    document.body.style.overflow = "hidden";
    return () => {
      // コンポーネントがアンマウントされたときにスクロールを有効化
      document.body.style.overflow = "auto";
    };
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
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-300 ${
        isOpen ? "bg-opacity-60" : "bg-opacity-0 pointer-events-none"
      }`}
      style={{ margin: 0 }}
    >
      <div
        className={`bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 transition-all duration-300 transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>

        <div className="px-6 py-4">
          <p className="text-gray-700">{confirmText}</p>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            {okText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
