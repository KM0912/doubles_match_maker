import React from "react";
import { Menu } from "antd";
import "./index.css";

type Props = {
  onClick: (key: { key: string }) => void;
};

const items = [
  { key: "player", label: "参加者" },
  { key: "pairing", label: "ペア数" },
  { key: "match", label: "試合" },
];

const FooterMenu: React.FC<Props> = (props) => {
  const { onClick } = props;

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["player"]}
      items={items}
      onClick={onClick}
      className="footer-menu"
    />
  );
};

export default FooterMenu;
