import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('アプリタイトルを表示する', () => {
  render(<App />);
  expect(screen.getByText('ダブルス組み合わせメーカー')).toBeInTheDocument();
});
