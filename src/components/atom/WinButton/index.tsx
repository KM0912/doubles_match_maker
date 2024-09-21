import React from "react";
import { Button, Typography } from "antd";
import { Match } from "../../../types";

const { Text } = Typography;

type Props = {
  match: Match;
  pairIndex: number;
} & React.ComponentProps<typeof Button>;

const WinButton: React.FC<Props> = ({ match, pairIndex, ...rest }) => {
  const isWinner = match.winnerPairIndex === pairIndex;
  const isDecided = match.winnerPairIndex !== undefined;

  return (
    <Button
      type={isDecided ? (isWinner ? "primary" : "default") : "default"}
      danger={isDecided && !isWinner}
      {...rest}
    >
      <Text>{isDecided ? (isWinner ? "勝ち" : "負け") : "勝敗"}</Text>
    </Button>
  );
};

export default React.memo(WinButton);
