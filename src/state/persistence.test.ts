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

describe('persistence', () => {
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

  it('saves and loads win recording setting', () => {
    const state = appReducer(createInitialState(), { type: 'toggle-record-wins', recordWins: true });
    const storage = createStorage();

    saveState(state, storage);
    const loaded = loadStoredState(storage);

    expect(loaded.restoreError).toBeNull();
    expect(loaded.state.recordWins).toBe(true);
  });
});
