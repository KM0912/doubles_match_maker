import React from "react";
import { Space, Typography } from "antd";
import PairButton from "../molecules/PairButton";
import Counter from "../molecules/Counter";

const { Text } = Typography;

const Home = () => {
  const [participantCount, setParticipantCount] = React.useState(4);
  const [courtCount, setCourtCount] = React.useState(1);

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
        <Space direction="horizontal">
          <PairButton pairs={["1", "2"]} />
          <Text>VS</Text>
          <div>
            <PairButton pairs={["3", "4"]} />
          </div>
        </Space>
      </Space>
    </>
  );
};

export default Home;
