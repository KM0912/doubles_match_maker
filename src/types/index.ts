export type Player = {
  id: number;
  gamesPlayed: number;
};

export type Match = {
  team1: Player[];
  team2: Player[];
  id: number;
  winner: number | null;
};

export type GameHistory = {
  [playerId: number]: number;
};

export type PairHistory = {
  [playerId: number]: {
    [partnerId: number]: number;
  };
};

export type OnBreakState = {
  [key: number]: boolean;
};
