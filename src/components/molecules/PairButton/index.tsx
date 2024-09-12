import React from "react";
import { Button } from "antd";

type PairButtonProps = {
  pairs: [string, string];
};

const PairButton: React.FC<PairButtonProps> = ({ pairs }) => {
  return (
    <div>
      <Button>{pairs[0]}</Button>
      <Button>{pairs[1]}</Button>
    </div>
  );
};

export default PairButton;
