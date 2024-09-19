import React from "react";
import { Button, Typography } from "antd";
import { Match } from "../../../types";

const { Text } = Typography;

type Props = {
  match: Match;
  pairIndex: number;
  onClick: React.MouseEventHandler<HTMLElement>;
};

const WinButton: React.FC<Props> = ({ match, pairIndex, onClick }) => {
  const isWinner = match.winnerPairIndex === pairIndex;
  const isDecided = match.winnerPairIndex !== undefined;

  return (
    <Button
      type={isDecided ? (isWinner ? "primary" : "default") : "default"}
      danger={isDecided && !isWinner}
      onClick={onClick}
    >
      <Text>勝</Text>
    </Button>
  );
};

export default React.memo(WinButton);
