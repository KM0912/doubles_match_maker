import React from "react";
import { Space, Typography } from "antd";
import WinButton from "../../atom/WinButton";
import PairButton from "../PairButton";
import { Match } from "../../../types";

const { Text } = Typography;

type Props = {
  match: Match;
  index: number;
  onClickWin: (index: number, pairIndex: number) => void;
};

const Matchup: React.FC<Props> = ({ match, index, onClickWin }) => {
  return (
    <Space direction="horizontal">
      <WinButton
        match={match}
        pairIndex={0}
        onClick={() => onClickWin(index, 0)}
      />
      <PairButton disabled={match.isEnd} pairs={match.Pairs[0]} />
      <Text>VS</Text>
      <PairButton disabled={match.isEnd} pairs={match.Pairs[1]} />
      <WinButton
        match={match}
        pairIndex={1}
        onClick={() => onClickWin(index, 1)}
      />
    </Space>
  );
};

export default React.memo(Matchup);
