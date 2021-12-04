import React, { useState, useRef, useEffect } from "react";
import { winTypes } from "../configs";
import {
  createBoard,
  getIndex,
  getGridCols,
  getRowAndColumn,
  isBackwardsDiagonalWin,
  isForwardsDiagonalWin,
  isVerticalWin,
  isHorizontalWin,
} from "../utils";
import "../styles.css"

function getFirstPlayerTurn(boardSettings) {
  return boardSettings.colors.p1;
}

export const Connect4 = ({boardSettings, setShowGame}) => {
  const [board, setBoard] = useState(createBoard(boardSettings));
  const [currentPlayer, setCurrentPlayer] = useState(getFirstPlayerTurn(boardSettings));
  const [win, setWin] = useState(null);
  const [flashTimer, setFlashTimer] = useState(null);
  const [dropping, setDropping] = useState(false);
  const domBoard = useRef(null);

  /**
   * End game animation.
   */
  useEffect(() => {
    if (!win) {
      return;
    }

    function flashWinningCells(isOn) {
      const { empty } = boardSettings.colors;
      const { winner } = win;
      for (let currentCell of win.winningCells) {
        let cell = getBoardCell(
          getIndex(currentCell.row, currentCell.column, boardSettings)
        );
        if(cell?.style) {
          cell.style.backgroundColor = isOn ? winner : empty;
        }

      }
      setFlashTimer(
        setTimeout(
          () => flashWinningCells(!isOn),
          boardSettings.flashAnimationRate
        )
      );
    }

    flashWinningCells(false);
  }, [win, setFlashTimer, boardSettings]);

  /**
   * Clears the end game animation timeout when game is restarted.
   */
  useEffect(() => {
    if (!win) {
      if (flashTimer) clearTimeout(flashTimer);
    }
  }, [win, flashTimer]);

  /**
   * Check for win when the board changes.
   */
  useEffect(() => {
    if (dropping || win) return;

    function createWinState(start, winType) {
      const win = {
        winner: board[start],
        winningCells: [],
      };

      const position = getRowAndColumn(start, boardSettings);

      while (true) {
        const current =
          board[getIndex(position.row, position.column, boardSettings)];
        if (current === win.winner) {
          win.winningCells.push({ ...position });
          if (winType === winTypes.horizontal) {
            position.column++;
          } else if (winType === winTypes.vertical) {
            position.row++;
          } else if (winType === winTypes.backwardsDiagonal) {
            position.row++;
            position.column++;
          } else if (winType === winTypes.forwardsDiagonal) {
            position.row++;
            position.column--;
          }
        } else {
          return win;
        }
      }
    }

    const isWin = () => {
      return (
        isForwardsDiagonalWin(boardSettings, createWinState, board, winTypes) ||
        isBackwardsDiagonalWin(
          boardSettings,
          createWinState,
          board,
          winTypes
        ) ||
        isHorizontalWin(boardSettings, createWinState, board, winTypes) ||
        isVerticalWin(boardSettings, createWinState, board, winTypes) ||
        null
      );
    };

    setWin(isWin());
  }, [board, dropping, win, boardSettings]);

  async function handleUserMove(column) {
    if (dropping || win) return;
    const row = getFirstEmptyRow(column); // finds the first empty row
    if (row < 0) return;
    setDropping(true);
    await animateDrop(row, column, currentPlayer);
    setDropping(false);
    const newBoard = board.slice();
    newBoard[getIndex(row, column, boardSettings)] = currentPlayer;
    setBoard(newBoard);

    setCurrentPlayer(
      currentPlayer === boardSettings.colors.p1
        ? boardSettings.colors.p2
        : boardSettings.colors.p1
    );
  }

  function animateDrop(row, column, color, currentRow) {
    if (currentRow === undefined) {
      currentRow = 0;
    }
    return new Promise((resolve) => {
      if (currentRow > row) {
        return resolve();
      }
      if (currentRow > 0) {
        let c = getBoardCell(getIndex(currentRow - 1, column, boardSettings));
        c.style.backgroundColor = boardSettings.colors.empty;
      }
      let c = getBoardCell(getIndex(currentRow, column, boardSettings));
      c.style.backgroundColor = color;
      setTimeout(
        () => resolve(animateDrop(row, column, color, ++currentRow)),
        boardSettings.dropAnimationRate
      );
    });
  }

  function getFirstEmptyRow(column) {
    let { empty } = boardSettings.colors;
    let { rows } = boardSettings;
    for (let i = 0; i < rows; i++) {
      if (board[getIndex(i, column, boardSettings)] !== empty) {
        return i - 1;
      }
    }
    // console.log("getFirstEmptyRow", rows)
    return rows - 1;
  }

  function getBoardCell(index) {
    // console.log(index)
    if (!domBoard.current) return;
    const board = domBoard.current;
    const blocks = board.querySelectorAll(".board-block");
    return blocks[index];
  }

  const getDroppingButtons = () => {
    const btn = [];

    for (let i = 0; i < boardSettings.columns; i++) {
      btn.push(
        <button
          key={i}
          onClick={() => handleUserMove(i)}
          style={{
            backgroundColor: currentPlayer,
          }}
        />
      );
    }

    return btn;
  };

  const getCells = board.map((c, i) => (
    <button
      key={"c" + i}
      className="cell board-block"
      style={{
        backgroundColor: "none",
      }}
    />
  ));

  const CurrentPlayer = () => {
    return (
      <>
        {!win ? (
          <h2 style={{ color: currentPlayer }}>
            {currentPlayer === boardSettings.colors.p1
              ? boardSettings.playerNames.p1
              : boardSettings.playerNames.p2}
          </h2>
        ) : (
					<>
					  <h1 style={{ color: win.winner }}>
            {" "}
            {win.winner === boardSettings.colors.p1
              ? boardSettings.playerNames.p1
              : boardSettings.playerNames.p2}{" "}
            WON!
          </h1>
          <button onClick={() => setShowGame(false)}>Restart</button>
          <br />
          <br />
					</>
				)}
      </>
    );
  };

  return (
    <>
      {/* Creates a board */}
      <div
        className={`board ${
          currentPlayer === boardSettings.colors.p1 ? "p1-turn" : "p2-turn"
        } `}
        ref={domBoard}
        style={{ gridTemplateColumns: getGridCols(boardSettings) }}
      >
        {getDroppingButtons()}
        {getCells}
      </div>
      {/* Display current players turn */}
      <CurrentPlayer />
    </>
  );
};
