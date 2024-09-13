import React from "react";
import Counter from "../molecules/Counter";
import { Button, Space } from "antd";

type SetupControlsProps = {
  participantCount: number;
  courtCount: number;
  handleIncrementParticipant: () => void;
  handleDecrementParticipant: () => void;
  handleIncrementCourt: () => void;
  handleDecrementCourt: () => void;
  handleSetupComplete: () => void;
};

const SetupControls: React.FC<SetupControlsProps> = (props) => {
  const {
    participantCount,
    courtCount,
    handleIncrementParticipant,
    handleDecrementParticipant,
    handleIncrementCourt,
    handleDecrementCourt,
    handleSetupComplete,
  } = props;

  return (
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
      <Button type="primary" onClick={handleSetupComplete}>
        確定
      </Button>
    </Space>
  );
};

export default SetupControls;
