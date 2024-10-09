import { Button, Popconfirm } from "antd";
import React from "react";

type Props = {
  onClick: () => void;
};

const ResetButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Popconfirm
      placement="bottomRight"
      title={"試合と参加者をリセットしますか？"}
      okText="はい"
      cancelText="いいえ"
      okButtonProps={{ type: "primary", danger: true }}
      onConfirm={onClick}
    >
      <Button type="primary" danger>
        リセット
      </Button>
    </Popconfirm>
  );
};

export default ResetButton;
