export function getIndex(row, column, boardSettings) {
  const index = row * boardSettings.columns + column;
  if (index > boardSettings.rows * boardSettings.colums) return null;
  return index;
}

// Create the play board
export function createBoard(boardSettings) {
  return new Array(boardSettings.rows * boardSettings.columns).fill(
    boardSettings.colors.empty
  );
}

//Get the first cell of the winning position
export function getRowAndColumn(index, boardSettings) {
  if (index > boardSettings.rows * boardSettings.colums) return null;
  const row = Math.floor(index / boardSettings.columns);
  const column = Math.floor(index % boardSettings.columns);
  return {
    row,
    column,
  };
}

//creat grid columns
export function getGridCols(boardSettings) {
  let gridTemplateColumns = "";
  for (let i = 0; i < boardSettings.columns; i++) {
    gridTemplateColumns += "auto ";
  }
  return gridTemplateColumns;
}

// Check for horizontal win
export function isHorizontalWin(
  boardSettings,
  createWinState,
  board,
  winTypes
) {
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
          if (counter === 4) return createWinState(start, winTypes.horizontal);
        }
      }
    }
  }
}

// Check for vertical win
export function isVerticalWin(boardSettings, createWinState, board, winTypes) {
  const { rows } = boardSettings;
  const { columns } = boardSettings;
  const { empty } = boardSettings.colors;
  for (let column = 0; column < columns; column++) {
    for (let row = 0; row <= rows - 4; row++) {
      let start = getIndex(row, column, boardSettings);
      if (board[start] === empty) continue;
      let counter = 1;
      for (let k = row + 1; k < row + 4; k++) {
        // console.log(board[getIndex(k, column, boardSettings)], board[start])
        if (board[getIndex(k, column, boardSettings)] === board[start]) {
          counter++;
          if (counter === 4) return createWinState(start, winTypes.vertical);
        }
      }
    }
  }
}

// Check for diagonal win - backwards
export function isBackwardsDiagonalWin(
  boardSettings,
  createWinState,
  board,
  winTypes
) {
  const { rows } = boardSettings;
  const { columns } = boardSettings;
  const { empty } = boardSettings.colors;
  for (let row = 0; row <= rows - 4; row++) {
    for (let column = 0; column <= columns - 4; column++) {
      let start = getIndex(row, column, boardSettings);
      if (board[start] === empty) continue;
      let counter = 1;
      for (let i = 1; i < 4; i++) {
        if (
          board[getIndex(row + i, column + i, boardSettings)] === board[start]
        ) {
          counter++;
          if (counter === 4)
            return createWinState(start, winTypes.backwardsDiagonal);
        }
      }
    }
  }
}

// Check for diagonal win - forward
export function isForwardsDiagonalWin(
  boardSettings,
  createWinState,
  board,
  winTypes
) {
  const { rows } = boardSettings;
  const { columns } = boardSettings;
  const { empty } = boardSettings.colors;
  for (let row = 0; row <= rows - 4; row++) {
    for (let column = 3; column <= columns; column++) {
      let start = getIndex(row, column, boardSettings);
      if (board[start] === empty) continue;
      let counter = 1;
      for (let i = 1; i < 4; i++) {
        if (
          board[getIndex(row + i, column - i, boardSettings)] === board[start]
        ) {
          counter++;
          if (counter === 4)
            return createWinState(start, winTypes.forwardsDiagonal);
        }
      }
    }
  }
}
