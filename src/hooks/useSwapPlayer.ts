import { useState } from "react";
import { useMatchContext } from "../contexts/MatchContext";

type selectedPlayer = {
  matchIndex: number;
  team: number;
  playerIndex: number;
};

const useSwapPlayer = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<selectedPlayer | null>(
    null
  );
  const { matches, setMatches } = useMatchContext();

  const isPlayerSelected = (
    matchIndex: number,
    team: number,
    playerIndex: number
  ) => {
    return (
      selectedPlayer &&
      selectedPlayer.matchIndex === matchIndex &&
      selectedPlayer.team === team &&
      selectedPlayer.playerIndex === playerIndex
    );
  };

  // TODO: チームNoではなくプレイヤーidを使うように変更
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
    swapPlayers,
    isPlayerSelected,
    selectedPlayer,
    setSelectedPlayer,
  };
};

export default useSwapPlayer;
