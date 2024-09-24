export type MenuType = "player" | "pairing" | "match";

export type Pair = [Player, Player];

export type Match = {
  pairs: [Pair, Pair];
  isEnd: boolean;
  winnerPairIndex?: number;
  editable: boolean;
};

export type Matches = Match[];

export type Player = {
  id: number;
  matchCount: number;
  wins: number;
};
