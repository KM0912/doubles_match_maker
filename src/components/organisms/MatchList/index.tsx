import React from "react";
import Matchup from "../../molecules/Matchup";
import { Match } from "../../../types";
import { Button, Space } from "antd";

type Props = {
  matches: Match[];
  updateMatch: (index: number, match: Match) => void;
  deleteMatch: (index: number) => void;
  addNewMatch: (isRandom?: boolean) => void;
  finalizeMatch: (index: number, pairIndex: number) => void;
};

const MatchList: React.FC<Props> = (props) => {
  const { matches, updateMatch, deleteMatch, addNewMatch, finalizeMatch } =
    props;
  const isAllMatchEnd = matches.every((match) => match.isEnd);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {matches.map((match, index) => (
        <Matchup
          key={index}
          match={match}
          index={index}
          onClickWin={finalizeMatch}
          updateMatch={(match) => updateMatch(index, match)}
          deleteMatch={() => deleteMatch(index)}
        />
      ))}
      <Space direction="horizontal" size="small">
        <Button
          type="primary"
          onClick={() => addNewMatch()}
          disabled={!isAllMatchEnd}
        >
          試合を追加
        </Button>
        <Button
          type="primary"
          onClick={() => addNewMatch(true)}
          disabled={!isAllMatchEnd}
        >
          ランダム
        </Button>
      </Space>
    </Space>
  );
};

export default MatchList;
