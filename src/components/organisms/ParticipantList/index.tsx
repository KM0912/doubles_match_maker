import React from "react";
import { Space, Typography } from "antd";
import { Player } from "../../pages/Home";

const { Title, Text } = Typography;

interface ParticipantListProps {
  participants: Player[];
}

const ParticipantList: React.FC<ParticipantListProps> = ({ participants }) => (
  <>
    <Title level={4}>参加者一覧</Title>
    <Space direction="vertical">
      {participants.map((participant) => (
        <Space direction="horizontal" key={participant.id}>
          <Text>No.{participant.id}</Text>
          <Text>試合数：{participant.matchCount}</Text>
          <Text>ペア履歴：{JSON.stringify(participant.pairHistory)}</Text>
        </Space>
      ))}
    </Space>
  </>
);

export default ParticipantList;
