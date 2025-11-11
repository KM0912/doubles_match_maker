import React, { forwardRef, useImperativeHandle } from 'react';
import { render } from '@testing-library/react';
import { PlayerProvider, usePlayerContext } from './PlayerContext';
import type { Match, Player } from '../types';
import { act } from 'react';

type Controller = {
  add: () => void;
  remove: (id: number) => void;
  reset: () => void;
  setBreak: (id: number, on: boolean) => void;
  updatePairHistory: (matches: Match[]) => void;
  updateOpponentHistory: (matches: Match[]) => void;
  getPlayers: () => Player[];
  getPairHistory: () => Record<number, Record<number, number>>;
  getOpponentHistory: () => Record<number, Record<number, number>>;
};

const ControllerComp = forwardRef<Controller>((_props, ref) => {
  const {
    addPlayer,
    removePlayer,
    resetPlayers,
    setOnBreak,
    updatePairHistoryByMatches,
    updateOpponentHistoryByMatches,
    players,
    pairHistory,
    opponentHistory,
  } = usePlayerContext();

  useImperativeHandle(ref, () => ({
    add: () => addPlayer(),
    remove: (id: number) => removePlayer(id),
    reset: () => resetPlayers(),
    setBreak: (id: number, on: boolean) => setOnBreak(id, on),
    updatePairHistory: (matches: Match[]) => updatePairHistoryByMatches(matches),
    updateOpponentHistory: (matches: Match[]) => updateOpponentHistoryByMatches(matches),
    getPlayers: () => players,
    getPairHistory: () => pairHistory,
    getOpponentHistory: () => opponentHistory,
  }));

  return null;
});

const renderHarness = () => {
  const ref = React.createRef<Controller>();
  render(
    <PlayerProvider>
      <ControllerComp ref={ref} />
    </PlayerProvider>,
  );
  return ref;
};

beforeEach(() => {
  localStorage.clear();
});

describe('PlayerContext の基本操作', () => {
  it('追加/削除/リセット/休憩切替ができる', () => {
    const ref = renderHarness();
    expect(ref.current).toBeTruthy();

    // 初期4人
    let players = ref.current!.getPlayers();
    expect(players.length).toBe(4);

    // 追加
    act(() => ref.current!.add());
    players = ref.current!.getPlayers();
    expect(players.length).toBe(5);

    // 休憩切替
    act(() => ref.current!.setBreak(players[0].id, true));
    players = ref.current!.getPlayers();
    expect(players[0].onBreak).toBe(true);

    // 削除
    const removedId = players[1].id;
    act(() => ref.current!.remove(removedId));
    players = ref.current!.getPlayers();
    expect(players.some((p) => p.id === removedId)).toBe(false);

    // リセット
    act(() => ref.current!.reset());
    players = ref.current!.getPlayers();
    expect(players.length).toBe(4);
    expect(players.every((p) => p.wins === 0 && p.gamesPlayed === 0)).toBe(true);
  });
});

describe('PlayerContext の履歴更新', () => {
  it('ペア履歴と対戦履歴を更新できる', () => {
    const ref = renderHarness();
    expect(ref.current).toBeTruthy();

    const players = ref.current!.getPlayers();
    const [p1, p2, p3, p4] = players;

    const matches: Match[] = [
      {
        id: 1,
        team1: [p1, p2],
        team2: [p3, p4],
        winner: null,
      },
    ];

    act(() => ref.current!.updatePairHistory(matches));
    let pairHistory = ref.current!.getPairHistory();
    expect(pairHistory[p1.id][p2.id]).toBe(1);
    expect(pairHistory[p2.id][p1.id]).toBe(1);
    expect(pairHistory[p3.id][p4.id]).toBe(1);
    expect(pairHistory[p4.id][p3.id]).toBe(1);

    act(() => ref.current!.updateOpponentHistory(matches));
    const opp = ref.current!.getOpponentHistory();
    // 各チームの相手に対して+1ずつ
    expect(opp[p1.id][p3.id]).toBe(1);
    expect(opp[p1.id][p4.id]).toBe(1);
    expect(opp[p2.id][p3.id]).toBe(1);
    expect(opp[p2.id][p4.id]).toBe(1);
    expect(opp[p3.id][p1.id]).toBe(1);
    expect(opp[p3.id][p2.id]).toBe(1);
    expect(opp[p4.id][p1.id]).toBe(1);
    expect(opp[p4.id][p2.id]).toBe(1);

    // もう1回同じ試合を記録すると2になる
    act(() => ref.current!.updatePairHistory(matches));
    pairHistory = ref.current!.getPairHistory();
    expect(pairHistory[p1.id][p2.id]).toBe(2);
    expect(pairHistory[p3.id][p4.id]).toBe(2);
  });
});
