import React, { useState } from "react";
import { Button, Space, Typography } from "antd";
import PairButton from "../molecules/PairButton";
import Counter from "../molecules/Counter";

const { Text } = Typography;

type Pair = [number, number];
type Match = [Pair, Pair];
type Matches = Match[];

const Home = () => {
  const [participantCount, setParticipantCount] = useState(4);
  const [courtCount, setCourtCount] = useState(1);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [participants, setParticipants] = useState<number[]>([]);
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
    setParticipants(newParticipants);
    setIsSetupComplete(true);
  };

  const handleAddMatch = () => {
    const newMatches = [...matches];

    // participantsからランダムに2人ペアを作成してmatchesに格納
    const shuffledParticipants = participants.sort(() => Math.random() - 0.5);
    const pair1: Pair = shuffledParticipants.slice(0, 2) as Pair;
    const pair2: Pair = shuffledParticipants.slice(2, 4) as Pair;
    newMatches.push([pair1, pair2]);

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
                <PairButton pairs={match[0]} />
                <Text>VS</Text>
                <PairButton pairs={match[1]} />
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
