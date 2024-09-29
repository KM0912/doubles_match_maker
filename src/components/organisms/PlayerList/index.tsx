import React from "react";
import { Table, TableProps, Typography, Button } from "antd";
import { Player } from "../../../types";
import { usePlayers } from "../../../context/PlayersContext";

const { Title, Text } = Typography;

const columns: TableProps<Player>["columns"] = [
  {
    title: "参加者No",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "試合数",
    dataIndex: "matchCount",
    key: "matchCount",
  },
  {
    title: "勝数",
    dataIndex: "wins",
    key: "wins",
  },
  {
    title: "勝率",
    dataIndex: "winRate",
    key: "winRate",
    render: (_, record) => (
      <Text>
        {record.wins ? ((record.wins / record.matchCount) * 100).toFixed(2) : 0}
        %
      </Text>
    ),
  },
];

const PlayerList: React.FC = () => {
  const { players, addPlayer } = usePlayers();
  const handleAddPlayer = () => {
    // 試合数が少ない順に試合を割り振るため、途中参加者は最小の試合数に合わせる
    // 試合数０にしてしまうと、途中参加者が最優先されてしまう
    const newPlayer: Player = {
      id: Math.max(...players.map((player) => player.id)) + 1,
      matchCount: Math.min(...players.map((player) => player.matchCount)),
      wins: 0,
    };

    addPlayer(newPlayer);
  };

  return (
    <>
      <Title level={4}>参加者一覧</Title>
      <Table
        dataSource={players}
        columns={columns}
        pagination={false}
        size="small"
      />
      <Button type="primary" onClick={handleAddPlayer}>
        追加
      </Button>
    </>
  );
};

export default PlayerList;
