// icon 1 <i class="fa-solid fa-ghost"></i>
// icon 2 <i class="fa-solid fa-user-secret"></i>

function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++){
    board[i] = []
    for (let j = 0; j < columns; j++){
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const playerCell = (column, row, player) => {
    if(board[row][column].getValue() === " ") { 
      board[row][column].claimCell(player)
    }
  }

  const printBoard = () => {
    const boardWithCell = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCell);
  };

  const winner = (player) => {
    if (
  // c1
  board[0][0].getValue() === player && 
  board[0][0].getValue() === player &&
  board[0][0].getValue() === player
  ||
  // c2
  board[0][1].getValue() === player &&
  board[0][1].getValue() === player &&
  board[0][1].getValue() === player
  ||
  // c3
  board[0][2].getValue() === player &&
  board[0][2].getValue() === player &&
  board[0][2].getValue() === player
  ||
  // r1
  board[0][0].getValue() === player &&
  board[0][0].getValue() === player &&
  board[0][0].getValue() === player
  ||
  // r2
  board[1][0].getValue() === player &&
  board[1][0].getValue() === player &&
  board[1][0].getValue() === player
  ||
  // r3
  board[2][0].getValue() === player &&
  board[2][0].getValue() === player &&
  board[2][0].getValue() === player
  ||
  // d1
  board[0][0].getValue() === player &&
  board[1][1].getValue() === player &&
  board[2][2].getValue() === player
  ||
  // d2
  board[2][2].getValue() === player &&
  board[1][1].getValue() === player &&
  board[0][0].getValue() === player
  ) {
    return true
  } else {
    return false
  }
  }

  return { getBoard, playerCell, printBoard, winner }
}

function Cell() {
  let value = " ";
  const claimCell = (player) => {
    value = player;
  };
  const getValue = () => value;
  return {
    claimCell,
    getValue
  };
}

function GameController(
  playerOneName = "player one",
  playerTwoName = "player two"
) {
  const board = GameBoard();

  const players = [
    {
      name: playerOneName,
      token: 1
    },
    {
      name: playerTwoName,
      token: 2
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const playRound = (row, column) => {
    console.log(
      `${getActivePlayer().name} is claiming a spot - R${row}/C${column}...`
    );
    board.playerCell(column, row,  getActivePlayer().token);
    //winning condition here
    if(winner(players[0].token)){
      console.log("p1 wins")
    }
    if(winner(players[1].token)){
      console.log("p2 wins")
    }
    switchPlayerTurn();
    printNewRound();
  };
  printNewRound();

  return {
    playRound,
    getActivePlayer
  }
}

const game = GameController();



// const winner = (player) => {
//   if (
// // c1
// board[0][0].getValue() === player && 
// board[0][0].getValue() === player &&
// board[0][0].getValue() === player
// ||
// // c2
// board[0][1].getValue() === player &&
// board[0][1].getValue() === player &&
// board[0][1].getValue() === player
// ||
// // c3
// board[0][2].getValue() === player &&
// board[0][2].getValue() === player &&
// board[0][2].getValue() === player
// ||
// // r1
// board[0][0].getValue() === player &&
// board[0][0].getValue() === player &&
// board[0][0].getValue() === player
// ||
// // r2
// board[1][0].getValue() === player &&
// board[1][0].getValue() === player &&
// board[1][0].getValue() === player
// ||
// // r3
// board[2][0].getValue() === player &&
// board[2][0].getValue() === player &&
// board[2][0].getValue() === player
// ||
// // d1
// board[0][0].getValue() === player &&
// board[1][1].getValue() === player &&
// board[2][2].getValue() === player
// ||
// // d2
// board[2][2].getValue() === player &&
// board[1][1].getValue() === player &&
// board[0][0].getValue() === player
// ) {
//   return true
// } else {
//   return false
// }
// } 