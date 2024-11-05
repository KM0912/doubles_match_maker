import { useMemo, useState } from "react";
import { OnBreakState, Player } from "../types";

const usePlayerManager = () => {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, gamesPlayed: 0 },
    { id: 2, gamesPlayed: 0 },
    { id: 3, gamesPlayed: 0 },
    { id: 4, gamesPlayed: 0 },
  ]);
  const [onBreak, setOnBreak] = useState<OnBreakState>({});

  // 試合に参加可能なプレイヤーを返す
  const availablePlayers = useMemo(() => {
    return [...players]
      .filter((player) => !onBreak[player.id])
      .sort((a, b) => a.gamesPlayed - b.gamesPlayed);
  }, [players, onBreak]);

  return {
    players,
    setPlayers,
    onBreak,
    setOnBreak,
    availablePlayers,
  };
};

export default usePlayerManager;
