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
