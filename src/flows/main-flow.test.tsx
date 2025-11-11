import React, { forwardRef, useImperativeHandle } from "react";
import { render } from "@testing-library/react";
import { PlayerProvider, usePlayerContext } from "../contexts/PlayerContext";
import { MatchProvider, useMatchContext } from "../contexts/MatchContext";
import useMatchWinner from "../hooks/useMatchWinner";
import type { Match, Player } from "../types";
import { act } from "react";

// Deterministic shuffle
jest.mock("../utils/matchUtils", () => ({
  shufflePlayersArray: (array: Player[]) => array,
}));

type Controller = {
  setPlayers: (n: number) => void;
  generate: (courts: number) => void;
  setWinner: (index: number, team: 1 | 2) => void;
  complete: () => void;
  getMatches: () => Match[];
  getPlayers: () => Player[];
  getPairHistory: () => Record<number, Record<number, number>>;
  getOpponentHistory: () => Record<number, Record<number, number>>;
};

const ControllerComp = forwardRef<Controller>((_props, ref) => {
  const { updatePlayers, players, pairHistory, opponentHistory } =
    usePlayerContext();
  const { matches, generateMatches, completeMatches } = useMatchContext();
  const { updateMatchWinner } = useMatchWinner();

  useImperativeHandle(ref, () => ({
    setPlayers: (n: number) => {
      const ps: Player[] = Array.from({ length: n }, (_, i) => ({
        id: i + 1,
        gamesPlayed: 0,
        wins: 0,
        onBreak: false,
      }));
      updatePlayers(ps);
    },
    generate: (courts: number) => generateMatches(courts),
    setWinner: (index: number, team: 1 | 2) => updateMatchWinner(index, team),
    complete: () => completeMatches(),
    getMatches: () => matches,
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
      <MatchProvider>
        <ControllerComp ref={ref} />
      </MatchProvider>
    </PlayerProvider>
  );
  return ref;
};

beforeEach(() => {
  localStorage.clear();
});

describe("主要フロー: 生成→勝敗→完了→履歴更新", () => {
  it("勝利数/試合数/履歴が正しく更新される", () => {
    const ref = renderHarness();
    expect(ref.current).toBeTruthy();

    // 8人2コートで2試合生成
    act(() => ref.current!.setPlayers(8));
    act(() => ref.current!.generate(2));
    const matches = ref.current!.getMatches();
    expect(matches.length).toBe(2);

    // どちらの試合もチーム2を勝利に設定
    act(() => {
      ref.current!.setWinner(0, 2);
      ref.current!.setWinner(1, 2);
    });

    const prePlayers = ref.current!.getPlayers();
    const winners = new Set<number>(
      matches.flatMap((m) => m.team2.map((p) => p.id))
    );

    // 完了
    act(() => ref.current!.complete());

    const postPlayers = ref.current!.getPlayers();
    // 勝者はwins+1、参加者はgamesPlayed+1
    postPlayers.forEach((p) => {
      const wasInMatch = matches.some(
        (m) => [...m.team1, ...m.team2].some((x) => x.id === p.id)
      );
      expect(p.gamesPlayed).toBe(wasInMatch ? 1 : 0);
      const pre = prePlayers.find((pp) => pp.id === p.id)!;
      const diff = p.wins - pre.wins;
      expect(diff).toBe(winners.has(p.id) ? 1 : 0);
    });

    // 履歴の更新を確認
    const pair = ref.current!.getPairHistory();
    const opp = ref.current!.getOpponentHistory();
    for (const m of matches) {
      const t1 = m.team1.map((p) => p.id);
      const t2 = m.team2.map((p) => p.id);
      expect(pair[t1[0]][t1[1]]).toBeGreaterThanOrEqual(1);
      expect(pair[t2[0]][t2[1]]).toBeGreaterThanOrEqual(1);
      expect(opp[t1[0]][t2[0]]).toBeGreaterThanOrEqual(1);
      expect(opp[t1[0]][t2[1]]).toBeGreaterThanOrEqual(1);
      expect(opp[t1[1]][t2[0]]).toBeGreaterThanOrEqual(1);
      expect(opp[t1[1]][t2[1]]).toBeGreaterThanOrEqual(1);
    }

    // 試合はクリアされている
    expect(ref.current!.getMatches().length).toBe(0);
  });
});

