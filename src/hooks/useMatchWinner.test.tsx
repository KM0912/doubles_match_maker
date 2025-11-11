import React, { forwardRef, useImperativeHandle } from 'react';
import { render } from '@testing-library/react';
import { PlayerProvider, usePlayerContext } from '../contexts/PlayerContext';
import { MatchProvider, useMatchContext } from '../contexts/MatchContext';
import useMatchWinner from './useMatchWinner';
import type { Match, Player, WinnerTeam } from '../types';
import { act } from 'react';

// Make shuffle deterministic in tests
jest.mock('../utils/matchUtils', () => ({
  shufflePlayersArray: (array: Player[]) => array,
}));

type Controller = {
  generate: (courts: number) => void;
  complete: () => void;
  setWinner: (index: number, team: WinnerTeam) => void;
  resetWinner: (index: number) => void;
  getMatches: () => Match[];
  getPlayers: () => Player[];
};

const ControllerComp = forwardRef<Controller>((_props, ref) => {
  const { players } = usePlayerContext();
  const { matches, generateMatches, completeMatches } = useMatchContext();
  const { updateMatchWinner, resetMatchWinner } = useMatchWinner();

  useImperativeHandle(ref, () => ({
    generate: (courts: number) => generateMatches(courts),
    complete: () => completeMatches(),
    setWinner: (index: number, team: WinnerTeam) => updateMatchWinner(index, team),
    resetWinner: (index: number) => resetMatchWinner(index),
    getMatches: () => matches,
    getPlayers: () => players,
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

beforeEach(() => {
  localStorage.clear();
});

describe('useMatchWinner の動作', () => {
  it('勝敗更新とリセットで勝利数を増減できる', () => {
    const ref = renderHarness();
    expect(ref.current).toBeTruthy();

    act(() => {
      ref.current!.generate(1);
    });

    const matches = ref.current!.getMatches();
    expect(matches.length).toBe(1);

    const t1 = matches[0].team1.map((p) => p.id);
    const t2 = matches[0].team2.map((p) => p.id);

    // チーム1を勝利にする
    act(() => {
      ref.current!.setWinner(0, 1);
    });

    let players = ref.current!.getPlayers();
    players.filter((p) => t1.includes(p.id)).forEach((p) => expect(p.wins).toBe(1));
    players.filter((p) => t2.includes(p.id)).forEach((p) => expect(p.wins).toBe(0));

    // リセットで元に戻る
    act(() => {
      ref.current!.resetWinner(0);
    });
    players = ref.current!.getPlayers();
    players.forEach((p) => expect(p.wins).toBe(0));

    // チーム2を勝利にする
    act(() => {
      ref.current!.setWinner(0, 2);
    });
    players = ref.current!.getPlayers();
    players.filter((p) => t2.includes(p.id)).forEach((p) => expect(p.wins).toBe(1));
    players.filter((p) => t1.includes(p.id)).forEach((p) => expect(p.wins).toBe(0));
  });

  it('無効なインデックスのリセットでエラーを投げる', () => {
    const ref = renderHarness();
    expect(ref.current).toBeTruthy();

    act(() => {
      ref.current!.generate(1);
    });

    expect(() => ref.current!.resetWinner(999)).toThrow('Invalid match index');
  });
});
