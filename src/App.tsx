import React, { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';
import MainComponent from './components/pages/Main';
import { PlayerProvider } from './contexts/PlayerContext';
import { MatchProvider } from './contexts/MatchContext';
import { initAnalytics } from './utils/analytics';
import theme from './theme';

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='App'>
          <Helmet>
            <title>ダブルス組み合わせメーカー | テニス・バドミントンの試合管理アプリ</title>
            <meta
              name='description'
              content='ダブルス組み合わせメーカーで、テニスやバドミントンの試合を簡単に管理！最適な組み合わせを自動生成し、公平で楽しい試合運営をサポートします。初心者から上級者まで、誰でも簡単に使えるウェブアプリ。'
            />
            <meta
              name='keywords'
              content='ダブルス, 組み合わせ, テニス, バドミントン, 試合管理, ペア作成, 自動組み合わせ, 試合運営, スポーツ, 無料アプリ'
            />
            <link rel='canonical' href='https://km0912.github.io/doubles_match_maker/' />
          </Helmet>
          <PlayerProvider>
            <MatchProvider>
              <MainComponent />
            </MatchProvider>
          </PlayerProvider>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
