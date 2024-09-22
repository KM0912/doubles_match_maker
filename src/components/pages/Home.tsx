import React, { useState } from "react";
import { Button, Space, Typography } from "antd";
import SetupControls from "../organisms/SetupControls";
import useMatchManagement from "../../hooks/useMatchManagement";
import PlayerList from "../organisms/PlayerList";
import Matchup from "../molecules/Matchup";

const { Text } = Typography;

const Home = () => {
  const [playerCount, setPlayerCount] = useState(4);
  const [courtCount, setCourtCount] = useState(1);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { players, pairingCounts, matches, handleAddMatch, handleMatchEnd } =
    useMatchManagement({
      playerCount,
      courtCount,
    });

  const handleIncrementParticipant = () => {
    setPlayerCount(playerCount + 1);
  };

  const handleDecrementParticipant = () => {
    if (playerCount <= 4) {
      setPlayerCount(4);
    } else {
      setPlayerCount(playerCount - 1);
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
    setIsSetupComplete(true);
  };

  const handleClickWin = (matchIndex: number, pairIndex: number) => {
    handleMatchEnd(matchIndex, pairIndex);
  };

  // すべての試合が終了しているかどうか
  const isAllMatchEnd = matches.every((match) => match.isEnd);

  return (
    <>
      <Space direction="vertical">
        {!isSetupComplete && (
          <>
            <SetupControls
              participantCount={playerCount}
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
              参加者数：{playerCount}人、コート数：{courtCount}面
            </Text>
            <PlayerList players={players} />
            <Text strong>ペアリング数</Text>
            <Space>{JSON.stringify(pairingCounts)}</Space>
            {/* <Table columns={columns} dataSource={data} bordered /> */}

            {matches.map((match, index) => (
              <Matchup
                key={index}
                match={match}
                index={index}
                onClickWin={handleClickWin}
              />
            ))}
            <Button
              type="primary"
              onClick={handleAddMatch}
              disabled={!isAllMatchEnd}
            >
              試合を追加
            </Button>
          </>
        )}
      </Space>
    </>
  );
};

export default Home;
