import React from "react";
import "./App.css";
import MainComponent from "./components/pages/Main";
import "tailwindcss/tailwind.css";
import { PlayerProvider } from "./contexts/PlayerContext";

function App() {
  return (
    <div className="App">
      <PlayerProvider>
        <MainComponent />
      </PlayerProvider>
    </div>
  );
}

export default App;
