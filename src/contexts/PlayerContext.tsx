import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { OnBreakState, Player } from "../types";

type PlayerContextType = {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  addPlayer: () => void;
  playerCount: number;
  onBreak: OnBreakState;
  setOnBreak: React.Dispatch<React.SetStateAction<OnBreakState>>;
  availablePlayers: Player[];
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const PlayerProvider: React.FC<Props> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, gamesPlayed: 0, wins: 0 },
    { id: 2, gamesPlayed: 0, wins: 0 },
    { id: 3, gamesPlayed: 0, wins: 0 },
    { id: 4, gamesPlayed: 0, wins: 0 },
  ]);
  const [onBreak, setOnBreak] = useState<OnBreakState>({});

  const addPlayer = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers,
      { id: prevPlayers.length + 1, gamesPlayed: 0, wins: 0 },
    ]);
  };

  // プレイヤー数を返す
  const playerCount = useMemo(() => players.length, [players]);

  // 試合に参加可能なプレイヤーを返す
  const availablePlayers = useMemo(() => {
    return [...players]
      .filter((player) => !onBreak[player.id])
      .sort((a, b) => a.gamesPlayed - b.gamesPlayed);
  }, [players, onBreak]);

  const value = {
    players,
    setPlayers,
    addPlayer,
    playerCount,
    onBreak,
    setOnBreak,
    availablePlayers,
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
