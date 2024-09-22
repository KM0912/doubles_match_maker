import { useEffect, useState } from "react";
import { Match, Pair, Player } from "../types";

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
    const newMatches = JSON.parse(JSON.stringify(matches)) as Match[];
    // 過去の試合を編集不可にする
    newMatches.forEach((match) => {
      match.editable = false;
    });

    // 作成する試合数を取得
    const matchCount = maxMatchCount(courtCount, players.length);

    // 参加者をランダムに並び替える
    // 試合数が少ない順に並び替える
    const shuffledPlayers = [...players]
      .sort(() => Math.random() - 0.5)
      .sort((a, b) => a.matchCount - b.matchCount);

    // 先頭から試合数 x 4 人を取得
    const group = shuffledPlayers.slice(0, matchCount * 4);

    // 勝率の高い順に並べる
    // TODO: 勝率ではなくレーティングを元に並べ替える
    //        勝率だと試合数が少ない人が上位に来てしまう
    group.sort((a, b) => {
      const aWinRate = a.matchCount === 0 ? 0 : a.wins / a.matchCount;
      const bWinRate = b.matchCount === 0 ? 0 : b.wins / b.matchCount;
      return bWinRate - aWinRate;
    });

    // 試合を作成
    for (let i = 0; i < matchCount; i++) {
      // 試合する４人を取得
      const matchPlayers = group.slice(i * 4, i * 4 + 4);

      // 勝率が１位と４位、２位と３位のペアを作成
      const pair1: Pair = [matchPlayers[0], matchPlayers[3]];
      const pair2: Pair = [matchPlayers[1], matchPlayers[2]];
      newMatches.push({ pairs: [pair1, pair2], isEnd: false, editable: true });
    }

    setMatches(newMatches);
  };

  // 試合終了時の処理
  const handleMatchEnd = (matchIndex: number, winnerPairIndex: number) => {
    if (matchIndex < 0 || matchIndex >= matches.length) {
      // matchIndexが範囲外の場合は処理を中断
      console.error("Invalid match index");
      return;
    }

    const newPlayers = JSON.parse(JSON.stringify(players)) as Player[];
    const newMatches = JSON.parse(JSON.stringify(matches)) as Match[];

    // 終了している試合の場合、試合を結果をリセット
    if (newMatches[matchIndex].isEnd) {
      decrementPlayerMatchCount(newPlayers, newMatches[matchIndex]);
      newMatches[matchIndex].isEnd = false;
      newMatches[matchIndex].winnerPairIndex = undefined;
      newMatches[matchIndex].editable = true;
    } else {
      incrementPlayerMatchCount(
        newPlayers,
        newMatches[matchIndex],
        winnerPairIndex
      );
      newMatches[matchIndex].isEnd = true;
      newMatches[matchIndex].winnerPairIndex = winnerPairIndex;
      newMatches[matchIndex].editable = true;
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
    match.pairs.forEach((pair, pairIndex) => {
      pair.forEach((player) => {
        const playerIndex = players.findIndex((p) => p.id === player.id);
        players[playerIndex].matchCount++;
        players[playerIndex].wins += pairIndex === winnerPairIndex ? 1 : 0;
      });
    });
  };

  // プレイヤーの試合数と勝利数をディクリメント
  const decrementPlayerMatchCount = (players: Player[], match: Match) => {
    match.pairs.forEach((pair, pairIndex) => {
      pair.forEach((player) => {
        const playerIndex = players.findIndex((p) => p.id === player.id);
        players[playerIndex].matchCount--;
        players[playerIndex].wins -=
          pairIndex === match.winnerPairIndex ? 1 : 0;
      });
    });
  };

  return { players, matches, handleAddMatch, handleMatchEnd };
};

export default useMatchManagement;
