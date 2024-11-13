import React, { useEffect } from "react";
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
    <div className="App">
      <PlayerProvider>
        <MatchProvider>
          <MainComponent />
        </MatchProvider>
      </PlayerProvider>
    </div>
  );
}

export default App;
