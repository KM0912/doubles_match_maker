import { describe, expect, it } from 'vitest';
import { createInitialState } from '../state/initialState';
import { appReducer } from '../state/reducer';
import { createSchedule, createScheduleInput, validateSchedulerOutput } from './adapter';

describe('scheduler adapter', () => {
  it('excludes players on break from schedule input', () => {
    const state = appReducer(createInitialState(), { type: 'toggle-break', playerId: 4 });
    const input = createScheduleInput(state);

    expect(input.playerIds).toEqual([1, 2, 3]);
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

  it('rejects duplicate players in one round', () => {
    const input = createScheduleInput(createInitialState());

    expect(() =>
      validateSchedulerOutput(input, {
        matches: [{ team1: [1, 2], team2: [1, 3] }],
      }),
    ).toThrow('同じ試合に同じ参加者が含まれています。');
  });
});
