import { describe, expect, it } from 'vitest';
import type { History } from '../types';
import {
  addBidirectionalHistoryValue,
  addHistoryValue,
  applyHistoryDeltas,
  cloneHistory,
  getHistoryValue,
  getMaxHistoryValue,
  pruneHistoryForPlayer,
} from './history';

describe('history helpers', () => {
  it('clones rows so callers can mutate the copy safely', () => {
    const original: History = { 1: { 2: 3 } };
    const cloned = cloneHistory(original);

    addHistoryValue(cloned, 1, 2, 2);
    addHistoryValue(cloned, 2, 1, 1);

    expect(original).toEqual({ 1: { 2: 3 } });
    expect(cloned).toEqual({ 1: { 2: 5 }, 2: { 1: 1 } });
  });

  it('reads missing rows and cells as zero', () => {
    expect(getHistoryValue({}, 1, 2)).toBe(0);
    expect(getHistoryValue({ 1: {} }, 1, 2)).toBe(0);
    expect(getHistoryValue({ 1: { 2: 4 } }, 1, 2)).toBe(4);
  });

  it('adds and removes single-direction history values while cleaning empty rows', () => {
    const history: History = {};

    addHistoryValue(history, 1, 2, 2);
    addHistoryValue(history, 1, 2, -1);
    expect(history).toEqual({ 1: { 2: 1 } });

    addHistoryValue(history, 1, 2, -1);
    expect(history).toEqual({});
  });

  it('adds bidirectional history values symmetrically', () => {
    const history: History = { 1: { 2: 1 }, 2: { 1: 1 } };

    addBidirectionalHistoryValue(history, 1, 2, 2);

    expect(history).toEqual({ 1: { 2: 3 }, 2: { 1: 3 } });
  });

  it('applies deltas without mutating the base history', () => {
    const base: History = { 1: { 2: 2, 3: 1 }, 2: { 1: 2 }, 3: { 1: 1 } };
    const deltas: History = { 1: { 2: 1, 3: 1 }, 2: { 1: 1 }, 3: { 1: 1 } };

    const incremented = applyHistoryDeltas(base, deltas, 1);
    const decremented = applyHistoryDeltas(base, deltas, -1);

    expect(base).toEqual({ 1: { 2: 2, 3: 1 }, 2: { 1: 2 }, 3: { 1: 1 } });
    expect(incremented).toEqual({ 1: { 2: 3, 3: 2 }, 2: { 1: 3 }, 3: { 1: 2 } });
    expect(decremented).toEqual({ 1: { 2: 1 }, 2: { 1: 1 } });
  });

  it('prunes both rows and columns for a removed player', () => {
    const history: History = {
      1: { 2: 4, 3: 1 },
      2: { 1: 4, 3: 2 },
      3: { 1: 1, 2: 2 },
    };

    expect(pruneHistoryForPlayer(history, 2)).toEqual({
      1: { 3: 1 },
      3: { 1: 1 },
    });
    expect(history[2][1]).toBe(4);
  });

  it('returns the highest history count and zero for empty histories', () => {
    expect(getMaxHistoryValue({})).toBe(0);
    expect(getMaxHistoryValue({ 1: { 2: 2, 3: 5 }, 2: { 1: 2 } })).toBe(5);
  });
});
