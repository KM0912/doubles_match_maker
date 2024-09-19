import React, { useState } from "react";
import { Button, Space, Typography } from "antd";
import PairButton from "../molecules/PairButton";
import SetupControls from "../organisms/SetupControls";
import ParticipantList from "../organisms/ParticipantList";
import { Player } from "../../ types";
import useMatchManagement from "../../hooks/useMatchManagement";

const { Text } = Typography;

// type DataType = {
//   key: string;
//   [key: number]: number | undefined;
// };

const Home = () => {
  const [participantCount, setParticipantCount] = useState(4);
  const [courtCount, setCourtCount] = useState(1);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [participants, setParticipants] = useState<Player[]>([]);
  const { matches, handleAddMatch, handleMatchEnd } = useMatchManagement({
    participants,
    setParticipants,
    courtCount,
  });

  const handleIncrementParticipant = () => {
    setParticipantCount(participantCount + 1);
  };

  const handleDecrementParticipant = () => {
    if (participantCount <= 4) {
      setParticipantCount(4);
    } else {
      setParticipantCount(participantCount - 1);
    }
  };

  const handleIncrementCourt = () => {
    setCourtCount(courtCount + 1);
  };

  const handleDecrementCourt = () => {
    if (courtCount <= 1) {
      setCourtCount(1);
    } else {
      setCourtCount(courtCount - 1);
    }
  };

  // 確定ボタンを押したときの処理
  const handleSetupComplete = () => {
    const newParticipants = Array.from(
      { length: participantCount },
      (_, i) => i + 1
    );
    setParticipants(
      newParticipants.map((id) => ({ id, matchCount: 0, pairHistory: [] }))
    );
    setIsSetupComplete(true);
  };

  // const columns: TableProps<DataType>["columns"] = [
  //   {
  //     title: "RowHead",
  //     dataIndex: "key",
  //     rowScope: "row",
  //   },
  //   ...participants.map((participant) => ({
  //     title: participant.id.toString(),
  //     dataIndex: participant.id.toString(),
  //   })),
  // ];

  // const data: DataType[] = participants.map((participant) => {
  //   const dynamicData: { key: string; [key: number]: number | undefined } = {
  //     key: participant.id.toString(),
  //   };

  //   participant.pairHistory.forEach((pair) => {
  //     dynamicData[pair.partnerId] = pair.timesPaired;
  //   });

  //   return dynamicData;
  // });

  return (
    <>
      <Space direction="vertical">
        {!isSetupComplete && (
          <>
            <SetupControls
              participantCount={participantCount}
              courtCount={courtCount}
              handleIncrementParticipant={handleIncrementParticipant}
              handleDecrementParticipant={handleDecrementParticipant}
              handleIncrementCourt={handleIncrementCourt}
              handleDecrementCourt={handleDecrementCourt}
              handleSetupComplete={handleSetupComplete}
            />
          </>
        )}
        {isSetupComplete && (
          <>
            <Text strong>
              参加者数：{participantCount}人、コート数：{courtCount}面
            </Text>
            <ParticipantList participants={participants} />
            {/* <Table columns={columns} dataSource={data} bordered /> */}

            {matches.map((match, index) => (
              <>
                <Space key={index} direction="horizontal">
                  <PairButton disabled={match.isEnd} pairs={match.Pairs[0]} />
                  <Text>VS</Text>
                  <PairButton disabled={match.isEnd} pairs={match.Pairs[1]} />
                  <Button
                    disabled={match.isEnd}
                    onClick={() => handleMatchEnd(index)}
                  >
                    試合終了
                  </Button>
                </Space>
              </>
            ))}
            <Button type="primary" onClick={handleAddMatch}>
              試合を追加
            </Button>
          </>
        )}
      </Space>
    </>
  );
};

export default Home;
