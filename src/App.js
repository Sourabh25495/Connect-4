import React, { useState } from "react";
import "./App.css";
import { Connect4 } from "./components/Connect4";
import { CustomizationForm } from "./components/CustomizationForm";

function App() {
  const [showGame, setShowGame] = useState(false);

  const [boardSettings, setBoardSettings] = useState({});

  return (
    <div className="App">
      <div className="App">
        <h1>Connect Four Game</h1>
        <h2>With React</h2>
        {!showGame && (
          <CustomizationForm
            setBoardSettings={(boardConfig) => {
              setBoardSettings(boardConfig);
              setShowGame(true);
            }}
          />
        )}
        {showGame && <Connect4 boardSettings={boardSettings} />}
      </div>
    </div>
  );
}

export default App;
