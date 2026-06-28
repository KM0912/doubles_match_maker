import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { createInitialState } from '../state/initialState';
import { appReducer } from '../state/reducer';
import type { AppState, PlayerId } from '../types';
import { SettingsTab } from './SettingsTab';

const noop = () => undefined;

function renderSettingsTab(state: AppState) {
  return renderToStaticMarkup(
    <SettingsTab
      state={state}
      onAddPlayer={noop}
      onRemovePlayer={(_playerId: PlayerId) => undefined}
      onToggleBreak={(_playerId: PlayerId) => undefined}
      onChangeCourtCount={noop}
      onToggleRecordWins={(_recordWins: boolean) => undefined}
      onReset={noop}
    />,
  );
}

describe('SettingsTab', () => {
  it('renders court controls, player ids, and reset action', () => {
    const html = renderSettingsTab(createInitialState());

    expect(html).toContain('コート数');
    expect(html).toContain('aria-label="コート数を減らす"');
    expect(html).toContain('aria-label="コート数を増やす"');
    expect(html).toContain('#1');
    expect(html).toContain('#4');
    expect(html).toContain('リセット');
  });

  it('shows wins only when win recording is enabled', () => {
    const offHtml = renderSettingsTab(createInitialState());
    const onHtml = renderSettingsTab(
      appReducer(createInitialState(), { type: 'toggle-record-wins', recordWins: true }),
    );

    expect(offHtml).toContain('player-stats single-stat');
    expect(offHtml).not.toContain('<dt>勝利</dt>');
    expect(onHtml).not.toContain('player-stats single-stat');
    expect(onHtml).toContain('<dt>勝利</dt>');
  });

  it('marks active players as in match and keeps waiting players available', () => {
    const withWaitingPlayer = appReducer(createInitialState(), { type: 'add-player' });
    const state = appReducer(withWaitingPlayer, {
      type: 'start-round',
      output: { matches: [{ team1: [1, 2], team2: [3, 4] }] },
      createdAt: '2026-06-25T00:00:00.000Z',
    });

    const html = renderSettingsTab(state);

    expect(html).toContain('試合中');
    expect(html).toContain('#5');
    expect(html).toContain('参加中');
    expect(html).toContain('player-card in-match');
  });

  it('shows break status and the action to return a player', () => {
    const state = appReducer(createInitialState(), { type: 'toggle-break', playerId: 3 });

    const html = renderSettingsTab(state);

    expect(html).toContain('休憩中');
    expect(html).toContain('参加に戻す');
  });
});
