import { useMatchContext } from "../contexts/MatchContext";
import { usePlayerContext } from "../contexts/PlayerContext";
import { WinnerTeam } from "../types";

const useMatchWinner = () => {
  const { players, setPlayers } = usePlayerContext();
  const { matches, setMatches } = useMatchContext();

  const updateMatchWinner = (matchIndex: number, winningTeam: WinnerTeam) => {
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

  return { updateMatchWinner, resetMatchWinner };
};

export default useMatchWinner;
