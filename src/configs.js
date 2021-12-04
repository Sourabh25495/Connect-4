export const boardSettings = {
  rows: 12,
  columns: 12,
  dropAnimationRate: 50,
  flashAnimationRate: 600,
  colors: {
    empty: "#AAAAAA",
    p1: "#BB2222",
    p2: "#2222BB",
  },
};

export const winTypes = {
  vertical: 0,
  horizontal: 1,
  forwardsDiagonal: 2,
  backwardsDiagonal: 3,
};

export const player1Colors = [
  {
    value: "#C61624",
    label: "Red",
  },
  {
    value: "#3BC616",
    label: "Green",
  },
  {
    value: "#1649C6",
    label: "Blue",
  },
];

export const player2Colors = [
  {
    value: "#C66B16",
    label: "Orange",
  },
  {
    value: "#CB1C89",
    label: "Pink",
  },
  {
    value: "#F1E70E",
    label: "Yellow",
  },
];
