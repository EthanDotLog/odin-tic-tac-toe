// icon 1 <i class="fa-solid fa-ghost"></i>
// icon 2 <i class="fa-solid fa-user-secret"></i>

//when called makes the gameBoard and related functions for pulling information
export function GameBoard() {
  //hard coded rows and columns make the grid size, could be changed to passed in variables for other games?
  const rows = 3;
  const columns = 3;
  //empty board object to hold the cells which will be made later
  const board = [];
  //this makes the cells and pushes them into the array. each cell has its own functions that can be called within this factory
  for (let i = 0; i < rows; i++){
    board[i] = []
    for (let j = 0; j < columns; j++){
      board[i].push(Cell());
    }
  }

  //this grabs the board object (which as been made at this point within this object) and returns it to be used later.
  const getBoard = () => board;

  // this function claims a cell if not already claimed by another player
  const playerCell = (column, row, player) => {
    if(board[row][column].getValue() === " ") { 
      board[row][column].claimCell(player)
    }
  }

  //this function prints to board to the console - !!!!!!!!!!!ADD TO THIS SO IT MANIPULATES THE DOM!!!!!!!!!!!
  const printBoard = () => {
    const boardWithCell = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCell);
  };

  //I DONT LIKE THIS - but it is working. this checks for a win condition against passed in player. returns true or false if its a win
  const winner = (player) => {
    if (
      // c1
      board[0][0].getValue() === player && 
      board[0][1].getValue() === player &&
      board[0][2].getValue() === player
      ||
      // c2
      board[1][0].getValue() === player &&
      board[1][1].getValue() === player &&
      board[1][2].getValue() === player
      ||
      // c3
      board[2][0].getValue() === player &&
      board[2][1].getValue() === player &&
      board[2][2].getValue() === player
      ||
      // r1
      board[0][0].getValue() === player &&
      board[1][0].getValue() === player &&
      board[2][0].getValue() === player
      ||
      // r2
      board[0][1].getValue() === player &&
      board[1][1].getValue() === player &&
      board[2][1].getValue() === player
      ||
      // r3
      board[0][2].getValue() === player &&
      board[1][2].getValue() === player &&
      board[2][2].getValue() === player
      ||
      // d1
      board[0][0].getValue() === player &&
      board[1][1].getValue() === player &&
      board[2][2].getValue() === player
      ||
      // d2
      board[0][2].getValue() === player &&
      board[1][1].getValue() === player &&
      board[2][0].getValue() === player
    ) {
      console.log(true)
      return true
    } else {
      console.log(false)
      return false
    }
  }
  //this is allowing me to call it within the game object..... 
  const getWinner = winner;
  return { getBoard, playerCell, printBoard, getWinner }
}

// this makes the cells and returns the values of the cell when called and allows the claiming of spaces
export function Cell() {
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


//makes the game instance = call with the names of the players
export function GameController(
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
    if(board.getWinner(getActivePlayer().token)){
      console.log(`${getActivePlayer().name} wins`)
    }
    switchPlayerTurn();
    printNewRound();
  };
  printNewRound();

  return {
    playRound,
    getActivePlayer,
    board
  }
}
