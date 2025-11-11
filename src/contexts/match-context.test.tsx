import React, { forwardRef, useImperativeHandle } from "react";
import { render } from "@testing-library/react";
import { PlayerProvider, usePlayerContext } from "./PlayerContext";
import { MatchProvider, useMatchContext } from "./MatchContext";
import type { Match, Player } from "../types";
import { act } from "react";

// Deterministic shuffle
jest.mock("../utils/matchUtils", () => ({
  shufflePlayersArray: (array: Player[]) => array,
}));

type Controller = {
  setPlayers: (n: number) => void;
  generate: (courts: number) => void;
  complete: () => void;
  reset: () => void;
  isInMatch: (id: number) => boolean;
  getMatches: () => Match[];
  getPlayers: () => Player[];
  getPairHistory: () => Record<number, Record<number, number>>;
  getOpponentHistory: () => Record<number, Record<number, number>>;
};

const ControllerComp = forwardRef<Controller>((_props, ref) => {
  const { updatePlayers, players, pairHistory, opponentHistory } =
    usePlayerContext();
  const {
    matches,
    generateMatches,
    completeMatches,
    resetMatch,
    isPlayerInMatch,
  } = useMatchContext();

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
    complete: () => completeMatches(),
    reset: () => resetMatch(),
    isInMatch: (id: number) => isPlayerInMatch(id),
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

describe("MatchContext の基本動作", () => {
  it("生成/完了/リセット/在試合判定/履歴更新ができる", () => {
    const ref = renderHarness();
    expect(ref.current).toBeTruthy();

    // 8人, 2コート -> 2試合
    act(() => ref.current!.setPlayers(8));
    act(() => ref.current!.generate(2));
    let matches = ref.current!.getMatches();
    expect(matches.length).toBe(2);

    // 在試合判定
    const inMatchIds = new Set(matches.flatMap((m) => [...m.team1, ...m.team2]).map((p) => p.id));
    for (const id of inMatchIds) {
      expect(ref.current!.isInMatch(id)).toBe(true);
    }

    // 完了で試合がクリアされ、参加者の試合数が+1、履歴が更新
    const preMatches = matches;
    act(() => ref.current!.complete());
    matches = ref.current!.getMatches();
    expect(matches.length).toBe(0);

    const players = ref.current!.getPlayers();
    players
      .filter((p) => inMatchIds.has(p.id))
      .forEach((p) => expect(p.gamesPlayed).toBe(1));

    const pair = ref.current!.getPairHistory();
    const opp = ref.current!.getOpponentHistory();
    // 各試合のペアが1回ずつ、対戦履歴はクロスで1回ずつ
    for (const m of preMatches) {
      const t1 = m.team1.map((p) => p.id);
      const t2 = m.team2.map((p) => p.id);
      expect(pair[t1[0]][t1[1]]).toBeGreaterThanOrEqual(1);
      expect(pair[t2[0]][t2[1]]).toBeGreaterThanOrEqual(1);
      expect(opp[t1[0]][t2[0]]).toBeGreaterThanOrEqual(1);
      expect(opp[t1[0]][t2[1]]).toBeGreaterThanOrEqual(1);
      expect(opp[t1[1]][t2[0]]).toBeGreaterThanOrEqual(1);
      expect(opp[t1[1]][t2[1]]).toBeGreaterThanOrEqual(1);
    }

    // リセットで再生成可能
    act(() => ref.current!.reset());
    act(() => ref.current!.generate(2));
    matches = ref.current!.getMatches();
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });
});
