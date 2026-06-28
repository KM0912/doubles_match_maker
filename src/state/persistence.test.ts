import { describe, expect, it } from 'vitest';
import type { AppState } from '../types';
import { createInitialState, STORAGE_KEY } from './initialState';
import { loadStoredState, saveState } from './persistence';
import { appReducer } from './reducer';

function createStorage(initial: Record<string, string> = {}): Storage {
  const store = new Map(Object.entries(initial));

  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
  };
}

function storageWithState(state: unknown): Storage {
  return createStorage({ [STORAGE_KEY]: JSON.stringify(state) });
}

describe('persistence', () => {
  it('loads the initial state when storage is empty', () => {
    const loaded = loadStoredState(createStorage());

    expect(loaded.restoreError).toBeNull();
    expect(loaded.state).toEqual(createInitialState());
  });

  it('saves and restores the full state shape', () => {
    let state = appReducer(createInitialState(), { type: 'add-player' });
    state = appReducer(state, { type: 'change-court-count', delta: 1 });
    state = appReducer(state, { type: 'select-tab', tab: 'history' });
    state = appReducer(state, {
      type: 'start-round',
      output: { matches: [{ team1: [1, 2], team2: [3, 4] }] },
      createdAt: '2026-06-25T00:00:00.000Z',
    });
    state = appReducer(state, {
      type: 'replace-slot',
      slot: { matchId: state.activeRound!.matches[0].id, team: 2, index: 1 },
      playerId: 5,
    });

    const storage = createStorage();
    saveState(state, storage);
    const loaded = loadStoredState(storage);

    expect(storage.getItem(STORAGE_KEY)).toBe(JSON.stringify(state));
    expect(loaded.restoreError).toBeNull();
    expect(loaded.state).toEqual(state);
  });

  it('loads legacy state without recordWins as win recording disabled', () => {
    const output = { matches: [{ team1: [1, 2] as [number, number], team2: [3, 4] as [number, number] }] };
    const active = appReducer(appReducer(createInitialState(), { type: 'toggle-record-wins', recordWins: true }), {
      type: 'start-round',
      output,
      createdAt: '2026-06-25T00:00:00.000Z',
    });
    const withWinner = appReducer(active, {
      type: 'set-winner',
      matchId: active.activeRound!.matches[0].id,
      winner: 1,
    });
    const legacyState = { ...withWinner } as Partial<AppState>;
    delete legacyState.recordWins;

    const storage = createStorage({
      [STORAGE_KEY]: JSON.stringify(legacyState),
    });
    const loaded = loadStoredState(storage);

    expect(loaded.restoreError).toBeNull();
    expect(loaded.state.recordWins).toBe(false);
    expect(loaded.state.activeRound!.matches[0].winner).toBeNull();
  });

  it('clears undo-round winners when loading legacy state without recordWins', () => {
    const output = { matches: [{ team1: [1, 2] as [number, number], team2: [3, 4] as [number, number] }] };
    const active = appReducer(appReducer(createInitialState(), { type: 'toggle-record-wins', recordWins: true }), {
      type: 'start-round',
      output,
      createdAt: '2026-06-25T00:00:00.000Z',
    });
    const withWinner = appReducer(active, {
      type: 'set-winner',
      matchId: active.activeRound!.matches[0].id,
      winner: 1,
    });
    const completed = appReducer(withWinner, {
      type: 'complete-round',
      completedAt: '2026-06-25T01:00:00.000Z',
    });
    const legacyState = { ...completed } as Partial<AppState>;
    delete legacyState.recordWins;

    const loaded = loadStoredState(storageWithState(legacyState));

    expect(loaded.restoreError).toBeNull();
    expect(loaded.state.recordWins).toBe(false);
    expect(loaded.state.undoRecord!.round.matches[0].winner).toBeNull();
  });

  it('saves and loads win recording setting', () => {
    const state = appReducer(createInitialState(), { type: 'toggle-record-wins', recordWins: true });
    const storage = createStorage();

    saveState(state, storage);
    const loaded = loadStoredState(storage);

    expect(loaded.restoreError).toBeNull();
    expect(loaded.state.recordWins).toBe(true);
  });

  it('keeps winners when loading a current win-recording state', () => {
    const active = appReducer(appReducer(createInitialState(), { type: 'toggle-record-wins', recordWins: true }), {
      type: 'start-round',
      output: { matches: [{ team1: [1, 2], team2: [3, 4] }] },
      createdAt: '2026-06-25T00:00:00.000Z',
    });
    const withWinner = appReducer(active, {
      type: 'set-winner',
      matchId: active.activeRound!.matches[0].id,
      winner: 2,
    });

    const loaded = loadStoredState(storageWithState(withWinner));

    expect(loaded.restoreError).toBeNull();
    expect(loaded.state.activeRound!.matches[0].winner).toBe(2);
  });

  it('falls back to the initial state for broken JSON', () => {
    const loaded = loadStoredState(createStorage({ [STORAGE_KEY]: '{not valid json' }));

    expect(loaded.restoreError).toBe('保存データを読み込めなかったため、初期状態で開始しました。');
    expect(loaded.state).toEqual(createInitialState());
  });

  it.each([
    ['schema version mismatch', { ...createInitialState(), schemaVersion: 2 }],
    ['duplicate player ids', { ...createInitialState(), players: [...createInitialState().players, createInitialState().players[0]] }],
    ['next id does not exceed max player id', { ...createInitialState(), nextPlayerId: 4 }],
    ['court count below range', { ...createInitialState(), courtCount: 0 }],
    ['court count above range', { ...createInitialState(), courtCount: 11 }],
    ['invalid selected tab', { ...createInitialState(), selectedTab: 'players' }],
    [
      'invalid active round duplicate player across matches',
      {
        ...createInitialState(),
        players: [
          ...createInitialState().players,
          { id: 5, gamesPlayed: 0, wins: 0, onBreak: false },
          { id: 6, gamesPlayed: 0, wins: 0, onBreak: false },
          { id: 7, gamesPlayed: 0, wins: 0, onBreak: false },
        ],
        nextPlayerId: 8,
        activeRound: {
          id: 'round-1',
          createdAt: '2026-06-25T00:00:00.000Z',
          matches: [
            { id: 'match-1', courtNumber: 1, team1: [1, 2], team2: [3, 4], winner: null },
            { id: 'match-2', courtNumber: 2, team1: [1, 5], team2: [6, 7], winner: null },
          ],
        },
      },
    ],
    [
      'invalid active match winner',
      {
        ...createInitialState(),
        activeRound: {
          id: 'round-1',
          createdAt: '2026-06-25T00:00:00.000Z',
          matches: [{ id: 'match-1', courtNumber: 1, team1: [1, 2], team2: [3, 4], winner: 3 }],
        },
      },
    ],
    ['history references missing player', { ...createInitialState(), pairHistory: { 1: { 999: 1 } } }],
    [
      'undo record references missing player',
      {
        ...createInitialState(),
        undoRecord: {
          round: {
            id: 'round-1',
            createdAt: '2026-06-25T00:00:00.000Z',
            matches: [{ id: 'match-1', courtNumber: 1, team1: [1, 2], team2: [3, 4], winner: null }],
          },
          appliedPlayerDeltas: { 999: { gamesPlayed: 1, wins: 0 } },
          appliedPairHistoryDeltas: {},
          appliedOpponentHistoryDeltas: {},
          completedAt: '2026-06-25T01:00:00.000Z',
        },
      },
    ],
  ])('falls back to the initial state when stored data is invalid: %s', (_, state) => {
    const loaded = loadStoredState(storageWithState(state));

    expect(loaded.restoreError).toBe('保存データの形式が現在のアプリと合わないため、初期状態で開始しました。');
    expect(loaded.state).toEqual(createInitialState());
  });
});
