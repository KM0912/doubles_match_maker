import type { AppState } from '../types';

export const STORAGE_KEY = 'doublesMatchMaker:appState:v1';

export function createInitialState(): AppState {
  return {
    schemaVersion: 1,
    players: [
      { id: 1, gamesPlayed: 0, wins: 0, onBreak: false },
      { id: 2, gamesPlayed: 0, wins: 0, onBreak: false },
      { id: 3, gamesPlayed: 0, wins: 0, onBreak: false },
      { id: 4, gamesPlayed: 0, wins: 0, onBreak: false },
    ],
    nextPlayerId: 5,
    courtCount: 1,
    activeRound: null,
    pairHistory: {},
    opponentHistory: {},
    undoRecord: null,
    selectedTab: 'matches',
  };
}
