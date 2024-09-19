import React from "react";
import { Button } from "antd";
import { Player } from "../../../types";

type PairButtonProps = {
  pairs: [Player, Player];
  disabled?: boolean;
};

const PairButton: React.FC<PairButtonProps> = ({ pairs, disabled }) => {
  return (
    <div>
      <Button disabled={disabled}>{pairs[0].id}</Button>
      <Button disabled={disabled}>{pairs[1].id}</Button>
    </div>
  );
};

export default PairButton;
