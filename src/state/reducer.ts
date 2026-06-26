import type {
  ActiveMatch,
  ActiveRound,
  AppState,
  AppTab,
  History,
  PlayerId,
  PlayerSlot,
  SchedulerOutput,
  TeamNumber,
} from '../types';
import { createInitialState } from './initialState';
import {
  addBidirectionalHistoryValue,
  applyHistoryDeltas,
  cloneHistory,
  pruneHistoryForPlayer,
} from './history';
import { getPlayersInRound, roundContainsPlayer } from './selectors';

type PlayerDelta = {
  gamesPlayed: number;
  wins: number;
};

export type AppAction =
  | { type: 'select-tab'; tab: AppTab }
  | { type: 'add-player' }
  | { type: 'remove-player'; playerId: PlayerId }
  | { type: 'toggle-break'; playerId: PlayerId }
  | { type: 'change-court-count'; delta: 1 | -1 }
  | { type: 'toggle-record-wins'; recordWins: boolean }
  | { type: 'start-round'; output: SchedulerOutput; createdAt?: string }
  | { type: 'set-winner'; matchId: string; winner: TeamNumber }
  | { type: 'clear-winner'; matchId: string }
  | { type: 'swap-slots'; from: PlayerSlot; to: PlayerSlot }
  | { type: 'replace-slot'; slot: PlayerSlot; playerId: PlayerId }
  | { type: 'complete-round'; completedAt?: string }
  | { type: 'undo-complete' }
  | { type: 'reset' };

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function addPlayerDelta(
  deltas: Record<PlayerId, PlayerDelta>,
  playerId: PlayerId,
  delta: PlayerDelta,
) {
  deltas[playerId] = {
    gamesPlayed: (deltas[playerId]?.gamesPlayed ?? 0) + delta.gamesPlayed,
    wins: (deltas[playerId]?.wins ?? 0) + delta.wins,
  };
}

function getSlotValue(match: ActiveMatch, slot: PlayerSlot): PlayerId {
  return slot.team === 1 ? match.team1[slot.index] : match.team2[slot.index];
}

function setSlotValue(match: ActiveMatch, slot: PlayerSlot, playerId: PlayerId): ActiveMatch {
  if (slot.team === 1) {
    const team1: [PlayerId, PlayerId] = [...match.team1];
    team1[slot.index] = playerId;
    return { ...match, team1 };
  }

  const team2: [PlayerId, PlayerId] = [...match.team2];
  team2[slot.index] = playerId;
  return { ...match, team2 };
}

function getMatch(round: ActiveRound | null, matchId: string): ActiveMatch | null {
  return round?.matches.find((match) => match.id === matchId) ?? null;
}

function updateMatch(round: ActiveRound, updatedMatch: ActiveMatch): ActiveRound {
  return {
    ...round,
    matches: round.matches.map((match) => (match.id === updatedMatch.id ? updatedMatch : match)),
  };
}

function clearRoundWinners(round: ActiveRound | null): ActiveRound | null {
  if (!round) {
    return null;
  }

  return {
    ...round,
    matches: round.matches.map((match) => ({ ...match, winner: null })),
  };
}

function matchIsLocked(state: AppState, match: ActiveMatch): boolean {
  return state.recordWins && match.winner !== null;
}

function applyPlayerDeltas(
  players: AppState['players'],
  deltas: Record<PlayerId, PlayerDelta>,
  sign: 1 | -1,
): AppState['players'] {
  return players.map((player) => {
    const delta = deltas[player.id];
    if (!delta) {
      return player;
    }

    return {
      ...player,
      gamesPlayed: Math.max(0, player.gamesPlayed + delta.gamesPlayed * sign),
      wins: Math.max(0, player.wins + delta.wins * sign),
    };
  });
}

