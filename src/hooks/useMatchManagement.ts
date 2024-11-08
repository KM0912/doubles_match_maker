import { useState } from "react";
import { Match, PairHistory, Player } from "../types";
import { usePlayerContext } from "../contexts/PlayerContext";

type selectedPlayer = {
  matchIndex: number;
  team: number;
  playerIndex: number;
};

type Props = {
  courts: number;
  pairHistory: PairHistory;
  setPairHistory: React.Dispatch<React.SetStateAction<PairHistory>>;
};

const useMatchManagement = ({ courts, pairHistory, setPairHistory }: Props) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<selectedPlayer | null>(
    null
  );
  const { players, setPlayers, availablePlayers } = usePlayerContext();

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
    const updatedPairHistory = { ...pairHistory };

    newMatches.forEach((match) => {
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

    setPlayers(updatedPlayers);
    setMatches([]);
  };

  const isPlayerInMatch = (playerId: number) => {
    return matches.some(
      (match) =>
        match.team1.some((p) => p.id === playerId) ||
        match.team2.some((p) => p.id === playerId)
    );
  };

  const setMatchWinner = (matchIndex: number, winningTeam: number) => {
    const newMatches = [...matches];
    const match = newMatches[matchIndex];
    match.winner = winningTeam;
    setMatches(newMatches);

    const winningPlayers = winningTeam === 1 ? match.team1 : match.team2;
    const winningPlayerIds = new Set(winningPlayers.map((player) => player.id));

    const updatedPlayers = players.map((player) =>
      winningPlayerIds.has(player.id)
        ? { ...player, wins: player.wins + 1 }
        : player
    );

    setPlayers(updatedPlayers);
  };

  const resetMatchWinner = (matchIndex: number) => {
    const newMatches = [...matches];
    const match = newMatches[matchIndex];
    const winningTeam = match.winner;

    match.winner = null;
    setMatches(newMatches);

    const winningPlayers = winningTeam === 1 ? match.team1 : match.team2;
    const winningPlayerIds = new Set(winningPlayers.map((player) => player.id));

    const updatedPlayers = players.map((player) =>
      winningPlayerIds.has(player.id)
        ? { ...player, wins: player.wins - 1 }
        : player
    );

    setPlayers(updatedPlayers);
  };

  const swapPlayers = (
    matchIndex: number,
    teamNumber: number,
    playerIndex: number
  ) => {
    if (!selectedPlayer) {
      setSelectedPlayer({ matchIndex, team: teamNumber, playerIndex });
      return;
    }

    const newMatches = [...matches];
    const currentMatch = newMatches[matchIndex];
    const previousMatch = newMatches[selectedPlayer.matchIndex];

    const currentTeam = teamNumber === 1 ? "team1" : "team2";
    const previousTeam = selectedPlayer.team === 1 ? "team1" : "team2";

    const temp = currentMatch[currentTeam][playerIndex];
    currentMatch[currentTeam][playerIndex] =
      previousMatch[previousTeam][selectedPlayer.playerIndex];
    previousMatch[previousTeam][selectedPlayer.playerIndex] = temp;

    setMatches(newMatches);
    setSelectedPlayer(null);
  };

  return {
    matches,
    setMatches,
    setMatchWinner,
    resetMatchWinner,
    generateMatches,
    completeMatches,
    isPlayerInMatch,
    selectedPlayer,
    setSelectedPlayer,
    swapPlayers,
  };
};

export default useMatchManagement;
