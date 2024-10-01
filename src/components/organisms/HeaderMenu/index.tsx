import { Button, Popconfirm } from "antd";
import React from "react";

type Props = {
  onResetConfirm: () => void;
};

const HeaderMenu: React.FC<Props> = ({ onResetConfirm }) => {
  return (
    <div style={{ textAlign: "right" }}>
      <Popconfirm
        placement="bottomRight"
        title={"試合と参加者をリセットしますか？"}
        okText="はい"
        cancelText="いいえ"
        okButtonProps={{ type: "primary", danger: true }}
        onConfirm={onResetConfirm}
      >
        <Button type="primary" danger>
          リセット
        </Button>
      </Popconfirm>
    </div>
  );
};

export default HeaderMenu;
