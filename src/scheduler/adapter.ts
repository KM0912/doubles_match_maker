import type { AppState, PlayerId, SchedulerInput, SchedulerOutput } from '../types';
import { getHistoryValue } from '../state/history';
import { getAvailablePlayerIds } from '../state/selectors';

type CandidateMatch = {
  team1: [PlayerId, PlayerId];
  team2: [PlayerId, PlayerId];
  score: number;
};

export class SchedulerValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SchedulerValidationError';
  }
}

function combinations<T>(items: T[], size: number): T[][] {
  if (size === 0) {
    return [[]];
  }

  if (items.length < size) {
    return [];
  }

  const [first, ...rest] = items;
  return [
    ...combinations(rest, size - 1).map((combo) => [first, ...combo]),
    ...combinations(rest, size),
  ];
}

function scoreCandidate(input: SchedulerInput, team1: [PlayerId, PlayerId], team2: [PlayerId, PlayerId]) {
  const pairScore =
    getHistoryValue(input.pairHistory, team1[0], team1[1]) +
    getHistoryValue(input.pairHistory, team2[0], team2[1]);
  const opponentScore = team1.reduce(
    (total, playerA) =>
      total +
      team2.reduce(
        (innerTotal, playerB) => innerTotal + getHistoryValue(input.opponentHistory, playerA, playerB),
        0,
      ),
    0,
  );

  return pairScore * 10 + opponentScore;
}

function candidatesForFour(input: SchedulerInput, ids: PlayerId[]): CandidateMatch[] {
  const [a, b, c, d] = ids;
  const candidates: Array<[[PlayerId, PlayerId], [PlayerId, PlayerId]]> = [
    [
      [a, b],
      [c, d],
    ],
    [
      [a, c],
      [b, d],
    ],
    [
      [a, d],
      [b, c],
    ],
  ];

  return candidates
    .map(([team1, team2]) => ({
      team1,
      team2,
      score: scoreCandidate(input, team1, team2),
    }))
    .sort((left, right) => {
      if (left.score !== right.score) {
        return left.score - right.score;
      }
      return [...left.team1, ...left.team2].join('-').localeCompare([...right.team1, ...right.team2].join('-'));
    });
}

function generateLocally(input: SchedulerInput): SchedulerOutput {
  const targetMatchCount = Math.min(Math.floor(input.playerIds.length / 4), input.courtCount);
  const remaining = [...input.playerIds].sort((a, b) => a - b);
  const matches: SchedulerOutput['matches'] = [];

  for (let courtIndex = 0; courtIndex < targetMatchCount; courtIndex += 1) {
    const groupCandidates = combinations(remaining, 4)
      .flatMap((group) => candidatesForFour(input, group))
      .sort((left, right) => {
        if (left.score !== right.score) {
          return left.score - right.score;
        }
        return [...left.team1, ...left.team2].join('-').localeCompare([...right.team1, ...right.team2].join('-'));
      });

    const best = groupCandidates[0];
    if (!best) {
      break;
    }

    matches.push({ team1: best.team1, team2: best.team2 });
    const used = new Set([...best.team1, ...best.team2]);
    for (let index = remaining.length - 1; index >= 0; index -= 1) {
      if (used.has(remaining[index])) {
        remaining.splice(index, 1);
      }
    }
  }

  return { matches };
}

export function validateSchedulerOutput(
  input: SchedulerInput,
  output: SchedulerOutput,
): asserts output is SchedulerOutput {
  if (!Array.isArray(output.matches)) {
    throw new SchedulerValidationError('生成結果の形式が不正です。');
  }

  const targetMatchCount = Math.min(Math.floor(input.playerIds.length / 4), input.courtCount);
  if (output.matches.length === 0 || output.matches.length > targetMatchCount) {
    throw new SchedulerValidationError('生成された試合数が参加人数やコート数と合いません。');
  }

  const availableIds = new Set(input.playerIds);
  const roundIds = new Set<PlayerId>();

  for (const match of output.matches) {
    if (
      !Array.isArray(match.team1) ||
      !Array.isArray(match.team2) ||
      match.team1.length !== 2 ||
      match.team2.length !== 2
    ) {
      throw new SchedulerValidationError('各チームは2名である必要があります。');
    }

    const ids = [...match.team1, ...match.team2];
    if (new Set(ids).size !== ids.length) {
      throw new SchedulerValidationError('同じ試合に同じ参加者が含まれています。');
    }

    for (const id of ids) {
      if (!availableIds.has(id)) {
        throw new SchedulerValidationError('参加対象ではない選手が生成結果に含まれています。');
      }

      if (roundIds.has(id)) {
        throw new SchedulerValidationError('同じ参加者が1ラウンド内で複数試合に含まれています。');
      }
      roundIds.add(id);
    }
  }
}

export function createSchedule(input: SchedulerInput): SchedulerOutput {
  const output = generateLocally(input);
  validateSchedulerOutput(input, output);
  return output;
}

export function createScheduleInput(state: AppState): SchedulerInput {
  return {
    playerIds: getAvailablePlayerIds(state),
    courtCount: state.courtCount,
    pairHistory: state.pairHistory,
    opponentHistory: state.opponentHistory,
  };
}
