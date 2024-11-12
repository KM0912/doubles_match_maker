import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { Match, PairHistory, Player } from "../types";

type PlayerContextType = {
  players: Player[];
  updatePlayers: (players: Player[]) => void;
  addPlayer: () => void;
  resetPlayers: () => void;
  setOnBreak: (playerId: number, isOnBreak: boolean) => void;
  playerCount: number;
  availablePlayers: Player[];
  pairHistory: PairHistory;
  updatePairHistoryByMatches: (matches: Match[]) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const defaultPlayers: Player[] = [
  { id: 1, gamesPlayed: 0, wins: 0, onBreak: false },
  { id: 2, gamesPlayed: 0, wins: 0, onBreak: false },
  { id: 3, gamesPlayed: 0, wins: 0, onBreak: false },
  { id: 4, gamesPlayed: 0, wins: 0, onBreak: false },
];

type Props = {
  children: ReactNode;
};

export const PlayerProvider: React.FC<Props> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>(defaultPlayers);
  const [pairHistory, setPairHistory] = useState<PairHistory>({});
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    loadPlayersFromLocalStorage();
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      savePlayersToLocalStorage(players);
    }
  }, [players, initialized]);

  const updatePlayers = (players: Player[]) => {
    setPlayers(players);
  };

  const addPlayer = () => {
    setPlayers((prevPlayers) => [
      ...prevPlayers,
      { id: prevPlayers.length + 1, gamesPlayed: 0, wins: 0, onBreak: false },
    ]);
  };

  const resetPlayers = () => {
    setPlayers(defaultPlayers);
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
    return [...players].filter((player) => !player.onBreak);
  }, [players]);

  // ペアの履歴を更新する
  const updatePairHistoryByMatches = (matches: Match[]) => {
    const updatedPairHistory = { ...pairHistory };

    matches.forEach((match) => {
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

  const savePlayersToLocalStorage = (players: Player[]) => {
    localStorage.setItem("players", JSON.stringify(players));
  };

  const loadPlayersFromLocalStorage = (): boolean => {
    const players = localStorage.getItem("players");
    if (players) {
      setPlayers(JSON.parse(players));
      return true;
    }
    return false;
  };

  const value = {
    players,
    updatePlayers,
    addPlayer,
    resetPlayers,
    setOnBreak,
    playerCount,
    availablePlayers,
    pairHistory,
    updatePairHistoryByMatches,
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
