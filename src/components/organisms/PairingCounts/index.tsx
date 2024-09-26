import React from "react";
import { Space, Typography } from "antd";
import { PairingCounts as PairingCountsType } from "../../../types";

const { Text } = Typography;

type Props = {
  pairingCounts: PairingCountsType;
};

const PairingCounts: React.FC<Props> = ({ pairingCounts }) => {
  const pairingCountsString = JSON.stringify(pairingCounts);

  return (
    <>
      <Text strong>ペアリング数</Text>
      <br />
      <Space>{pairingCountsString}</Space>
    </>
  );
};

export default PairingCounts;
