import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { createInitialState } from '../state/initialState';
import { appReducer } from '../state/reducer';
import type { AppState, PlayerId, PlayerSlot, TeamNumber } from '../types';
import { MatchTab } from './MatchTab';

const noop = () => undefined;

function renderMatchTab(state: AppState, selectedSlot: PlayerSlot | null = null) {
  return renderToStaticMarkup(
    <MatchTab
      state={state}
      selectedSlot={selectedSlot}
      generating={false}
      onGenerate={noop}
      onGenerateNextRound={noop}
      onSelectSlot={noop}
      onSelectWaitingPlayer={(_playerId: PlayerId) => undefined}
      onSetWinner={(_matchId: string, _winner: TeamNumber) => undefined}
      onClearWinner={(_matchId: string) => undefined}
    />,
  );
}

describe('MatchTab', () => {
  it('shows the insufficient players state when fewer than four players are available', () => {
    let state = createInitialState();
    state = appReducer(state, { type: 'toggle-break', playerId: 2 });
    state = appReducer(state, { type: 'toggle-break', playerId: 3 });

    const html = renderMatchTab(state);

    expect(html).toContain('参加可能人数が不足しています');
    expect(html).toContain('参加可能');
    expect(html).toContain('2人');
    expect(html).not.toContain('組み合わせ生成</button>');
  });

  it('shows the ready state with the expected match count before a round starts', () => {
    let state = appReducer(createInitialState(), { type: 'add-player' });
    state = appReducer(state, { type: 'add-player' });
    state = appReducer(state, { type: 'change-court-count', delta: 1 });

    const html = renderMatchTab(state);

    expect(html).toContain('組み合わせを生成できます');
    expect(html).toContain('生成予定');
    expect(html).toContain('1試合');
    expect(html).toContain('組み合わせ生成');
  });

  it('hides winner controls when win recording is off and shows waiting players', () => {
    const withWaitingPlayer = appReducer(createInitialState(), { type: 'add-player' });
    const state = appReducer(withWaitingPlayer, {
      type: 'start-round',
      output: { matches: [{ team1: [1, 2], team2: [3, 4] }] },
      createdAt: '2026-06-25T00:00:00.000Z',
    });

    const html = renderMatchTab(state);

    expect(html).toContain('現在の試合');
    expect(html).toContain('待機中の選手');
    expect(html).toContain('#5');
    expect(html).not.toContain('チーム1勝利');
    expect(html).not.toContain('勝敗未入力');
  });

  it('shows winner controls and incomplete count when win recording is on', () => {
    const state = appReducer(appReducer(createInitialState(), { type: 'toggle-record-wins', recordWins: true }), {
      type: 'start-round',
      output: { matches: [{ team1: [1, 2], team2: [3, 4] }] },
      createdAt: '2026-06-25T00:00:00.000Z',
    });

    const html = renderMatchTab(state);

    expect(html).toContain('チーム1勝利');
    expect(html).toContain('チーム2勝利');
    expect(html).toContain('1試合が勝敗未入力です。');
  });

  it('shows winner summary and correction action after a winner is selected', () => {
    const active = appReducer(appReducer(createInitialState(), { type: 'toggle-record-wins', recordWins: true }), {
      type: 'start-round',
      output: { matches: [{ team1: [1, 2], team2: [3, 4] }] },
      createdAt: '2026-06-25T00:00:00.000Z',
    });
    const state = appReducer(active, {
      type: 'set-winner',
      matchId: active.activeRound!.matches[0].id,
      winner: 2,
    });

    const html = renderMatchTab(state);

    expect(html).toContain('チーム2の勝利');
    expect(html).toContain('勝敗を修正');
    expect(html).not.toContain('チーム1勝利');
  });
});
