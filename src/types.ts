export type PlayerId = number;

export type Player = {
  id: PlayerId;
  gamesPlayed: number;
  wins: number;
  onBreak: boolean;
};

export type TeamNumber = 1 | 2;

export type ActiveMatch = {
  id: string;
  courtNumber: number;
  team1: [PlayerId, PlayerId];
  team2: [PlayerId, PlayerId];
  winner: TeamNumber | null;
};

export type ActiveRound = {
  id: string;
  createdAt: string;
  matches: ActiveMatch[];
};

export type History = Record<PlayerId, Record<PlayerId, number>>;

export type UndoRecord = {
  round: ActiveRound;
  appliedPlayerDeltas: Record<
    PlayerId,
    {
      gamesPlayed: number;
      wins: number;
    }
  >;
  appliedPairHistoryDeltas: History;
  appliedOpponentHistoryDeltas: History;
  completedAt: string;
};

export type AppTab = 'matches' | 'settings' | 'history';

export type AppState = {
  schemaVersion: 1;
  players: Player[];
  nextPlayerId: PlayerId;
  courtCount: number;
  recordWins: boolean;
  activeRound: ActiveRound | null;
  pairHistory: History;
  opponentHistory: History;
  undoRecord: UndoRecord | null;
  selectedTab: AppTab;
};

export type SchedulerInput = {
  playerIds: PlayerId[];
  courtCount: number;
  pairHistory: History;
  opponentHistory: History;
};

export type SchedulerOutput = {
  matches: Array<{
    team1: [PlayerId, PlayerId];
    team2: [PlayerId, PlayerId];
  }>;
};

export type PlayerSlot = {
  matchId: string;
  team: TeamNumber;
  index: 0 | 1;
};
