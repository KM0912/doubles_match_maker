export type Pair = [Player, Player];

export type Match = {
  Pairs: [Pair, Pair];
  isEnd: boolean;
  winnerPairIndex?: number;
};

export type Matches = Match[];

export type Player = {
  id: number;
  matchCount: number;
  wins: number;
};
