import React, { useState } from "react";
import { Button, Space, Typography } from "antd";
import PairButton from "../molecules/PairButton";
import SetupControls from "../organisms/SetupControls";
import ParticipantList from "../organisms/ParticipantList";

const { Text } = Typography;

type Pair = [Player, Player];
type Match = {
  Pairs: [Pair, Pair];
  isEnd: boolean;
};
type Matches = Match[];

type PairHistory = {
  partnerId: number;
  timesPaired: number;
};

export type Player = {
  id: number;
  matchCount: number;
  pairHistory: PairHistory[];
};

const Home = () => {
  const [participantCount, setParticipantCount] = useState(4);
  const [courtCount, setCourtCount] = useState(1);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [participants, setParticipants] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Matches>([]);

  // コート数と参加者数から作成できるダブルスの最大の試合数を返す
  const maxMatchCount = (courtCount: number, participantCount: number) => {
    // 参加者数 / 4 >= コート数 の場合、コート数分の試合を作成
    if (participantCount / 4 >= courtCount) {
      return courtCount;
    }
    // 参加者数 / 4 < コート数 の場合、参加者数 / 4 の試合を作成
    return Math.floor(participantCount / 4);
  };

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

  // 試合終了ボタンを押したときの処理
  const handleMatchEnd = (matchIndex: number) => {
    const newMatches = [...matches];
    newMatches[matchIndex].isEnd = true;
    setMatches(newMatches);

    // 参加者の試合数を更新(試合が終了したときに試合数をインクリメント)
    const newParticipants = [...participants];
    newMatches[matchIndex].Pairs.flat().forEach((pair) => {
      newParticipants[pair.id - 1].matchCount++;
    });

    // ペアの履歴を更新
    newMatches[matchIndex].Pairs.forEach((pair) => {
      pair.forEach((player) => {
        const partnerId = pair.find((p) => p.id !== player.id)!.id;
        if (player.pairHistory.some((p) => p.partnerId === partnerId)) {
          player.pairHistory.find((p) => p.partnerId === partnerId)!
            .timesPaired++;
        } else {
          player.pairHistory.push({ partnerId, timesPaired: 1 });
        }
      });
    });
  };

  // 試合を追加する
  const handleAddMatch = () => {
    const newMatches = [...matches];

    // 作成する試合数を取得
    const matchCount = maxMatchCount(courtCount, participantCount);

    // 参加者をランダムに並び替える
    const shuffledParticipants = [...participants].sort(
      () => Math.random() - 0.5
    );

    // 試合数の少ない順に並べる
    shuffledParticipants.sort((a, b) => a.matchCount - b.matchCount);

    // 先頭から試合数 x 4 人を取得
    const players = shuffledParticipants.slice(0, matchCount * 4);

    // 試合を作成
    for (let i = 0; i < matchCount; i++) {
      const pair1: Pair = players.slice(i * 4, i * 4 + 2) as Pair;
      const pair2: Pair = players.slice(i * 4 + 2, i * 4 + 4) as Pair;
      newMatches.push({ Pairs: [pair1, pair2], isEnd: false });
    }

    setMatches(newMatches);
  };

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
