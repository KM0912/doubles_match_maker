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

    for (let i = 0; i < maxGames; i++) {
      // 試合数の少ない人 & idの小さい順に4人取り出す
      const sortedPlayers = availablePlayers.sort(
        (a, b) => a.gamesPlayed - b.gamesPlayed || a.id - b.id
      );
      const currentPlayers = sortedPlayers.slice(i * 4, i * 4 + 4);

      if (currentPlayers.length === 4) {
        const bestMatch = findBestPairs(currentPlayers);
        if (bestMatch) {
          newMatches.push({
            team1: bestMatch.team1,
            team2: bestMatch.team2,
            id: Date.now() + i,
            winner: null,
          });
        }
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
