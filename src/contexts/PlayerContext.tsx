import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { PairHistory, Player } from "../types";

type PlayerContextType = {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  addPlayer: () => void;
  setOnBreak: (playerId: number, isOnBreak: boolean) => void;
  playerCount: number;
  availablePlayers: Player[];
  pairHistory: PairHistory;
  setPairHistory: React.Dispatch<React.SetStateAction<PairHistory>>;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const PlayerProvider: React.FC<Props> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, gamesPlayed: 0, wins: 0, onBreak: false },
    { id: 2, gamesPlayed: 0, wins: 0, onBreak: false },
    { id: 3, gamesPlayed: 0, wins: 0, onBreak: false },
    { id: 4, gamesPlayed: 0, wins: 0, onBreak: false },
  ]);
  const [pairHistory, setPairHistory] = useState<PairHistory>({});

  const addPlayer = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers,
      { id: prevPlayers.length + 1, gamesPlayed: 0, wins: 0, onBreak: false },
    ]);
  };

  const setOnBreak = (playerId: number, isOnBreak: boolean) => {
    const updatedPlayers = players.map((player) =>
      player.id === playerId ? { ...player, onBreak: isOnBreak } : player
    );
    setPlayers(updatedPlayers);
  };

  // プレイヤー数を返す
  const playerCount = useMemo(() => players.length, [players]);

  // 試合に参加可能なプレイヤーを返す
  const availablePlayers = useMemo(() => {
    return [...players]
      .filter((player) => !player.onBreak)
      .sort((a, b) => a.gamesPlayed - b.gamesPlayed);
  }, [players]);

  const value = {
    players,
    setPlayers,
    addPlayer,
    setOnBreak,
    playerCount,
    availablePlayers,
    pairHistory,
    setPairHistory,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export const usePlayerContext = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};
