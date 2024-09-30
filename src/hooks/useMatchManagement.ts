import { useEffect, useState } from "react";
import { Match, Pair, PairingCounts, Player } from "../types";
import { usePlayers } from "../context/PlayersContext";
import { updatePlayerRatings } from "../utils/ratingUtils";

type Props = {
  playerCount: number;
  courtCount: number;
};

// コート数と参加者数から作成できるダブルスの最大の試合数を返す
const maxMatchCount = (courtCount: number, participantCount: number) => {
  return participantCount / 4 >= courtCount
    ? courtCount
    : Math.floor(participantCount / 4);
};

const useMatchManagement = (props: Props) => {
  const { playerCount, courtCount } = props;
  const { players, setPlayers } = usePlayers();
  const [previousPlayers, setPreviousPlayers] = useState(players);
  const [matches, setMatches] = useState<Match[]>([]);
  const [pairingCounts, setPairingCounts] = useState<PairingCounts>({});

  // 参加者を更新
  useEffect(() => {
    const newPlayers = Array.from({ length: playerCount }, (_, i) => ({
      id: i + 1,
      matchCount: 0,
      wins: 0,
      rating: 1500,
    }));
    setPlayers(newPlayers);
  }, [playerCount, setPlayers]);

  // 試合を追加
  const handleAddMatch = () => {
    setPreviousPlayers(players);
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
      console.error("Invalid match index");
      return;
    }

    let newPlayers = JSON.parse(JSON.stringify(players)) as Player[];
    const newPairingCounts = JSON.parse(
      JSON.stringify(pairingCounts)
    ) as PairingCounts;
    const newMatches = JSON.parse(JSON.stringify(matches)) as Match[];

    // 終了している試合の場合、試合を結果をリセット
    if (newMatches[matchIndex].isEnd) {
      newMatches[matchIndex].isEnd = false;
      newMatches[matchIndex].winnerPairIndex = undefined;
      newMatches[matchIndex].editable = true;

      // プレイヤーの情報をリセット
      resetPlayerInfo(newMatches[matchIndex], previousPlayers, newPlayers);
    } else {
      updatePlayerMatchCount(
        newPlayers,
        newMatches[matchIndex],
        1,
        winnerPairIndex
      );
      newMatches[matchIndex].isEnd = true;
      newMatches[matchIndex].winnerPairIndex = winnerPairIndex;
      newMatches[matchIndex].editable = true;

      // レーティングを更新
      newPlayers = updatePlayerRatings(newMatches[matchIndex], newPlayers);

      // ペアリング回数を更新
      newMatches[matchIndex].pairs.forEach((pair) => {
        updatePairingCounts(newPairingCounts, pair[0].id, pair[1].id);
      });
    }
    setPlayers(newPlayers);
    setPairingCounts(newPairingCounts);
    setMatches(newMatches);
  };

  // プレイヤーの試合数と勝利数を更新
  const updatePlayerMatchCount = (
    players: Player[],
    match: Match,
    increment: number, // 増分（1 または -1）
    winnerPairIndex?: number // オプションの勝者ペアインデックス
  ) => {
    // winnerPairIndex が指定されていない場合は match から取得
    const actualWinnerPairIndex =
      winnerPairIndex !== undefined ? winnerPairIndex : match.winnerPairIndex;

    match.pairs.forEach((pair, pairIndex) => {
      pair.forEach((player) => {
        const playerIndex = players.findIndex((p) => p.id === player.id);
        players[playerIndex].matchCount += increment;

        // 勝利数の増減条件を修正
        if (pairIndex === actualWinnerPairIndex) {
          players[playerIndex].wins += increment;
        }
      });
    });
  };

  // ペアリング回数を更新する関数
  const updatePairingCounts = (
    pairingCounts: PairingCounts,
    playerAId: number,
    playerBId: number,
    increment = 1
  ) => {
    // IDを小さい順に並び替える
    if (playerAId > playerBId) {
      [playerAId, playerBId] = [playerBId, playerAId];
    }

    // ネストしたオブジェクトを初期化
    if (!pairingCounts[playerAId]) {
      pairingCounts[playerAId] = {};
    }

    pairingCounts[playerAId][playerBId] =
      (pairingCounts[playerAId][playerBId] || 0) + increment;
  };

  // プレイヤー情報をリセットする関数
  const resetPlayerInfo = (
    match: Match,
    previousPlayers: Player[],
    updatedPlayers: Player[]
  ) => {
    match.pairs.forEach((pair) => {
      pair.forEach((player) => {
        const previousPlayer = previousPlayers.find(
          (previousPlayer) => previousPlayer.id === player.id
        );
        if (!previousPlayer) {
          throw new Error(
            `Player with id ${player.id} not found in previousPlayers`
          );
        }
        const updatedPlayerIndex = updatedPlayers.findIndex(
          (p) => p.id === player.id
        );
        updatedPlayers[updatedPlayerIndex] = previousPlayer;
      });
    });
  };

  return { players, pairingCounts, matches, handleAddMatch, handleMatchEnd };
};

export default useMatchManagement;
