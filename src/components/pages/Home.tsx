import React, { useState } from "react";
import { Button, Space, Typography } from "antd";
import PairButton from "../molecules/PairButton";
import Counter from "../molecules/Counter";

const { Text } = Typography;

type Pair = [Player, Player];
type Match = {
  Pairs: [Pair, Pair];
  isEnd: boolean;
};
type Matches = Match[];

export type Player = {
  id: number;
  matchCount: number;
};

const Home = () => {
  const [participantCount, setParticipantCount] = useState(4);
  const [courtCount, setCourtCount] = useState(1);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [participants, setParticipants] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Matches>([]);

  const handleIncrementParticipant = () => {
    setParticipantCount(participantCount + 1);
  };

  const handleDecrementParticipant = () => {
    if (participantCount <= 4) {
      setParticipantCount(4);
    } else {
      setParticipantCount(participantCount - 1);
    }
  };

  const handleIncrementCourt = () => {
    setCourtCount(courtCount + 1);
  };

  const handleDecrementCourt = () => {
    if (courtCount <= 1) {
      setCourtCount(1);
    } else {
      setCourtCount(courtCount - 1);
    }
  };

  const handleSetupComplete = () => {
    const newParticipants = Array.from(
      { length: participantCount },
      (_, i) => i + 1
    );
    setParticipants(newParticipants.map((id) => ({ id, matchCount: 0 })));
    setIsSetupComplete(true);
  };

  // 試合終了ボタンを押したときの処理
  const handleMatchEnd = (matchIndex: number) => {
    const newMatches = [...matches];
    newMatches[matchIndex].isEnd = true;
    setMatches(newMatches);

    // 参加者の試合数を更新(試合が終了したときに試合数をインクリメント)
    participants.forEach((participant) => {
      participant.matchCount += 1;
    });
  };

  const handleAddMatch = () => {
    const newMatches = [...matches];

    // participantsからランダムに2人ペアを作成してmatchesに格納
    const shuffledParticipants = participants.sort(() => Math.random() - 0.5);
    const pair1: Pair = shuffledParticipants.slice(0, 2) as Pair;
    const pair2: Pair = shuffledParticipants.slice(2, 4) as Pair;
    newMatches.push({ Pairs: [pair1, pair2], isEnd: false });

    setMatches(newMatches);
  };

  return (
    <>
      <Space direction="vertical">
        {!isSetupComplete && (
          <>
            <Counter
              label="参加者数"
              count={participantCount}
              handleIncrement={handleIncrementParticipant}
              handleDecrement={handleDecrementParticipant}
            />
            <Counter
              label="コート数"
              count={courtCount}
              handleIncrement={handleIncrementCourt}
              handleDecrement={handleDecrementCourt}
            />
            <Button type="primary" onClick={handleSetupComplete}>
              確定
            </Button>
          </>
        )}
        {isSetupComplete && (
          <>
            <Text strong>
              参加者数：{participantCount}人、コート数：{courtCount}面
            </Text>
            {matches.map((match, index) => (
              <Space direction="horizontal">
                <PairButton disabled={match.isEnd} pairs={match.Pairs[0]} />
                <Text>VS</Text>
                <PairButton disabled={match.isEnd} pairs={match.Pairs[1]} />
                <Button
                  disabled={match.isEnd}
                  onClick={() => handleMatchEnd(index)}
                >
                  試合終了
                </Button>
              </Space>
            ))}
            <Button type="primary" onClick={handleAddMatch}>
              試合を追加
            </Button>
          </>
        )}
      </Space>
    </>
  );
};

export default Home;
