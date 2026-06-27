import { describe, expect, it } from 'vitest';
import { createInitialState } from './initialState';
import { appReducer } from './reducer';
import type { AppState, SchedulerOutput } from '../types';

const output: SchedulerOutput = {
  matches: [{ team1: [1, 2], team2: [3, 4] }],
};

function withRound(state: AppState = createInitialState()) {
  return appReducer(state, { type: 'start-round', output, createdAt: '2026-06-25T00:00:00.000Z' });
}

function withRecordWins(state: AppState = createInitialState()) {
  return appReducer(state, { type: 'toggle-record-wins', recordWins: true });
}

describe('appReducer', () => {
  it('creates the specified initial state', () => {
    const state = createInitialState();

    expect(state.players).toEqual([
      { id: 1, gamesPlayed: 0, wins: 0, onBreak: false },
      { id: 2, gamesPlayed: 0, wins: 0, onBreak: false },
      { id: 3, gamesPlayed: 0, wins: 0, onBreak: false },
      { id: 4, gamesPlayed: 0, wins: 0, onBreak: false },
    ]);
    expect(state.nextPlayerId).toBe(5);
    expect(state.courtCount).toBe(1);
    expect(state.recordWins).toBe(false);
    expect(state.selectedTab).toBe('matches');
  });

  it('adds players without reusing deleted ids', () => {
    const added = appReducer(createInitialState(), { type: 'add-player' });
    const removed = appReducer(added, { type: 'remove-player', playerId: 5 });
    const addedAgain = appReducer(removed, { type: 'add-player' });

    expect(addedAgain.players.map((player) => player.id)).toEqual([1, 2, 3, 4, 6]);
    expect(addedAgain.nextPlayerId).toBe(7);
  });

  it('keeps court count between one and ten', () => {
    let state = createInitialState();
    state = appReducer(state, { type: 'change-court-count', delta: -1 });
    expect(state.courtCount).toBe(1);

    for (let index = 0; index < 20; index += 1) {
      state = appReducer(state, { type: 'change-court-count', delta: 1 });
    }
    expect(state.courtCount).toBe(10);
  });

  it('does not update wins when a winner is selected or cleared', () => {
    const active = withRound(withRecordWins());
    const matchId = active.activeRound!.matches[0].id;
    const withWinner = appReducer(active, { type: 'set-winner', matchId, winner: 1 });
    const cleared = appReducer(withWinner, { type: 'clear-winner', matchId });

    expect(withWinner.players.every((player) => player.wins === 0)).toBe(true);
    expect(cleared.players.every((player) => player.wins === 0)).toBe(true);
  });

  it('keeps winner input disabled while win recording is off', () => {
    const active = withRound();
    const matchId = active.activeRound!.matches[0].id;
    const withWinner = appReducer(active, { type: 'set-winner', matchId, winner: 1 });
    const completed = appReducer(withWinner, {
      type: 'complete-round',
      completedAt: '2026-06-25T01:00:00.000Z',
    });

    expect(withWinner.activeRound!.matches[0].winner).toBeNull();
    expect(completed.players.map((player) => [player.id, player.gamesPlayed, player.wins])).toEqual([
      [1, 1, 0],
      [2, 1, 0],
      [3, 1, 0],
      [4, 1, 0],
    ]);
    expect(completed.pairHistory[1][2]).toBe(1);
    expect(completed.opponentHistory[1][3]).toBe(1);
  });

  it('applies stats and histories when a round is completed', () => {
    const active = withRound(withRecordWins());
    const matchId = active.activeRound!.matches[0].id;
    const withWinner = appReducer(active, { type: 'set-winner', matchId, winner: 1 });
    const completed = appReducer(withWinner, {
      type: 'complete-round',
      completedAt: '2026-06-25T01:00:00.000Z',
    });

    expect(completed.activeRound).toBeNull();
    expect(completed.undoRecord).not.toBeNull();
    expect(completed.players.map((player) => [player.id, player.gamesPlayed, player.wins])).toEqual([
      [1, 1, 1],
      [2, 1, 1],
      [3, 1, 0],
      [4, 1, 0],
    ]);
    expect(completed.pairHistory[1][2]).toBe(1);
    expect(completed.pairHistory[2][1]).toBe(1);
    expect(completed.opponentHistory[1][3]).toBe(1);
    expect(completed.opponentHistory[4][2]).toBe(1);
  });

  it('does not add wins for incomplete matches', () => {
    const completed = appReducer(withRound(withRecordWins()), { type: 'complete-round' });

    expect(completed.players.every((player) => player.gamesPlayed === 1)).toBe(true);
    expect(completed.players.every((player) => player.wins === 0)).toBe(true);
  });

  it('completes the active round and starts the next round', () => {
    const active = withRound(withRecordWins());
    const matchId = active.activeRound!.matches[0].id;
    const withWinner = appReducer(active, { type: 'set-winner', matchId, winner: 1 });
    const nextOutput: SchedulerOutput = {
      matches: [{ team1: [1, 3], team2: [2, 4] }],
    };
    const next = appReducer(withWinner, {
      type: 'complete-and-start-round',
      output: nextOutput,
      completedAt: '2026-06-25T01:00:00.000Z',
      createdAt: '2026-06-25T01:01:00.000Z',
    });

    expect(next.activeRound).not.toBeNull();
    expect(next.undoRecord).toBeNull();
    expect(next.activeRound!.createdAt).toBe('2026-06-25T01:01:00.000Z');
    expect(next.activeRound!.matches[0]).toMatchObject({
      courtNumber: 1,
      team1: [1, 3],
      team2: [2, 4],
      winner: null,
    });
    expect(next.players.map((player) => [player.id, player.gamesPlayed, player.wins])).toEqual([
      [1, 1, 1],
      [2, 1, 1],
      [3, 1, 0],
      [4, 1, 0],
    ]);
    expect(next.pairHistory[1][2]).toBe(1);
    expect(next.opponentHistory[1][3]).toBe(1);
  });

  it('clears active winners when win recording is turned off', () => {
    const active = withRound(withRecordWins());
    const matchId = active.activeRound!.matches[0].id;
    const withWinner = appReducer(active, { type: 'set-winner', matchId, winner: 1 });
    const disabled = appReducer(withWinner, { type: 'toggle-record-wins', recordWins: false });

    expect(disabled.recordWins).toBe(false);
    expect(disabled.activeRound!.matches[0].winner).toBeNull();
  });

  it('restores the round and reverses deltas on undo', () => {
    const active = withRound();
    const completed = appReducer(active, { type: 'complete-round' });
    const undone = appReducer(completed, { type: 'undo-complete' });

    expect(undone.activeRound).toEqual(active.activeRound);
    expect(undone.undoRecord).toBeNull();
    expect(undone.players.every((player) => player.gamesPlayed === 0 && player.wins === 0)).toBe(true);
    expect(undone.pairHistory).toEqual({});
    expect(undone.opponentHistory).toEqual({});
  });

  it('prunes history and undo data when a related player is deleted', () => {
    const completed = appReducer(withRound(), { type: 'complete-round' });
    const removed = appReducer(completed, { type: 'remove-player', playerId: 1 });

    expect(removed.players.some((player) => player.id === 1)).toBe(false);
    expect(removed.pairHistory[1]).toBeUndefined();
    expect(removed.opponentHistory[1]).toBeUndefined();
    expect(Object.values(removed.pairHistory).some((row) => row[1] !== undefined)).toBe(false);
    expect(Object.values(removed.opponentHistory).some((row) => row[1] !== undefined)).toBe(false);
    expect(removed.undoRecord).toBeNull();
  });

  it('swaps active players and waiting players only before winner input', () => {
    const state = appReducer(withRecordWins(), { type: 'add-player' });
    const active = withRound(state);
    const match = active.activeRound!.matches[0];
    const replaced = appReducer(active, {
      type: 'replace-slot',
      slot: { matchId: match.id, team: 1, index: 0 },
      playerId: 5,
    });

    expect(replaced.activeRound!.matches[0].team1).toEqual([5, 2]);

    const withWinner = appReducer(replaced, { type: 'set-winner', matchId: match.id, winner: 2 });
    const blocked = appReducer(withWinner, {
      type: 'replace-slot',
      slot: { matchId: match.id, team: 1, index: 0 },
      playerId: 1,
    });

    expect(blocked.activeRound!.matches[0].team1).toEqual([5, 2]);
  });
});
