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

  const handleCreateMatch = () => {
    const newParticipants = Array.from(
      { length: participantCount },
      (_, i) => i + 1
    );
    setParticipants(newParticipants);

    // participantsからランダムに2人ペアを作成してmatchesに格納
    const newMatches: Matches = Array.from(
      { length: courtCount },
      (): Match => {
        const shuffledParticipants = newParticipants.sort(
          () => Math.random() - 0.5
        );
        const pair1: Pair = shuffledParticipants.slice(0, 2) as Pair;
        const pair2: Pair = shuffledParticipants.slice(2, 4) as Pair;
        return [pair1, pair2];
      }
    );
    setMatches(newMatches);
  };

  return (
    <>
      <Space direction="vertical">
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
        <Button type="primary" onClick={handleCreateMatch}>
          試合を作成
        </Button>
        {matches.map((match, index) => (
          <Space direction="horizontal">
            <PairButton pairs={match[0]} />
            <Text>VS</Text>
            <PairButton pairs={match[1]} />
          </Space>
        ))}
      </Space>
    </>
  );
};

export default Home;
