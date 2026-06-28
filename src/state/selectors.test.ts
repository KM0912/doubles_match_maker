import { describe, expect, it } from 'vitest';
import { createInitialState } from './initialState';
import { appReducer } from './reducer';
import {
  getAvailablePlayerIds,
  getPlayerLabel,
  getPlayersInRound,
  getWaitingPlayerIds,
  isPlayerInActiveRound,
  roundContainsPlayer,
  slotKey,
} from './selectors';
import type { ActiveRound, SchedulerOutput } from '../types';

const output: SchedulerOutput = {
  matches: [{ team1: [1, 2], team2: [3, 4] }],
};

describe('state selectors', () => {
  it('collects unique players from every match in a round', () => {
    const round: ActiveRound = {
      id: 'round-1',
      createdAt: '2026-06-25T00:00:00.000Z',
      matches: [
        { id: 'match-1', courtNumber: 1, team1: [1, 2], team2: [3, 4], winner: null },
        { id: 'match-2', courtNumber: 2, team1: [5, 6], team2: [7, 8], winner: null },
      ],
    };

    expect([...getPlayersInRound(round)].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(getPlayersInRound(null).size).toBe(0);
  });

  it('returns available players in id order while excluding breaks', () => {
    let state = createInitialState();
    state = appReducer(state, { type: 'add-player' });
    state = appReducer(state, { type: 'toggle-break', playerId: 2 });
    state = appReducer(state, { type: 'toggle-break', playerId: 5 });

    expect(getAvailablePlayerIds(state)).toEqual([1, 3, 4]);
  });

  it('returns only available players outside the active round as waiting players', () => {
    let state = appReducer(createInitialState(), { type: 'add-player' });
    state = appReducer(state, { type: 'add-player' });
    state = appReducer(state, { type: 'toggle-break', playerId: 6 });
    state = appReducer(state, { type: 'start-round', output, createdAt: '2026-06-25T00:00:00.000Z' });

    expect(getWaitingPlayerIds(state)).toEqual([5]);
  });

  it('detects active-round membership and labels display ids consistently', () => {
    const state = appReducer(createInitialState(), {
      type: 'start-round',
      output,
      createdAt: '2026-06-25T00:00:00.000Z',
    });

    expect(isPlayerInActiveRound(state, 1)).toBe(true);
    expect(isPlayerInActiveRound(state, 5)).toBe(false);
    expect(roundContainsPlayer(state.activeRound, 4)).toBe(true);
    expect(roundContainsPlayer(null, 4)).toBe(false);
    expect(getPlayerLabel(12)).toBe('#12');
  });

  it('builds stable keys for player slots', () => {
    expect(slotKey({ matchId: 'match-1', team: 2, index: 1 })).toBe('match-1:2:1');
  });
});
