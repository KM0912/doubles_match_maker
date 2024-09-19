import React from "react";
import { Button, Typography } from "antd";
import { Match } from "../../../ types";

const { Text } = Typography;

type Props = {
  match: Match;
  pairIndex: number;
  handleClickWin: React.MouseEventHandler<HTMLElement>;
};

const WinButton: React.FC<Props> = ({ match, pairIndex, handleClickWin }) => {
  const isWinner = match.winnerPairIndex === pairIndex;
  const isDecided = match.winnerPairIndex !== undefined;

  return (
    <Button
      type={isDecided ? (isWinner ? "primary" : "default") : "default"}
      danger={isDecided && !isWinner}
      onClick={handleClickWin}
    >
      <Text>勝</Text>
    </Button>
  );
};

export default React.memo(WinButton);
