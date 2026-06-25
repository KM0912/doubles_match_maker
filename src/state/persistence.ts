import type {
  ActiveMatch,
  ActiveRound,
  AppState,
  AppTab,
  History,
  Player,
  PlayerId,
  UndoRecord,
} from '../types';
import { createInitialState, STORAGE_KEY } from './initialState';

export type LoadedState = {
  state: AppState;
  restoreError: string | null;
};

const tabs: AppTab[] = ['matches', 'settings', 'history'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonNegativeInteger(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) >= 0;
}

function isPositiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) > 0;
}

function isPlayer(value: unknown): value is Player {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isPositiveInteger(value.id) &&
    isNonNegativeInteger(value.gamesPlayed) &&
    isNonNegativeInteger(value.wins) &&
    typeof value.onBreak === 'boolean'
  );
}

function isPlayerIdPair(value: unknown, existingPlayerIds: Set<PlayerId>): value is [PlayerId, PlayerId] {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    value.every((id) => isPositiveInteger(id) && existingPlayerIds.has(id)) &&
    value[0] !== value[1]
  );
}

function isActiveMatch(value: unknown, existingPlayerIds: Set<PlayerId>): value is ActiveMatch {
  if (!isRecord(value)) {
    return false;
  }

  if (
    typeof value.id !== 'string' ||
    !isPositiveInteger(value.courtNumber) ||
    !(value.winner === null || value.winner === 1 || value.winner === 2) ||
    !isPlayerIdPair(value.team1, existingPlayerIds) ||
    !isPlayerIdPair(value.team2, existingPlayerIds)
  ) {
    return false;
  }

  const ids = [...value.team1, ...value.team2];
  return new Set(ids).size === ids.length;
}

function isActiveRound(value: unknown, existingPlayerIds: Set<PlayerId>): value is ActiveRound {
  if (!isRecord(value)) {
    return false;
  }

  if (typeof value.id !== 'string' || typeof value.createdAt !== 'string' || !Array.isArray(value.matches)) {
    return false;
  }

  const roundIds = new Set<PlayerId>();
  for (const match of value.matches) {
    if (!isActiveMatch(match, existingPlayerIds)) {
      return false;
    }

    for (const id of [...match.team1, ...match.team2]) {
      if (roundIds.has(id)) {
        return false;
      }
      roundIds.add(id);
    }
  }

  return true;
}

function isHistory(value: unknown, existingPlayerIds: Set<PlayerId>): value is History {
  if (!isRecord(value)) {
    return false;
  }

  for (const [from, row] of Object.entries(value)) {
    const fromId = Number(from);
    if (!isPositiveInteger(fromId) || !existingPlayerIds.has(fromId) || !isRecord(row)) {
      return false;
    }

    for (const [to, count] of Object.entries(row)) {
      const toId = Number(to);
      if (
        !isPositiveInteger(toId) ||
        !existingPlayerIds.has(toId) ||
        fromId === toId ||
        !isNonNegativeInteger(count)
      ) {
        return false;
      }
    }
  }

  return true;
}

function isPlayerDeltas(value: unknown, existingPlayerIds: Set<PlayerId>) {
  if (!isRecord(value)) {
    return false;
  }

  for (const [playerId, delta] of Object.entries(value)) {
    const numericId = Number(playerId);
    if (!isPositiveInteger(numericId) || !existingPlayerIds.has(numericId) || !isRecord(delta)) {
      return false;
    }

    if (!isNonNegativeInteger(delta.gamesPlayed) || !isNonNegativeInteger(delta.wins)) {
      return false;
    }
  }

  return true;
}

function isUndoRecord(value: unknown, existingPlayerIds: Set<PlayerId>): value is UndoRecord {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isActiveRound(value.round, existingPlayerIds) &&
    isPlayerDeltas(value.appliedPlayerDeltas, existingPlayerIds) &&
    isHistory(value.appliedPairHistoryDeltas, existingPlayerIds) &&
    isHistory(value.appliedOpponentHistoryDeltas, existingPlayerIds) &&
    typeof value.completedAt === 'string'
  );
}

function isAppState(value: unknown): value is AppState {
  if (!isRecord(value)) {
    return false;
  }

  if (value.schemaVersion !== 1 || !Array.isArray(value.players)) {
    return false;
  }

  if (!value.players.every(isPlayer)) {
    return false;
  }

  const ids = value.players.map((player) => player.id);
  const idSet = new Set(ids);
  if (idSet.size !== ids.length) {
    return false;
  }

  const maxId = Math.max(0, ...ids);
  if (!isPositiveInteger(value.nextPlayerId) || value.nextPlayerId <= maxId) {
    return false;
  }

  if (
    typeof value.courtCount !== 'number' ||
    !Number.isInteger(value.courtCount) ||
    value.courtCount < 1 ||
    value.courtCount > 10 ||
    !tabs.includes(value.selectedTab as AppTab)
  ) {
    return false;
  }

  if (!(value.activeRound === null || isActiveRound(value.activeRound, idSet))) {
    return false;
  }

  if (!isHistory(value.pairHistory, idSet) || !isHistory(value.opponentHistory, idSet)) {
    return false;
  }

  if (!(value.undoRecord === null || isUndoRecord(value.undoRecord, idSet))) {
    return false;
  }

  return true;
}

export function loadStoredState(storage: Storage = window.localStorage): LoadedState {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    return { state: createInitialState(), restoreError: null };
  }

  try {
    const parsed = JSON.parse(raw);
    if (!isAppState(parsed)) {
      return {
        state: createInitialState(),
        restoreError: '保存データの形式が現在のアプリと合わないため、初期状態で開始しました。',
      };
    }

    return { state: parsed, restoreError: null };
  } catch {
    return {
      state: createInitialState(),
      restoreError: '保存データを読み込めなかったため、初期状態で開始しました。',
    };
  }
}

export function saveState(state: AppState, storage: Storage = window.localStorage) {
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}
