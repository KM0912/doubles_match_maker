import React from "react";
import { Space, Typography } from "antd";

const { Title, Text } = Typography;

interface Participant {
  id: number;
  matchCount: number;
}

interface ParticipantListProps {
  participants: Participant[];
}

const ParticipantList: React.FC<ParticipantListProps> = ({ participants }) => (
  <>
    <Title level={4}>参加者一覧</Title>
    <Space direction="vertical">
      {participants.map((participant) => (
        <Space direction="horizontal" key={participant.id}>
          <Text>No.{participant.id}</Text>
          <Text>試合数：{participant.matchCount}</Text>
        </Space>
      ))}
    </Space>
  </>
);

export default ParticipantList;
