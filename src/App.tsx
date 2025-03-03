import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";
import MainComponent from "./components/pages/Main";
import "tailwindcss/tailwind.css";
import { PlayerProvider } from "./contexts/PlayerContext";
import { MatchProvider } from "./contexts/MatchContext";

function App() {
  useEffect(() => {
    const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;

    // Google Analytics スクリプトを動的に追加
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Google Analytics 設定用スクリプトを追加
    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}');
    `;
    document.head.appendChild(inlineScript);
  }, []);

  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <title>
            ダブルス組み合わせメーカー | テニス・バドミントンの試合管理アプリ
          </title>
          <meta
            name="description"
            content="ダブルス組み合わせメーカーで、テニスやバドミントンの試合を簡単に管理！最適な組み合わせを自動生成し、公平で楽しい試合運営をサポートします。初心者から上級者まで、誰でも簡単に使えるウェブアプリ。"
          />
          <meta
            name="keywords"
            content="ダブルス, 組み合わせ, テニス, バドミントン, 試合管理, ペア作成, 自動組み合わせ, 試合運営, スポーツ, 無料アプリ"
          />
          <link
            rel="canonical"
            href="https://km0912.github.io/doubles_match_maker/"
          />
        </Helmet>
        <PlayerProvider>
          <MatchProvider>
            <MainComponent />
          </MatchProvider>
        </PlayerProvider>
      </div>
    </HelmetProvider>
  );
}

export default App;
