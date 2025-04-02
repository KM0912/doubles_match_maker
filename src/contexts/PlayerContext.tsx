import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { Match, OpponentHistory, PairHistory, Player } from "../types";

type PlayerContextType = {
  players: Player[];
  updatePlayers: (players: Player[]) => void;
  addPlayer: () => void;
  removePlayer: (playerId: number) => void;
  resetPlayers: () => void;
  setOnBreak: (playerId: number, isOnBreak: boolean) => void;
  playerCount: number;
  availablePlayers: Player[];
  pairHistory: PairHistory;
  updatePairHistoryByMatches: (matches: Match[]) => void;
  opponentHistory: OpponentHistory;
  updateOpponentHistoryByMatches: (matches: Match[]) => void;
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
  const [opponentHistory, setOpponentHistory] = useState<OpponentHistory>({});
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    loadPlayersFromLocalStorage();
    loadPairHistoryFromLocalStorage();
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      savePlayersToLocalStorage(players);
      savePairHistoryToLocalStorage(pairHistory);
    }
  }, [players, pairHistory, initialized]);

  const updatePlayers = (players: Player[]) => {
    setPlayers(players);
  };

  const addPlayer = () => {
    setPlayers((prevPlayers) => {
      const maxId = prevPlayers.reduce(
        (max, player) => Math.max(max, player.id),
        0
      );
      return [
        ...prevPlayers,
        { id: maxId + 1, gamesPlayed: 0, wins: 0, onBreak: false },
      ];
    });
  };

  const removePlayer = (playerId: number) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.id !== playerId)
    );

    setPairHistory((prevPairHistory) => {
      const newPairHistory: PairHistory = { ...prevPairHistory };
      delete newPairHistory[playerId];
      Object.keys(newPairHistory).forEach((key) => {
        const numKey = Number(key);
        delete newPairHistory[numKey][playerId];
      });
      return newPairHistory;
    });
  };

  const resetPlayers = () => {
    setPlayers(defaultPlayers);
    setPairHistory({});
    setOpponentHistory({});
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

  const updateOpponentHistoryByMatches = (matches: Match[]) => {
    const updatedOpponentHistory = { ...opponentHistory };

    matches.forEach((match) => {
      const [p1, p2] = match.team1;
      const [p3, p4] = match.team2;

      updatedOpponentHistory[p1.id] = updatedOpponentHistory[p1.id] || {};
      updatedOpponentHistory[p2.id] = updatedOpponentHistory[p2.id] || {};
      updatedOpponentHistory[p1.id][p3.id] =
        (updatedOpponentHistory[p1.id][p3.id] || 0) + 1;
      updatedOpponentHistory[p1.id][p4.id] =
        (updatedOpponentHistory[p1.id][p4.id] || 0) + 1;
      updatedOpponentHistory[p2.id][p3.id] =
        (updatedOpponentHistory[p2.id][p3.id] || 0) + 1;
      updatedOpponentHistory[p2.id][p4.id] =
        (updatedOpponentHistory[p2.id][p4.id] || 0) + 1;

      updatedOpponentHistory[p3.id] = updatedOpponentHistory[p3.id] || {};
      updatedOpponentHistory[p4.id] = updatedOpponentHistory[p4.id] || {};
      updatedOpponentHistory[p3.id][p1.id] =
        (updatedOpponentHistory[p3.id][p1.id] || 0) + 1;
      updatedOpponentHistory[p3.id][p2.id] =
        (updatedOpponentHistory[p3.id][p2.id] || 0) + 1;
      updatedOpponentHistory[p4.id][p1.id] =
        (updatedOpponentHistory[p4.id][p1.id] || 0) + 1;
      updatedOpponentHistory[p4.id][p2.id] =
        (updatedOpponentHistory[p4.id][p2.id] || 0) + 1;
    });

    setOpponentHistory(updatedOpponentHistory);
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

  const savePairHistoryToLocalStorage = (pairHistory: PairHistory) => {
    localStorage.setItem("pairHistory", JSON.stringify(pairHistory));
  };

  const loadPairHistoryFromLocalStorage = (): boolean => {
    const pairHistory = localStorage.getItem("pairHistory");
    if (pairHistory) {
      setPairHistory(JSON.parse(pairHistory));
      return true;
    }
    return false;
  };

  const value = {
    players,
    updatePlayers,
    addPlayer,
    removePlayer,
    resetPlayers,
    setOnBreak,
    playerCount,
    availablePlayers,
    pairHistory,
    updatePairHistoryByMatches,
    opponentHistory,
    updateOpponentHistoryByMatches,
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
