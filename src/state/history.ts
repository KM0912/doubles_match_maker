import type { History, PlayerId } from '../types';

export function cloneHistory(history: History): History {
  return Object.fromEntries(
    Object.entries(history).map(([playerId, row]) => [playerId, { ...row }]),
  ) as History;
}

export function getHistoryValue(history: History, a: PlayerId, b: PlayerId): number {
  return history[a]?.[b] ?? 0;
}

export function addHistoryValue(history: History, a: PlayerId, b: PlayerId, amount: number) {
  if (!history[a]) {
    history[a] = {};
  }

  const nextValue = (history[a][b] ?? 0) + amount;
  if (nextValue <= 0) {
    delete history[a][b];
    if (Object.keys(history[a]).length === 0) {
      delete history[a];
    }
    return;
  }

  history[a][b] = nextValue;
}

export function addBidirectionalHistoryValue(
  history: History,
  a: PlayerId,
  b: PlayerId,
  amount: number,
) {
  addHistoryValue(history, a, b, amount);
  addHistoryValue(history, b, a, amount);
}

export function applyHistoryDeltas(base: History, deltas: History, sign: 1 | -1): History {
  const next = cloneHistory(base);
  for (const [from, row] of Object.entries(deltas)) {
    for (const [to, value] of Object.entries(row)) {
      addHistoryValue(next, Number(from), Number(to), value * sign);
    }
  }
  return next;
}

export function pruneHistoryForPlayer(history: History, playerId: PlayerId): History {
  const next: History = {};

  for (const [from, row] of Object.entries(history)) {
    const numericFrom = Number(from);
    if (numericFrom === playerId) {
      continue;
    }

    const nextRow: Record<PlayerId, number> = {};
    for (const [to, value] of Object.entries(row)) {
      const numericTo = Number(to);
      if (numericTo !== playerId) {
        nextRow[numericTo] = value;
      }
    }

    if (Object.keys(nextRow).length > 0) {
      next[numericFrom] = nextRow;
    }
  }

  return next;
}

export function getMaxHistoryValue(history: History): number {
  return Object.values(history).reduce((max, row) => {
    const rowMax = Object.values(row).reduce((innerMax, value) => Math.max(innerMax, value), 0);
    return Math.max(max, rowMax);
  }, 0);
}
