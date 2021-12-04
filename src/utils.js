export function getIndex(row, column, boardSettings) {
    const index = row * boardSettings.columns + column;
    if (index > boardSettings.rows * boardSettings.colums) return null;
    return index;
  }

  export function createBoard(boardSettings) {
    return new Array(boardSettings.rows * boardSettings.columns).fill(
      boardSettings.colors.empty
    );
  }

  export function getRowAndColumn(index, boardSettings) {
    if (index > boardSettings.rows * boardSettings.colums) return null;
    const row = Math.floor(index / boardSettings.columns);
    const column = Math.floor(index % boardSettings.columns);
    return {
      row,
      column
    };
  }

  export function getGridCols(boardSettings) {
    let gridTemplateColumns = "";
    for (let i = 0; i < boardSettings.columns; i++) {
      gridTemplateColumns += "auto ";
    }
    return gridTemplateColumns;
  }

  export function isHorizontalWin(boardSettings, createWinState, board, winTypes) {
    const { rows } = boardSettings;
    const { columns } = boardSettings;
    const { empty } = boardSettings.colors;
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column <= columns - 4; column++) {
        let start = getIndex(row, column, boardSettings);
        if (board[start] === empty) continue;
        let counter = 1;
        for (let k = column + 1; k < column + 4; k++) {
          if (board[getIndex(row, k, boardSettings)] === board[start]) {
            counter++;
            if (counter === 4)
              return createWinState(start, winTypes.horizontal);
          }
        }
      }
    }
  }
  export function isVerticalWin(boardSettings, createWinState,  board, winTypes) {
    const { rows } = boardSettings;
    const { columns } = boardSettings;
    const { empty } = boardSettings.colors;
    for (let column = 0; column < columns; column++) {
      for (let row = 0; row <= rows - 4; row++) {
        let start = getIndex(row, column, boardSettings);
        if (board[start] === empty) continue;
        let counter = 1;
        for (let k = row + 1; k < row + 4; k++) {
          if (board[getIndex(k, column, boardSettings)] === board[start]) {
            counter++;
            if (counter === 4)
              return createWinState(start, winTypes.vertical);
          }
        }
      }
    }
  }
  export function isBackwardsDiagonalWin(boardSettings, createWinState,  board, winTypes) {
    const { rows } = boardSettings;
    const { columns } = boardSettings;
    const { empty } = boardSettings.colors;
    for (let row = 0; row <= rows - 4; row++) {
      for (let column = 0; column <= columns - 4; column++) {
        let start = getIndex(row, column, boardSettings);
        if (board[start] === empty) continue;
        let counter = 1;
        for (let i = 1; i < 4; i++) {
          if (board[getIndex(row + i, column + i, boardSettings)] === board[start]) {
            counter++;
            if (counter === 4)
              return createWinState(start, winTypes.backwardsDiagonal);
          }
        }
      }
    }
  }
  export function isForwardsDiagonalWin(boardSettings, createWinState,  board, winTypes) {
    const { rows } = boardSettings;
    const { columns } = boardSettings;
    const { empty } = boardSettings.colors;
    for (let row = 0; row <= rows - 4; row++) {
      for (let column = 3; column <= columns; column++) {
        let start = getIndex(row, column, boardSettings);
        if (board[start] === empty) continue;
        let counter = 1;
        for (let i = 1; i < 4; i++) {
          if (board[getIndex(row + i, column - i, boardSettings)] === board[start]) {
            counter++;
            if (counter === 4)
              return createWinState(start, winTypes.forwardsDiagonal);
          }
        }
      }
    }
  }