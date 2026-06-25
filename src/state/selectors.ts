import type { ActiveRound, AppState, PlayerId, PlayerSlot } from '../types';

export function getPlayersInRound(round: ActiveRound | null): Set<PlayerId> {
  const ids = new Set<PlayerId>();
  if (!round) {
    return ids;
  }

  for (const match of round.matches) {
    [...match.team1, ...match.team2].forEach((id) => ids.add(id));
  }

  return ids;
}

export function getAvailablePlayerIds(state: AppState): PlayerId[] {
  return state.players
    .filter((player) => !player.onBreak)
    .map((player) => player.id)
    .sort((a, b) => a - b);
}

export function getWaitingPlayerIds(state: AppState): PlayerId[] {
  const activeIds = getPlayersInRound(state.activeRound);
  return getAvailablePlayerIds(state).filter((id) => !activeIds.has(id));
}

export function isPlayerInActiveRound(state: AppState, playerId: PlayerId): boolean {
  return getPlayersInRound(state.activeRound).has(playerId);
}

export function getPlayerLabel(playerId: PlayerId): string {
  return `#${playerId}`;
}

export function slotKey(slot: PlayerSlot): string {
  return `${slot.matchId}:${slot.team}:${slot.index}`;
}

export function roundContainsPlayer(round: ActiveRound | null, playerId: PlayerId): boolean {
  return getPlayersInRound(round).has(playerId);
}
