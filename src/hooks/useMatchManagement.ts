import { useState } from "react";
import { Match, Pair, Player } from "../ types";

type Props = {
  participants: Player[];
  setParticipants: (participants: Player[]) => void;
  courtCount: number;
};

// コート数と参加者数から作成できるダブルスの最大の試合数を返す
const maxMatchCount = (courtCount: number, participantCount: number) => {
  // 参加者数 / 4 >= コート数 の場合、コート数分の試合を作成
  if (participantCount / 4 >= courtCount) {
    return courtCount;
  }
  // 参加者数 / 4 < コート数 の場合、参加者数 / 4 の試合を作成
  return Math.floor(participantCount / 4);
};

const useMatchManagement = (props: Props) => {
  const { participants, setParticipants, courtCount } = props;
  const [matches, setMatches] = useState<Match[]>([]);

  // 試合を追加
  const handleAddMatch = () => {
    const newMatches = [...matches];

    // 作成する試合数を取得
    const matchCount = maxMatchCount(courtCount, participants.length);

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

  // 試合終了時の処理
  const handleMatchEnd = (matchIndex: number) => {
    const newMatches = structuredClone(matches) as Match[];
    newMatches[matchIndex].isEnd = true;
    setMatches(newMatches);

    // 参加者の試合数を更新(試合が終了したときに試合数をインクリメント)
    const newParticipants = structuredClone(participants) as Player[];
    newMatches[matchIndex].Pairs.flat().forEach((pair) => {
      newParticipants[pair.id - 1].matchCount++;
    });

    setParticipants(newParticipants);
  };

  return { matches, handleAddMatch, handleMatchEnd };
};

export default useMatchManagement;
