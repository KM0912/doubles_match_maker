export type Player = {
  id: number;
  gamesPlayed: number;
  wins: number;
  onBreak: boolean;
};

export type Match = {
  id: number;
  team1: Player[];
  team2: Player[];
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
