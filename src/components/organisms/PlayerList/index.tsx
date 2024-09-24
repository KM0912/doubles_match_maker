import React from "react";
import { Table, TableProps, Typography } from "antd";
import { Player } from "../../../types";

const { Title, Text } = Typography;

type PlayerListProps = {
  players: Player[];
};

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
  },
  {
    render: (_, record) => (
      <Text>
        {record.wins ? ((record.wins / record.matchCount) * 100).toFixed(2) : 0}
        %
      </Text>
    ),
  },
];

const PlayerList: React.FC<PlayerListProps> = ({ players }) => (
  <>
    <Title level={4}>参加者一覧</Title>
    <Table
      dataSource={players}
      columns={columns}
      pagination={false}
      size="small"
    />
  </>
);

export default PlayerList;
