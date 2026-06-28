import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { createInitialState } from '../state/initialState';
import { appReducer } from '../state/reducer';
import { HistoryTab } from './HistoryTab';

describe('HistoryTab', () => {
  it('shows empty messages for both history tables before any round is completed', () => {
    const html = renderToStaticMarkup(<HistoryTab state={createInitialState()} />);

    expect(html).toContain('ペア履歴');
    expect(html).toContain('対戦履歴');
    expect(html.match(/次の試合を生成すると履歴が表示されます。/g)).toHaveLength(2);
  });

  it('renders pair and opponent history matrices after a round is completed', () => {
    const active = appReducer(createInitialState(), {
      type: 'start-round',
      output: { matches: [{ team1: [1, 2], team2: [3, 4] }] },
      createdAt: '2026-06-25T00:00:00.000Z',
    });
    const completed = appReducer(active, {
      type: 'complete-round',
      completedAt: '2026-06-25T01:00:00.000Z',
    });

    const html = renderToStaticMarkup(<HistoryTab state={completed} />);

    expect(html).toContain('role="region"');
    expect(html).toContain('aria-label="ペア履歴"');
    expect(html).toContain('aria-label="対戦履歴"');
    expect(html).toContain('<th scope="col">#1</th>');
    expect(html).toContain('<th scope="row">#4</th>');
    expect(html).toContain('>1</td>');
    expect(html).toContain('>-</td>');
  });
});
