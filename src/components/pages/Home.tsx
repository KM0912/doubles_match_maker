import React from "react";
import { Space, Typography } from "antd";
import PairButton from "../molecules/PairButton";
import ParticipantCounter from "../molecules/ParticipantCounter";

const { Text } = Typography;

const Home = () => {
  const [participantCount, setParticipantCount] = React.useState(4);

  const handleIncrement = () => {
    setParticipantCount(participantCount + 1);
  };

  const handleDecrement = () => {
    if (participantCount <= 4) {
      setParticipantCount(4);
    } else {
      setParticipantCount(participantCount - 1);
    }
  };

  return (
    <>
      <Space direction="vertical">
        <ParticipantCounter
          participantCount={participantCount}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
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