function undoRecordContainsPlayer(state: AppState, playerId: PlayerId): boolean {
  if (!state.undoRecord) {
    return false;
  }

  return (
    roundContainsPlayer(state.undoRecord.round, playerId) ||
    Object.prototype.hasOwnProperty.call(state.undoRecord.appliedPlayerDeltas, playerId)
  );
}

function createRoundFromSchedulerOutput(output: SchedulerOutput, createdAt: string): ActiveRound {
  return {
    id: createId('round'),
    createdAt,
    matches: output.matches.map((match, index) => ({
      id: createId('match'),
      courtNumber: index + 1,
      team1: match.team1,
      team2: match.team2,
      winner: null,
    })),
  };
}

function completeActiveRound(state: AppState, completedAt: string): AppState {
  if (!state.activeRound) {
    return state;
  }

  const appliedPlayerDeltas: Record<PlayerId, PlayerDelta> = {};
  const pairHistory = cloneHistory(state.pairHistory);
  const opponentHistory = cloneHistory(state.opponentHistory);
  const appliedPairHistoryDeltas: History = {};
  const appliedOpponentHistoryDeltas: History = {};

  for (const match of state.activeRound.matches) {
    const team1 = match.team1;
    const team2 = match.team2;

    [...team1, ...team2].forEach((playerId) =>
      addPlayerDelta(appliedPlayerDeltas, playerId, { gamesPlayed: 1, wins: 0 }),
    );

    if (state.recordWins && match.winner === 1) {
      team1.forEach((playerId) =>
        addPlayerDelta(appliedPlayerDeltas, playerId, { gamesPlayed: 0, wins: 1 }),
      );
    }

    if (state.recordWins && match.winner === 2) {
      team2.forEach((playerId) =>
        addPlayerDelta(appliedPlayerDeltas, playerId, { gamesPlayed: 0, wins: 1 }),
      );
    }

    addBidirectionalHistoryValue(pairHistory, team1[0], team1[1], 1);
    addBidirectionalHistoryValue(appliedPairHistoryDeltas, team1[0], team1[1], 1);
    addBidirectionalHistoryValue(pairHistory, team2[0], team2[1], 1);
    addBidirectionalHistoryValue(appliedPairHistoryDeltas, team2[0], team2[1], 1);

    for (const playerA of team1) {
      for (const playerB of team2) {
        addBidirectionalHistoryValue(opponentHistory, playerA, playerB, 1);
        addBidirectionalHistoryValue(appliedOpponentHistoryDeltas, playerA, playerB, 1);
      }
    }
  }

  return {
    ...state,
    players: applyPlayerDeltas(state.players, appliedPlayerDeltas, 1),
    pairHistory,
    opponentHistory,
    undoRecord: {
      round: state.activeRound,
      appliedPlayerDeltas,
      appliedPairHistoryDeltas,
      appliedOpponentHistoryDeltas,
      completedAt,
    },
    activeRound: null,
  };
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'select-tab':
      return { ...state, selectedTab: action.tab };

    case 'add-player':
      return {
        ...state,
        players: [
          ...state.players,
          { id: state.nextPlayerId, gamesPlayed: 0, wins: 0, onBreak: false },
        ].sort((a, b) => a.id - b.id),
        nextPlayerId: state.nextPlayerId + 1,
      };

    case 'remove-player': {
      if (roundContainsPlayer(state.activeRound, action.playerId)) {
        return state;
      }

      return {
        ...state,
        players: state.players.filter((player) => player.id !== action.playerId),
        pairHistory: pruneHistoryForPlayer(state.pairHistory, action.playerId),
        opponentHistory: pruneHistoryForPlayer(state.opponentHistory, action.playerId),
        undoRecord: undoRecordContainsPlayer(state, action.playerId) ? null : state.undoRecord,
      };
    }

    case 'toggle-break':
      if (roundContainsPlayer(state.activeRound, action.playerId)) {
        return state;
      }
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === action.playerId ? { ...player, onBreak: !player.onBreak } : player,
        ),
      };

    case 'change-court-count':
      return {
        ...state,
        courtCount: Math.min(10, Math.max(1, state.courtCount + action.delta)),
      };

    case 'toggle-record-wins':
      if (state.recordWins === action.recordWins) {
        return state;
      }

      return {
        ...state,
        recordWins: action.recordWins,
        activeRound: action.recordWins ? state.activeRound : clearRoundWinners(state.activeRound),
        undoRecord:
          action.recordWins || !state.undoRecord
            ? state.undoRecord
            : { ...state.undoRecord, round: clearRoundWinners(state.undoRecord.round)! },
      };

    case 'start-round':
      if (state.activeRound || action.output.matches.length === 0) {
        return state;
      }
      return {
        ...state,
        activeRound: createRoundFromSchedulerOutput(
          action.output,
          action.createdAt ?? new Date().toISOString(),
        ),
        undoRecord: null,
        selectedTab: 'matches',
      };

    case 'set-winner':
      if (!state.recordWins || !state.activeRound) {
        return state;
      }
      return {
        ...state,
        activeRound: {
          ...state.activeRound,
          matches: state.activeRound.matches.map((match) =>
            match.id === action.matchId ? { ...match, winner: action.winner } : match,
          ),
        },
      };

    case 'clear-winner':
      if (!state.recordWins || !state.activeRound) {
        return state;
      }
      return {
        ...state,
        activeRound: {
          ...state.activeRound,
          matches: state.activeRound.matches.map((match) =>
            match.id === action.matchId ? { ...match, winner: null } : match,
          ),
        },
      };

    case 'swap-slots': {
      if (!state.activeRound) {
        return state;
      }

      const fromMatch = getMatch(state.activeRound, action.from.matchId);
      const toMatch = getMatch(state.activeRound, action.to.matchId);
      if (!fromMatch || !toMatch || matchIsLocked(state, fromMatch) || matchIsLocked(state, toMatch)) {
        return state;
      }

      const fromValue = getSlotValue(fromMatch, action.from);
      const toValue = getSlotValue(toMatch, action.to);

      let nextRound = state.activeRound;
      const nextFromMatch = setSlotValue(fromMatch, action.from, toValue);
      nextRound = updateMatch(nextRound, nextFromMatch);

      const latestToMatch = getMatch(nextRound, action.to.matchId);
      if (!latestToMatch) {
        return state;
      }
      nextRound = updateMatch(nextRound, setSlotValue(latestToMatch, action.to, fromValue));

      return { ...state, activeRound: nextRound };
    }

    case 'replace-slot': {
      if (!state.activeRound) {
        return state;
      }

      const activePlayerIds = getPlayersInRound(state.activeRound);
      if (activePlayerIds.has(action.playerId)) {
        return state;
      }

      const match = getMatch(state.activeRound, action.slot.matchId);
      if (!match || matchIsLocked(state, match)) {
        return state;
      }

      return {
        ...state,
        activeRound: updateMatch(state.activeRound, setSlotValue(match, action.slot, action.playerId)),
      };
    }

    case 'complete-round':
      return completeActiveRound(state, action.completedAt ?? new Date().toISOString());

    case 'undo-complete':
      if (!state.undoRecord || state.activeRound) {
        return state;
      }
      return {
        ...state,
        players: applyPlayerDeltas(state.players, state.undoRecord.appliedPlayerDeltas, -1),
        pairHistory: applyHistoryDeltas(
          state.pairHistory,
          state.undoRecord.appliedPairHistoryDeltas,
          -1,
        ),
        opponentHistory: applyHistoryDeltas(
          state.opponentHistory,
          state.undoRecord.appliedOpponentHistoryDeltas,
          -1,
        ),
        activeRound: state.undoRecord.round,
        undoRecord: null,
        selectedTab: 'matches',
      };

    case 'reset':
      return createInitialState();

    default:
      return state;
  }
}
