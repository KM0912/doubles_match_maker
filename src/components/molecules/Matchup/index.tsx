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
        disabled={!match.editable}
      />
      <PairButton
        disabled={match.isEnd || !match.editable}
        pairs={match.pairs[0]}
      />
      <Text>VS</Text>
      <PairButton
        disabled={match.isEnd || !match.editable}
        pairs={match.pairs[1]}
      />
      <WinButton
        match={match}
        pairIndex={1}
        onClick={() => onClickWin(index, 1)}
        disabled={!match.editable}
      />
    </Space>
  );
};

export default React.memo(Matchup);
