import React from "react";
import { Space, Button, Typography } from "antd";

const { Text } = Typography;

interface ParticipantCounterProps {
  participantCount: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const ParticipantCounter: React.FC<ParticipantCounterProps> = ({
  participantCount,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <Space direction="horizontal">
      <Text>参加人数：</Text>
      <Button danger onClick={handleDecrement}>
        -
      </Button>
      <Text>{participantCount}</Text>
      <Button type="primary" onClick={handleIncrement}>
        +
      </Button>
    </Space>
  );
};

export default ParticipantCounter;
