import { useMatchContext } from "../contexts/MatchContext";
import { usePlayerContext } from "../contexts/PlayerContext";
import { WinnerTeam } from "../types";

const useMatchWinner = () => {
  const { players, updatePlayers } = usePlayerContext();
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

    updatePlayers(updatedPlayers);
  };

  const resetMatchWinner = (matchIndex: number) => {
    if (matchIndex < 0 || matchIndex >= matches.length) {
      throw new Error("Invalid match index");
    }
    const newMatches = [...matches];
    const match = { ...newMatches[matchIndex] };
    const winningTeam = match.winner;

    if (winningTeam === null) {
      return; // Already reset
    }
    match.winner = null;
    newMatches[matchIndex] = match;
    setMatches(newMatches);
    const winningPlayers = winningTeam === 1 ? match.team1 : match.team2;
    if (!winningPlayers?.length) {
      throw new Error("No players found in previous winning team");
    }
    const winningPlayerIds = new Set(winningPlayers.map((player) => player.id));
    const updatedPlayers = players.map((player) =>
      winningPlayerIds.has(player.id)
        ? { ...player, wins: Math.max(0, player.wins - 1) }
        : player
    );
    updatePlayers(updatedPlayers);
  };

  return { updateMatchWinner, resetMatchWinner };
};

export default useMatchWinner;
