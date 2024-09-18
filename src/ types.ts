export type Pair = [Player, Player];

export type Match = {
  Pairs: [Pair, Pair];
  isEnd: boolean;
};

export type Matches = Match[];

export type PairHistory = {
  partnerId: number;
  timesPaired: number;
};

export type Player = {
  id: number;
  matchCount: number;
  pairHistory: PairHistory[];
};
