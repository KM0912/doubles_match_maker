import { useEffect, useState } from "react";
import { Match, Pair, Player } from "../ types";

type Props = {
  playerCount: number;
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
  const { playerCount, courtCount } = props;
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  // 参加者を更新
  useEffect(() => {
    const newPlayers = Array.from({ length: playerCount }, (_, i) => ({
      id: i + 1,
      matchCount: 0,
      wins: 0,
    }));
    setPlayers(newPlayers);
  }, [playerCount]);

  // 試合を追加
  const handleAddMatch = () => {
    const newMatches = [...matches];

    // 作成する試合数を取得
    const matchCount = maxMatchCount(courtCount, players.length);

    // 参加者をランダムに並び替える
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

    // 試合数の少ない順に並べる
    shuffledPlayers.sort((a, b) => a.matchCount - b.matchCount);

    // 先頭から試合数 x 4 人を取得
    const group = shuffledPlayers.slice(0, matchCount * 4);

    // 試合を作成
    for (let i = 0; i < matchCount; i++) {
      const pair1: Pair = group.slice(i * 4, i * 4 + 2) as Pair;
      const pair2: Pair = group.slice(i * 4 + 2, i * 4 + 4) as Pair;
      newMatches.push({ Pairs: [pair1, pair2], isEnd: false });
    }

    setMatches(newMatches);
  };

  // 試合終了時の処理
  const handleMatchEnd = (matchIndex: number, winnerPairIndex: number) => {
    const newPlayers = structuredClone(players) as Player[];
    const newMatches = structuredClone(matches) as Match[];

    // 終了している試合の場合、試合を結果をリセット
    if (newMatches[matchIndex].isEnd) {
      decrementPlayerMatchCount(newPlayers, newMatches[matchIndex]);
      newMatches[matchIndex].isEnd = false;
      newMatches[matchIndex].winnerPairIndex = undefined;
    } else {
      incrementPlayerMatchCount(
        newPlayers,
        newMatches[matchIndex],
        winnerPairIndex
      );
      newMatches[matchIndex].isEnd = true;
      newMatches[matchIndex].winnerPairIndex = winnerPairIndex;
    }
    setPlayers(newPlayers);
    setMatches(newMatches);
  };

  // プレイヤーの試合数と勝利数をインクリメント
  const incrementPlayerMatchCount = (
    players: Player[],
    match: Match,
    winnerPairIndex: number
  ) => {
    match.Pairs.forEach((pair, pairIndex) => {
      pair.forEach((player) => {
        players[player.id - 1].matchCount++;
        players[player.id - 1].wins += pairIndex === winnerPairIndex ? 1 : 0;
      });
    });
  };

  // プレイヤーの試合数と勝利数をディクリメント
  const decrementPlayerMatchCount = (players: Player[], match: Match) => {
    match.Pairs.forEach((pair, pairIndex) => {
      pair.forEach((player) => {
        players[player.id - 1].matchCount--;
        players[player.id - 1].wins -=
          pairIndex === match.winnerPairIndex ? 1 : 0;
      });
    });
  };

  return { players, matches, handleAddMatch, handleMatchEnd };
};

export default useMatchManagement;
