import React from "react";
import "./App.css";
import MainComponent from "./components/pages/Main";
import "tailwindcss/tailwind.css";
import { PlayerProvider } from "./contexts/PlayerContext";
import { MatchProvider } from "./contexts/MatchContext";

function App() {
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
