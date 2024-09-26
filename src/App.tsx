import React from "react";
import "./App.css";
import Home from "./components/pages/Home";
import { PlayersProvider } from "./context/PlayersContext";

function App() {
  return (
    <div className="App">
      <PlayersProvider>
        <Home />
      </PlayersProvider>
    </div>
  );
}

export default App;
