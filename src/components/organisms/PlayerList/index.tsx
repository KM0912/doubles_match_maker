import React from "react";
import { Table, TableProps, Typography, Button, Space } from "antd";
import { Player } from "../../../types";
import { usePlayers } from "../../../context/PlayersContext";

const { Title, Text } = Typography;

const columns: TableProps<Player>["columns"] = [
  {
    title: "参加者No",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "試合数",
    dataIndex: "matchCount",
    key: "matchCount",
    align: "center",
  },
  {
    title: "勝数",
    dataIndex: "wins",
    key: "wins",
    align: "center",
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
    align: "right",
  },
  {
    title: "レーティング",
    dataIndex: "rating",
    key: "rating",
    render: (_, record) => <Text>{record.rating.toFixed(2)}</Text>,
    align: "right",
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
      rating: 1500,
    };

    addPlayer(newPlayer);
  };

  return (
    <>
      <Title level={4}>参加者一覧</Title>
      <Space direction="vertical">
        <Table
          dataSource={players}
          columns={columns}
          pagination={false}
          size="small"
        />
        <Button
          type="primary"
          onClick={handleAddPlayer}
          style={{ width: "100%" }}
        >
          参加者を追加
        </Button>
      </Space>
    </>
  );
};

export default PlayerList;
