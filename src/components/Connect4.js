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
import {CurrentPlayer} from "./CurrentPlayer";
import {GetCells, getDroppingButtons} from "./Cells"

function getFirstPlayerTurn(boardSettings) {
  return boardSettings.colors.p1;
}

function traverseWinCells(winType, position) {
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
}

export const Connect4 = ({boardSettings, setShowGame}) => {
  const [board, setBoard] = useState(createBoard(boardSettings));
  const [currentPlayer, setCurrentPlayer] = useState(getFirstPlayerTurn(boardSettings));
  const [win, setWin] = useState(null);
  const [flashTimer, setFlashTimer] = useState(null);
  const [dropping, setDropping] = useState(false);
  const domBoard = useRef(null);


  function getBoardCell(index) {
    // console.log(index)
    if (!domBoard.current) return;
    const board = domBoard.current;
    const blocks = board.querySelectorAll(".board-block");
    return blocks[index];
  }

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
        const currentCell =
          board[getIndex(position.row, position.column, boardSettings)];
        if (currentCell === win.winner) {
          win.winningCells.push({ ...position });
          traverseWinCells(winType, position)
        } else {
          return win;
        }
      }
    }

    //Track win conditions to detect if 4 are connected
    const isWin = () => {
      return (
        isHorizontalWin(boardSettings, createWinState, board, winTypes) ||
        isVerticalWin(boardSettings, createWinState, board, winTypes) ||
        isForwardsDiagonalWin(boardSettings, createWinState, board, winTypes) ||
        isBackwardsDiagonalWin(
          boardSettings,
          createWinState,
          board,
          winTypes
        ) ||
        null
      );
    };

    setWin(isWin());
  }, [board, dropping, win, boardSettings]);

  async function handleUserMove(column) {
    if (dropping || win) {
      return
    };
    const row = getFirstEmptyRow(column); // finds the first empty row
    if (row < 0) {
      return
    }
    setDropping(true);
    await animateCellDrop(row, column, currentPlayer);
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

  function animateCellDrop(row, column, color, currentRow) {
    if (currentRow === undefined) {
      currentRow = 0;
    }
    return new Promise((resolve) => {
      if (currentRow > row) {
        return resolve();
      }
      if (currentRow > 0) {
        let cell = getBoardCell(getIndex(currentRow - 1, column, boardSettings));
        cell.style.backgroundColor = boardSettings.colors.empty;
      }
      let cell = getBoardCell(getIndex(currentRow, column, boardSettings));
      cell.style.backgroundColor = color;
      setTimeout(
        () => resolve(animateCellDrop(row, column, color, ++currentRow)),
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
        {getDroppingButtons(boardSettings, currentPlayer, handleUserMove)}
        <GetCells 
        board={board}
        />
      </div>
      {/* Display current players turn */}
      <CurrentPlayer 
        boardSettings={boardSettings}
        currentPlayer={currentPlayer}
        win={win}
        setShowGame={setShowGame}
      />
    </>
  );
};
