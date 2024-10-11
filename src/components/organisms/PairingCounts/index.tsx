import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import { PairingCounts as PairingCountsType } from "../../../types";
import { usePlayers } from "../../../context/PlayersContext";

const { Text } = Typography;

type Props = {
  pairingCounts: PairingCountsType;
};

type DataSource = {
  userId1: number;
  userId2: number;
  count: number;
}[];

const PairingCounts: React.FC<Props> = ({ pairingCounts }) => {
  const { players } = usePlayers();
  const [dataSource, setDataSource] = useState<DataSource>([]);

  useEffect(() => {
    const newDataSource: DataSource = [];
    const playerIds = players.map((player) => player.id);

    playerIds.forEach((userId1) => {
      playerIds.forEach((userId2) => {
        if (userId1 !== userId2) {
          const count =
            userId1 < userId2
              ? pairingCounts[userId1]?.[userId2] || 0
              : pairingCounts[userId2]?.[userId1] || 0;
          newDataSource.push({ userId1, userId2, count });
        }
      });
    });

    newDataSource.sort((a, b) => {
      if (a.userId1 === b.userId1) {
        return a.userId2 - b.userId2;
      }
      return a.userId1 - b.userId1;
    });

    setDataSource(newDataSource);
  }, [pairingCounts, players]);

  const columns = [
    {
      title: "ユーザー1",
      dataIndex: "userId1",
      key: "userId1",
    },
    {
      title: "ユーザー2",
      dataIndex: "userId2",
      key: "userId2",
    },
    {
      title: "カウント",
      dataIndex: "count",
      key: "count",
    },
  ];

  return (
    <>
      <Text strong>ペア数</Text>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </>
  );
};

export default PairingCounts;
