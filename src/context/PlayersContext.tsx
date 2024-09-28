import React, { createContext, useContext, useState, ReactNode } from "react";
import { Player } from "../types";

type PlayersContextType = {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  addPlayer: (player: Player) => void;
};

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  };

  return (
    <PlayersContext.Provider value={{ players, setPlayers, addPlayer }}>
      {children}
    </PlayersContext.Provider>
  );
};

export const usePlayers = (): PlayersContextType => {
  const context = useContext(PlayersContext);
  if (!context) {
    throw new Error("usePlayers must be used within a PlayersProvider");
  }
  return context;
};
