export type Player = {
  id: number;
  gamesPlayed: number;
  wins: number;
  onBreak: boolean;
};

export type Team = [Player, Player];
export type WinnerTeam = 1 | 2 | null;

export type Match = {
  id: number;
  team1: Team;
  team2: Team;
  winner: WinnerTeam;
};

export type PairHistory = {
  [playerId: number]: {
    [partnerId: number]: number;
  };
};

export type OpponentHistory = {
  [playerId: number]: {
    [opponentId: number]: number;
  };
};

export type OnBreakState = {
  [key: number]: boolean;
};
