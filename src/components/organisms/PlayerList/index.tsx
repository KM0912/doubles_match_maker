import React from "react";
import { Space, Typography } from "antd";
import { Player } from "../../../types";

const { Title, Text } = Typography;

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => (
  <>
    <Title level={4}>参加者一覧</Title>
    <Space direction="vertical">
      {players.map((player) => (
        <Space direction="horizontal" key={player.id}>
          <Text>No.{player.id}</Text>
          <Text>試合数：{player.matchCount}</Text>
          <Text>勝利数：{player.wins}</Text>
          <Text>
            勝率：
            {player.wins
              ? ((player.wins / player.matchCount) * 100).toFixed(2)
              : 0}
            %
          </Text>
        </Space>
      ))}
    </Space>
  </>
);

export default PlayerList;