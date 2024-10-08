import React from "react";
import Counter from "../molecules/Counter";
import { Button, Space } from "antd";

type SetupControlsProps = {
  playerCount: number;
  courtCount: number;
  updatePlayerCount: (count: number) => void;
  updateCourtCount: (count: number) => void;
  handleSetupComplete: () => void;
};

const SetupControls: React.FC<SetupControlsProps> = (props) => {
  const {
    playerCount,
    courtCount,
    updatePlayerCount,
    updateCourtCount,
    handleSetupComplete,
  } = props;

  const handleIncrementParticipant = () => {
    updatePlayerCount(playerCount + 1);
  };

  const handleDecrementParticipant = () => {
    if (playerCount <= 4) {
      updateCourtCount(4);
    } else {
      updateCourtCount(playerCount - 1);
    }
  };

  const handleIncrementCourt = () => {
    updateCourtCount(courtCount + 1);
  };

  const handleDecrementCourt = () => {
    if (courtCount <= 1) {
      updateCourtCount(1);
    } else {
      updateCourtCount(courtCount - 1);
    }
  };

  return (
    <Space direction="vertical">
      <Counter
        label="参加者数"
        count={playerCount}
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
