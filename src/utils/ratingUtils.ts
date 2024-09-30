import { Player, Match } from "../types";

const K = 32;

export const calculateExpectedScore = (
  ratingA: number,
  ratingB: number
): number => {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
};

export const updatePlayerRatings = (
  match: Match,
  players: Player[]
): Player[] => {
  const updatedPlayers = players.map((player) => ({ ...player }));

  const team1Rating = (match.pairs[0][0].rating + match.pairs[0][1].rating) / 2;
  const team2Rating = (match.pairs[1][0].rating + match.pairs[1][1].rating) / 2;

  const expectedScoreTeam1 = calculateExpectedScore(team1Rating, team2Rating);
  const expectedScoreTeam2 = calculateExpectedScore(team2Rating, team1Rating);

  const actualScoreTeam1 = match.winnerPairIndex === 0 ? 1 : 0;
  const actualScoreTeam2 = match.winnerPairIndex === 1 ? 1 : 0;

  updatedPlayers.forEach((player) => {
    let expectedScore = 0;
    let actualScore = 0;

    if (match.pairs[0].some((p) => p.id === player.id)) {
      expectedScore = expectedScoreTeam1;
      actualScore = actualScoreTeam1;
    } else if (match.pairs[1].some((p) => p.id === player.id)) {
      expectedScore = expectedScoreTeam2;
      actualScore = actualScoreTeam2;
    }

    player.rating += K * (actualScore - expectedScore);
  });

  return updatedPlayers;
};
