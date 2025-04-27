const prompt = require('prompt-sync')();

let board = Array(9).fill(null);
let turn = "p1";
let hasWinner = false;

const winningPatterns = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const checkWin = (board, mark) => {
  return winningPatterns.some(pattern => 
    pattern.every(pos => board[pos - 1] === mark)
  );
};

const pick = (turn) => {
  const mark = turn === "p1" ? "X" : "O";
  let pos = Number(prompt(`Player ${turn} - Enter the position (1-9): `));

  if (pos < 1 || pos > 9 || isNaN(pos)) {
    console.log("Choose from 1-9 only. Try again!\n");
    return turn;
  } else if (board[pos - 1] !== null) {
    console.log("Spot already taken. Try again.\n");
    return turn;
  }

  board[pos - 1] = mark;
  console.log(board);
  console.log();

  if (checkWin(board, mark)) {
    console.log(`Player ${turn} wins!`);
    return null;
  }

  return turn === "p1" ? "p2" : "p1";
};

while (board.includes(null)) {
  turn = pick(turn);
  if (!turn) {
    hasWinner = true;
    break;
  };
}

if (!board.includes(null) && !hasWinner) {
  console.log("The game ended in a draw!");
}