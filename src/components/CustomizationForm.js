import React, { useEffect, useState } from "react";
import { player1Colors, player2Colors, boardSettings } from "../configs";

export const CustomizationForm = ({ setBoardSettings }) => {
  const [playerName1, setPlayerName1] = useState("");
  const [playerName2, setPlayerName2] = useState("");
  const [playerColor1, setPlayerColor1] = useState("");
  const [playerColor2, setPlayerColor2] = useState("");
  const [disabled, setDisbled] = useState(true);

  useEffect(() => {
    if (playerName1 && playerName2 && playerColor1 && playerColor2) {
      setDisbled(false);
    } else {
      setDisbled(true);
    }
  }, [playerName1, playerName2, playerColor1, playerColor2]);

  const setBoardConfiguration = (e) => {
    e.preventDefault();
    const colors = {
      empty: "#AAAAAA",
      p1: playerColor1,
      p2: playerColor2,
    };

    const playerNames = {
      p1: playerName1,
      p2: playerName2,
    };

    const updatedBoardSettings = {
      ...boardSettings,
      colors: colors,
      playerNames: playerNames,
    };
    setBoardSettings(updatedBoardSettings);
  };
  return (
    <div classNameName="box">
      <h1>
        Hello, <span>Players!</span>
      </h1>

      <form className="form">
        <div className="field">
          <label for="player-name-1">
            <b>Player 1 Name</b>
          </label>
          <div className="control">
            <input
              type="text"
              value={playerName1}
              name="player-name-1"
              className="input"
              onChange={(e) => setPlayerName1(e.target.value)}
            />
          </div>
          <label for="player-name-2">
            <b>Player 2 Name</b>
          </label>
          <div className="control">
            <input
              type="text"
              value={playerName2}
              name="player-name-1"
              className="input"
              onChange={(e) => setPlayerName2(e.target.value)}
            />
          </div>
          <label for="player-color-1">
            <b>Choose Color for Player 1</b>
          </label>
          <div className="control">
            <select
              className={"option"}
              name="player-color-1"
              id="player-color-1"
              onChange={(e) => setPlayerColor1(e.target.value)}
            >
              <option value="">Select...</option>
              {player1Colors.map((currentColor) => (
                <option value={currentColor.value}>{currentColor.label}</option>
              ))}
            </select>
          </div>
          <label for="player-color-2">
            <b>Choose Color for Player 2</b>
          </label>
          <div className="control">
            <select
              className={"option"}
              name="player-color-2"
              id="player-color-2"
              onChange={(e) => setPlayerColor2(e.target.value)}
            >
              <option value="">Select...</option>
              {player2Colors.map((currentColor) => (
                <option value={currentColor.value}>{currentColor.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button
              className="button is-dark"
              onClick={(e) => setBoardConfiguration(e)}
              disabled={disabled}
            >
              Play Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
