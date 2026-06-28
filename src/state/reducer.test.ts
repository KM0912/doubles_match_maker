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

function addPlayers(state: AppState, count: number) {
  let next = state;
  for (let index = 0; index < count; index += 1) {
    next = appReducer(next, { type: 'add-player' });
  }
  return next;
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

  it('selects tabs and resets all state back to the initial values', () => {
    let state = appReducer(createInitialState(), { type: 'select-tab', tab: 'history' });
    state = appReducer(state, { type: 'add-player' });
    state = appReducer(state, { type: 'change-court-count', delta: 1 });
    state = appReducer(state, { type: 'reset' });

    expect(state).toEqual(createInitialState());
  });

  it('starts a round with court numbers, clears undo data, and switches to the matches tab', () => {
    const completed = appReducer(withRound(), {
      type: 'complete-round',
      completedAt: '2026-06-25T01:00:00.000Z',
    });
    const outputForTwoCourts: SchedulerOutput = {
      matches: [
        { team1: [1, 3], team2: [2, 4] },
        { team1: [5, 6], team2: [7, 8] },
      ],
    };
    const withHistoryTab = appReducer(addPlayers(completed, 4), { type: 'select-tab', tab: 'history' });

    const started = appReducer(withHistoryTab, {
      type: 'start-round',
      output: outputForTwoCourts,
      createdAt: '2026-06-25T02:00:00.000Z',
    });

    expect(started.selectedTab).toBe('matches');
    expect(started.undoRecord).toBeNull();
    expect(started.activeRound!.createdAt).toBe('2026-06-25T02:00:00.000Z');
    expect(started.activeRound!.matches.map((match) => match.courtNumber)).toEqual([1, 2]);
    expect(started.activeRound!.matches.map((match) => match.winner)).toEqual([null, null]);
  });

  it('does not start a new round when one is active or no matches were generated', () => {
    const active = withRound();
    const blockedByActive = appReducer(active, { type: 'start-round', output, createdAt: 'later' });
    const blockedByEmptyOutput = appReducer(createInitialState(), {
      type: 'start-round',
      output: { matches: [] },
      createdAt: 'later',
    });

    expect(blockedByActive).toBe(active);
    expect(blockedByEmptyOutput).toEqual(createInitialState());
  });

  it('does not remove or break players currently in the active round', () => {
    const active = withRound();
    const removed = appReducer(active, { type: 'remove-player', playerId: 1 });
    const toggled = appReducer(active, { type: 'toggle-break', playerId: 1 });

    expect(removed).toBe(active);
    expect(toggled).toBe(active);
  });

  it('keeps undo data when deleting an unrelated waiting player', () => {
    const state = appReducer(createInitialState(), { type: 'add-player' });
    const completed = appReducer(withRound(state), {
      type: 'complete-round',
      completedAt: '2026-06-25T01:00:00.000Z',
    });

    const removed = appReducer(completed, { type: 'remove-player', playerId: 5 });

    expect(removed.players.map((player) => player.id)).toEqual([1, 2, 3, 4]);
    expect(removed.undoRecord).toEqual(completed.undoRecord);
  });

  it('clears winners in active and undo rounds when win recording is turned off', () => {
    const active = withRound(withRecordWins());
    const matchId = active.activeRound!.matches[0].id;
    const withWinner = appReducer(active, { type: 'set-winner', matchId, winner: 2 });
    const completed = appReducer(withWinner, {
      type: 'complete-round',
      completedAt: '2026-06-25T01:00:00.000Z',
    });
    const restored = appReducer(completed, { type: 'undo-complete' });
    const disabledActiveRound = appReducer(restored, { type: 'toggle-record-wins', recordWins: false });
    const disabledUndoRound = appReducer(completed, { type: 'toggle-record-wins', recordWins: false });

    expect(disabledActiveRound.activeRound!.matches[0].winner).toBeNull();
    expect(disabledUndoRound.undoRecord!.round.matches[0].winner).toBeNull();
  });

  it('sets and clears the winner only for the targeted match', () => {
    const state = addPlayers(withRecordWins(), 4);
    const active = appReducer(state, {
      type: 'start-round',
      output: {
        matches: [
          { team1: [1, 2], team2: [3, 4] },
          { team1: [5, 6], team2: [7, 8] },
        ],
      },
      createdAt: '2026-06-25T00:00:00.000Z',
    });
    const [firstMatch, secondMatch] = active.activeRound!.matches;

    const withWinner = appReducer(active, { type: 'set-winner', matchId: secondMatch.id, winner: 2 });
    const cleared = appReducer(withWinner, { type: 'clear-winner', matchId: secondMatch.id });

    expect(withWinner.activeRound!.matches[0].winner).toBeNull();
    expect(withWinner.activeRound!.matches[1].winner).toBe(2);
    expect(cleared.activeRound!.matches.map((match) => [match.id, match.winner])).toEqual([
      [firstMatch.id, null],
      [secondMatch.id, null],
    ]);
  });

  it('applies stats and histories for multiple courts in one completion', () => {
    const active = appReducer(addPlayers(withRecordWins(), 4), {
      type: 'start-round',
      output: {
        matches: [
          { team1: [1, 2], team2: [3, 4] },
          { team1: [5, 6], team2: [7, 8] },
        ],
      },
      createdAt: '2026-06-25T00:00:00.000Z',
    });
    const [firstMatch, secondMatch] = active.activeRound!.matches;
    const withWinners = appReducer(
      appReducer(active, { type: 'set-winner', matchId: firstMatch.id, winner: 1 }),
      { type: 'set-winner', matchId: secondMatch.id, winner: 2 },
    );

    const completed = appReducer(withWinners, {
      type: 'complete-round',
      completedAt: '2026-06-25T01:00:00.000Z',
    });

    expect(completed.players.map((player) => [player.id, player.gamesPlayed, player.wins])).toEqual([
      [1, 1, 1],
      [2, 1, 1],
      [3, 1, 0],
      [4, 1, 0],
      [5, 1, 0],
      [6, 1, 0],
      [7, 1, 1],
      [8, 1, 1],
    ]);
    expect(completed.pairHistory[5][6]).toBe(1);
    expect(completed.pairHistory[8][7]).toBe(1);
    expect(completed.opponentHistory[5][8]).toBe(1);
    expect(completed.opponentHistory[7][6]).toBe(1);
  });

  it('does not complete-and-start when there is no active round or the next output is empty', () => {
    const initial = createInitialState();
    const active = withRound();

    const blockedWithoutActive = appReducer(initial, {
      type: 'complete-and-start-round',
      output,
      completedAt: '2026-06-25T01:00:00.000Z',
    });
    const blockedByEmptyOutput = appReducer(active, {
      type: 'complete-and-start-round',
      output: { matches: [] },
      completedAt: '2026-06-25T01:00:00.000Z',
    });

    expect(blockedWithoutActive).toBe(initial);
    expect(blockedByEmptyOutput).toBe(active);
  });

  it('swaps players within one match and across different matches', () => {
    const singleMatch = withRound();
    const match = singleMatch.activeRound!.matches[0];
    const swappedWithinMatch = appReducer(singleMatch, {
      type: 'swap-slots',
      from: { matchId: match.id, team: 1, index: 0 },
      to: { matchId: match.id, team: 2, index: 1 },
    });

    expect(swappedWithinMatch.activeRound!.matches[0].team1).toEqual([4, 2]);
    expect(swappedWithinMatch.activeRound!.matches[0].team2).toEqual([3, 1]);

    const twoMatches = appReducer(addPlayers(createInitialState(), 4), {
      type: 'start-round',
      output: {
        matches: [
          { team1: [1, 2], team2: [3, 4] },
          { team1: [5, 6], team2: [7, 8] },
        ],
      },
      createdAt: '2026-06-25T00:00:00.000Z',
    });
    const [firstMatch, secondMatch] = twoMatches.activeRound!.matches;
    const swappedAcrossMatches = appReducer(twoMatches, {
      type: 'swap-slots',
      from: { matchId: firstMatch.id, team: 1, index: 0 },
      to: { matchId: secondMatch.id, team: 2, index: 1 },
    });

    expect(swappedAcrossMatches.activeRound!.matches[0].team1).toEqual([8, 2]);
    expect(swappedAcrossMatches.activeRound!.matches[1].team2).toEqual([7, 1]);
  });

  it('blocks invalid, duplicate, break, and locked manual replacements', () => {
    let state = addPlayers(withRecordWins(), 2);
    state = appReducer(state, { type: 'toggle-break', playerId: 6 });
    const active = withRound(state);
    const match = active.activeRound!.matches[0];
    const slot = { matchId: match.id, team: 1, index: 0 } as const;

    const duplicateActivePlayer = appReducer(active, {
      type: 'replace-slot',
      slot,
      playerId: 2,
    });
    const playerOnBreak = appReducer(active, {
      type: 'replace-slot',
      slot,
      playerId: 6,
    });
    const missingPlayer = appReducer(active, {
      type: 'replace-slot',
      slot,
      playerId: 999,
    });
    const validReplacement = appReducer(active, {
      type: 'replace-slot',
      slot,
      playerId: 5,
    });
    const locked = appReducer(appReducer(validReplacement, { type: 'set-winner', matchId: match.id, winner: 1 }), {
      type: 'replace-slot',
      slot,
      playerId: 1,
    });

    expect(duplicateActivePlayer).toBe(active);
    expect(playerOnBreak).toBe(active);
    expect(missingPlayer).toBe(active);
    expect(validReplacement.activeRound!.matches[0].team1).toEqual([5, 2]);
    expect(locked.activeRound!.matches[0].team1).toEqual([5, 2]);
  });

  it('blocks swaps when the target match is missing or a touched match is locked', () => {
    const active = withRound(withRecordWins());
    const match = active.activeRound!.matches[0];
    const invalid = appReducer(active, {
      type: 'swap-slots',
      from: { matchId: 'missing-match', team: 1, index: 0 },
      to: { matchId: match.id, team: 2, index: 1 },
    });
    const withWinner = appReducer(active, { type: 'set-winner', matchId: match.id, winner: 1 });
    const locked = appReducer(withWinner, {
      type: 'swap-slots',
      from: { matchId: match.id, team: 1, index: 0 },
      to: { matchId: match.id, team: 2, index: 1 },
    });

    expect(invalid).toBe(active);
    expect(locked).toBe(withWinner);
  });
});
