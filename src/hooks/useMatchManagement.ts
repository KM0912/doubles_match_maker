import { useState } from "react";
import { GameHistory, Match, PairHistory, Player } from "../types";

type Props = {
  availablePlayers: Player[];
  courts: number;
  gameHistory: GameHistory;
  pairHistory: PairHistory;
  setGameHistory: React.Dispatch<React.SetStateAction<GameHistory>>;
  setPairHistory: React.Dispatch<React.SetStateAction<PairHistory>>;
};

const useMatchManagement = ({
  availablePlayers,
  courts,
  gameHistory,
  pairHistory,
  setGameHistory,
  setPairHistory,
}: Props) => {
  const [matches, setMatches] = useState<Match[]>([]);

  const generateMatches = () => {
    const maxGames = Math.min(Math.floor(availablePlayers.length / 4), courts);
    const newMatches: Match[] = [];

    for (let i = 0; i < maxGames; i++) {
      const currentPlayers = availablePlayers.slice(i * 4, i * 4 + 4);
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
    const updatedGameHistory = { ...gameHistory };
    const updatedPairHistory = { ...pairHistory };

    newMatches.forEach((match) => {
      [...match.team1, ...match.team2].forEach((player) => {
        updatedGameHistory[player.id] =
          (updatedGameHistory[player.id] || 0) + 1;
      });

      const [p1, p2] = match.team1;
      updatedPairHistory[p1.id] = updatedPairHistory[p1.id] || {};
      updatedPairHistory[p2.id] = updatedPairHistory[p2.id] || {};
      updatedPairHistory[p1.id][p2.id] =
        (updatedPairHistory[p1.id][p2.id] || 0) + 1;
      updatedPairHistory[p2.id][p1.id] =
        (updatedPairHistory[p2.id][p1.id] || 0) + 1;

      const [p3, p4] = match.team2;
      updatedPairHistory[p3.id] = updatedPairHistory[p3.id] || {};
      updatedPairHistory[p4.id] = updatedPairHistory[p4.id] || {};
      updatedPairHistory[p3.id][p4.id] =
        (updatedPairHistory[p3.id][p4.id] || 0) + 1;
      updatedPairHistory[p4.id][p3.id] =
        (updatedPairHistory[p4.id][p3.id] || 0) + 1;
    });

    setGameHistory(updatedGameHistory);
    setPairHistory(updatedPairHistory);
  };

  const findBestPairs = (players: Player[]) => {
    let bestPairScore = Infinity;
    let bestPairs: { team1: Player[]; team2: Player[] } | null = null;

    for (let i = 0; i < players.length - 1; i++) {
      for (let j = i + 1; j < players.length; j++) {
        const team1 = [players[i], players[j]];
        const remaining = players.filter((p) => !team1.includes(p));

        for (let k = 0; k < remaining.length - 1; k++) {
          for (let l = k + 1; l < remaining.length; l++) {
            const team2 = [remaining[k], remaining[l]];
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

  return {
    matches,
    setMatches,
    generateMatches,
  };
};

export default useMatchManagement;
