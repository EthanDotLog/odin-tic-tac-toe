import {GameBoard, GameController, Cell } from './game.js';

const p1Name = document.getElementById('hunter');
const p2Name = document.getElementById('ghost');
const startBtn = document.getElementById('start-game');
const boardDiv = document.getElementById('board-div');
let game;

startBtn.addEventListener("click", (e) => {
  e.preventDefault()
  console.log(`${p1Name.value} and ${p2Name.value}`);
  game = GameController(p1Name.value, p2Name.value);
  const gameBoard = game.board.getBoard();
  for (let i = 0; i < gameBoard.length; i++){
    for (let j = 0; j < gameBoard[0][0].length; j++){
      
    }
  }
})