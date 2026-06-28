import { describe, expect, it } from 'vitest';
import { createInitialState } from '../state/initialState';
import { appReducer } from '../state/reducer';
import { createSchedule, createScheduleInput, SchedulerValidationError, validateSchedulerOutput } from './adapter';

describe('scheduler adapter', () => {
  it('excludes players on break from schedule input', () => {
    const state = appReducer(createInitialState(), { type: 'toggle-break', playerId: 4 });
    const input = createScheduleInput(state);

    expect(input.playerIds).toEqual([1, 2, 3]);
  });

  it('passes court count and history tables into schedule input', () => {
    const active = appReducer(createInitialState(), {
      type: 'start-round',
      output: { matches: [{ team1: [1, 2], team2: [3, 4] }] },
      createdAt: '2026-06-25T00:00:00.000Z',
    });
    const completed = appReducer(active, {
      type: 'complete-round',
      completedAt: '2026-06-25T01:00:00.000Z',
    });
    const withTwoCourts = appReducer(completed, { type: 'change-court-count', delta: 1 });

    const input = createScheduleInput(withTwoCourts);

    expect(input).toEqual({
      playerIds: [1, 2, 3, 4],
      courtCount: 2,
      pairHistory: completed.pairHistory,
      opponentHistory: completed.opponentHistory,
    });
  });

  it('generates only the number of matches allowed by players and courts', () => {
    let state = createInitialState();
    for (let index = 0; index < 5; index += 1) {
      state = appReducer(state, { type: 'add-player' });
    }
    state = appReducer(state, { type: 'change-court-count', delta: 1 });
    state = appReducer(state, { type: 'change-court-count', delta: 1 });

    const output = createSchedule(createScheduleInput(state));

    expect(output.matches).toHaveLength(2);
  });

  it('sorts player ids before generating a deterministic match', () => {
    const output = createSchedule({
      playerIds: [4, 3, 2, 1],
      courtCount: 1,
      pairHistory: {},
      opponentHistory: {},
    });

    expect(output).toEqual({ matches: [{ team1: [1, 2], team2: [3, 4] }] });
  });

  it('prefers candidates with lower pair and opponent history scores', () => {
    const output = createSchedule({
      playerIds: [1, 2, 3, 4],
      courtCount: 1,
      pairHistory: {
        1: { 2: 5 },
        2: { 1: 5 },
        3: { 4: 5 },
        4: { 3: 5 },
      },
      opponentHistory: {
        1: { 4: 1 },
        4: { 1: 1 },
      },
    });

    expect(output).toEqual({ matches: [{ team1: [1, 4], team2: [2, 3] }] });
  });

  it('throws when fewer than four players are available', () => {
    expect(() =>
      createSchedule({
        playerIds: [1, 2, 3],
        courtCount: 1,
        pairHistory: {},
        opponentHistory: {},
      }),
    ).toThrow(SchedulerValidationError);
  });

  it('rejects duplicate players in one round', () => {
    const input = createScheduleInput(createInitialState());

    expect(() =>
      validateSchedulerOutput(input, {
        matches: [{ team1: [1, 2], team2: [1, 3] }],
      }),
    ).toThrow('同じ試合に同じ参加者が含まれています。');
  });

  it('rejects malformed scheduler output shapes', () => {
    const input = createScheduleInput(createInitialState());

    expect(() => validateSchedulerOutput(input, { matches: null } as never)).toThrow(
      '生成結果の形式が不正です。',
    );
    expect(() => validateSchedulerOutput(input, { matches: [] })).toThrow(
      '生成された試合数が参加人数やコート数と合いません。',
    );
    expect(() =>
      validateSchedulerOutput(input, {
        matches: [{ team1: [1, 2, 3], team2: [4, 5] }],
      } as never),
    ).toThrow('各チームは2名である必要があります。');
  });

  it('rejects unavailable players and players repeated across matches', () => {
    let state = createInitialState();
    for (let index = 0; index < 4; index += 1) {
      state = appReducer(state, { type: 'add-player' });
    }
    state = appReducer(state, { type: 'change-court-count', delta: 1 });
    const input = createScheduleInput(state);

    expect(() =>
      validateSchedulerOutput(input, {
        matches: [{ team1: [1, 2], team2: [3, 999] }],
      }),
    ).toThrow('参加対象ではない選手が生成結果に含まれています。');

    expect(() =>
      validateSchedulerOutput(input, {
        matches: [
          { team1: [1, 2], team2: [3, 4] },
          { team1: [1, 5], team2: [6, 7] },
        ],
      }),
    ).toThrow('同じ参加者が1ラウンド内で複数試合に含まれています。');
  });
});
