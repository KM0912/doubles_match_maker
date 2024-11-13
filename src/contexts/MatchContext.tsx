import React, { createContext, useContext, useState, ReactNode } from "react";
import { Match, Player, Team } from "../types";
import { usePlayerContext } from "./PlayerContext";

type MatchContextType = {
  matches: Match[];
  setMatches: React.Dispatch<React.SetStateAction<Match[]>>;
  generateMatches: (courts: number) => void;
  completeMatches: () => void;
  isPlayerInMatch: (playerId: number) => boolean;
};

type Props = {
  children: ReactNode;
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const MatchProvider: React.FC<Props> = ({ children }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const {
    players,
    updatePlayers,
    availablePlayers,
    pairHistory,
    updatePairHistoryByMatches,
  } = usePlayerContext();

  // 新しい試合を生成する
  const generateMatches = (courts: number) => {
    const maxGames = Math.min(Math.floor(availablePlayers.length / 4), courts);
    const newMatches: Match[] = [];

    // 試合に参加するプレイヤーを選ぶ
    let waitingPlayers = [...availablePlayers];
    let currentPlayers: Player[] = [];
    while (waitingPlayers.length > 0) {
      // 試合に入れるプレイヤーの中で最小の試合数を取得
      const minGamePlayed = Math.min(
        ...waitingPlayers.map((p) => p.gamesPlayed)
      );

      // 試合数が最小のプレイヤーをwaitingAvailablePlayersから取り出して配列から削除する
      const newGamePlayers = waitingPlayers.filter(
        (p) => p.gamesPlayed === minGamePlayed
      );
      waitingPlayers = waitingPlayers.filter(
        (p) => p.gamesPlayed !== minGamePlayed
      );

      if (currentPlayers.length + newGamePlayers.length >= maxGames * 4) {
        // 試合に必要な人数に達している場合
        // 試合に必要な残りの人数を計算
        const remainingPlayers = maxGames * 4 - currentPlayers.length;

        // newGamePlayersからランダムにremainingPlayers人取り出す
        const randomPlayers = newGamePlayers
          .sort(() => Math.random() - 0.5)
          .slice(0, remainingPlayers);

        currentPlayers.push(...randomPlayers);
        break;
      } else {
        currentPlayers.push(...newGamePlayers);
      }
    }

    // 試合を生成
    for (let i = 0; i < maxGames; i++) {
      // ペアを生成して試合を追加
      const bestMatch = findBestPairs(currentPlayers);
      if (bestMatch) {
        newMatches.push({
          team1: bestMatch.team1,
          team2: bestMatch.team2,
          id: Date.now() + i,
          winner: null,
        });

        // 試合に参加したプレイヤーをcurrentPlayersから削除
        const bestMatchPlayers = [...bestMatch.team1, ...bestMatch.team2];
        currentPlayers = currentPlayers.filter(
          (p) => !bestMatchPlayers.some((bp) => bp.id === p.id)
        );
      } else {
        console.error("ペアの生成に失敗しました");
        break;
      }
    }

    setMatches(newMatches);
  };

  const completeMatches = () => {
    const playersInMatches = matches.reduce(
      (acc, match) => [...acc, ...match.team1, ...match.team2],
      [] as Player[]
    );
    const updatedPlayers = players.map((player) =>
      playersInMatches.some((p) => p.id === player.id)
        ? { ...player, gamesPlayed: player.gamesPlayed + 1 }
        : player
    );

    updatePlayers(updatedPlayers);
    setMatches([]);
    updatePairHistoryByMatches(matches);
  };

  // 指定したプレイヤーが試合中かどうかを返す
  const isPlayerInMatch = (playerId: number) => {
    return matches.some(
      (match) =>
        match.team1.some((p) => p.id === playerId) ||
        match.team2.some((p) => p.id === playerId)
    );
  };

  const findBestPairs = (players: Player[]) => {
    let bestPairScore = Infinity;
    let bestPairs: { team1: Team; team2: Team } | null = null;

    for (let i = 0; i < players.length - 1; i++) {
      for (let j = i + 1; j < players.length; j++) {
        const team1: Team = [players[i], players[j]];
        const remaining = players.filter((p) => !team1.includes(p));

        for (let k = 0; k < remaining.length - 1; k++) {
          for (let l = k + 1; l < remaining.length; l++) {
            const team2: Team = [remaining[k], remaining[l]];
            const pairScore =
              (pairHistory[team1[0].id]?.[team1[1].id] || 0) +
              (pairHistory[team2[0].id]?.[team2[1].id] || 0);

            if (pairScore < bestPairScore) {
              bestPairScore = pairScore;
              bestPairs = { team1, team2 };
            }
          }
        }
      }
    }

    return bestPairs;
  };

  const value = {
    matches,
    setMatches,
    generateMatches,
    completeMatches,
    isPlayerInMatch,
  };

  return (
    <MatchContext.Provider value={value}>{children}</MatchContext.Provider>
  );
};

export const useMatchContext = (): MatchContextType => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useMatchContext must be used within a PlayerProvider");
  }
  return context;
};
