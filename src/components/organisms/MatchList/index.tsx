import React from "react";
import Matchup from "../../molecules/Matchup";
import { Match } from "../../../types";
import { Button } from "antd";

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
    <>
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
    </>
  );
};

export default MatchList;
