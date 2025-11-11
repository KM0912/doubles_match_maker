import React, { forwardRef, useImperativeHandle } from 'react';
import { render } from '@testing-library/react';
import { PlayerProvider, usePlayerContext } from './PlayerContext';
import { MatchProvider, useMatchContext } from './MatchContext';
import type { Match, Player } from '../types';
import { act } from 'react';

// Make shuffle deterministic in tests
jest.mock('../utils/matchUtils', () => ({
  shufflePlayersArray: (array: Player[]) => array,
}));

// Test controller to interact with contexts imperatively
type Controller = {
  setPlayerCount: (n: number) => void;
  generate: (courts: number) => void;
  complete: () => void;
  getMatches: () => Match[];
  getPlayers: () => Player[];
  reset: () => void;
};

const ControllerComp = forwardRef<Controller>((_props, ref) => {
  const { players, updatePlayers, resetPlayers } = usePlayerContext();
  const { matches, generateMatches, completeMatches } = useMatchContext();

  useImperativeHandle(ref, () => ({
    setPlayerCount: (n: number) => {
      const newPlayers: Player[] = Array.from({ length: n }, (_, i) => ({
        id: i + 1,
        gamesPlayed: 0,
        wins: 0,
        onBreak: false,
      }));
      updatePlayers(newPlayers);
    },
    generate: (courts: number) => {
      generateMatches(courts);
    },
    complete: () => {
      completeMatches();
    },
    getMatches: () => matches,
    getPlayers: () => players,
    reset: () => {
      resetPlayers();
    },
  }));

  return null;
});

const renderHarness = () => {
  const ref = React.createRef<Controller>();
  render(
    <PlayerProvider>
      <MatchProvider>
        <ControllerComp ref={ref} />
      </MatchProvider>
    </PlayerProvider>,
  );
  return ref;
};

const pairKey = (a: number, b: number) => {
  const [x, y] = [a, b].sort((m, n) => m - n);
  return `${x}-${y}`;
};

const matchupKey = (team1: number[], team2: number[]) => {
  const t1 = [...team1].sort((a, b) => a - b).join(',');
  const t2 = [...team2].sort((a, b) => a - b).join(',');
  // Order-independent key for team vs team
  return [t1, t2].sort().join('|');
};

beforeEach(() => {
  localStorage.clear();
});

type Case = { n: number; courts: number; rounds: number };

const cases: Case[] = [
  { n: 4, courts: 1, rounds: 8 },
  { n: 6, courts: 2, rounds: 10 },
  { n: 8, courts: 2, rounds: 8 },
  { n: 10, courts: 2, rounds: 10 },
  { n: 12, courts: 3, rounds: 6 },
];

describe('Match generation fairness across player counts', () => {
  it.each(cases)(
    'n=%i players, courts=%i maintains balance and avoids consecutive repeats',
    ({ n, courts, rounds }) => {
      const ref = renderHarness();
      expect(ref.current).toBeTruthy();
      // Initialize players
      act(() => {
        ref.current!.reset();
        ref.current!.setPlayerCount(n);
      });

      let prevRoundPairs = new Set<string>();
      let prevRoundMatchups = new Set<string>();

      for (let r = 0; r < rounds; r++) {
        act(() => {
          ref.current!.generate(courts);
        });
        const matches = ref.current!.getMatches();

        // Build current round pair and matchup sets
        const roundPairs = new Set<string>();
        const roundMatchups = new Set<string>();
        for (const m of matches) {
          const t1 = m.team1.map((p) => p.id);
          const t2 = m.team2.map((p) => p.id);
          roundPairs.add(pairKey(t1[0], t1[1]));
          roundPairs.add(pairKey(t2[0], t2[1]));
          roundMatchups.add(matchupKey(t1, t2));
        }

        // Assert no consecutive same pair
        for (const p of roundPairs) {
          expect(prevRoundPairs.has(p)).toBe(false);
        }

        // Assert no consecutive same matchup (team vs team regardless of side)
        for (const mu of roundMatchups) {
          expect(prevRoundMatchups.has(mu)).toBe(false);
        }

        // Complete matches to update histories and participation
        act(() => {
          ref.current!.complete();
        });

        prevRoundPairs = roundPairs;
        prevRoundMatchups = roundMatchups;
      }

      // Participation balance: difference between max and min gamesPlayed <= 1
      const players = ref.current!.getPlayers();
      const counts = players.map((p) => p.gamesPlayed);
      const max = Math.max(...counts);
      const min = Math.min(...counts);
      expect(max - min).toBeLessThanOrEqual(1);
    },
  );
});
