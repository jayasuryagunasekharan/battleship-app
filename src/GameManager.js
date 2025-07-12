import { Player } from './Player.js';
import { Ship } from './Ship.js';

export class GameManager {
  constructor() {
    this.player = new Player('Player');
    this.computer = new Player('Computer', true);
    this.currentPlayer = this.player;
    this.gameOver = false;
    this.winner = null;
    this.ships = [
      { name: 'Carrier', length: 5 },
      { name: 'Battleship', length: 4 },
      { name: 'Cruiser', length: 3 },
      { name: 'Submarine', length: 3 },
      { name: 'Destroyer', length: 2 }
    ];
  }

  initializeGame() {
    this.placeShipsRandomly(this.player);
    this.placeShipsRandomly(this.computer);
  }

  placeShipsRandomly(player) {
    this.ships.forEach(shipData => {
      const ship = new Ship(shipData.length);
      let placed = false;
      
      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        
        placed = player.gameboard.placeShip(ship, [row, col], direction);
      }
    });
  }

  makePlayerMove(coordinates) {
    if (this.gameOver || this.currentPlayer !== this.player) {
      return false;
    }

    const result = this.player.makeMove(coordinates, this.computer);
    
    if (result === 'invalid') {
      return false;
    }

    this.checkGameOver();
    
    if (!this.gameOver) {
      this.currentPlayer = this.computer;
      this.makeComputerMove();
    }

    return result;
  }

  makeComputerMove() {
    if (this.gameOver || this.currentPlayer !== this.computer) {
      return;
    }

    const result = this.computer.makeRandomMove(this.player);
    
    if (result !== 'no_moves_left') {
      this.checkGameOver();
      
      if (!this.gameOver) {
        this.currentPlayer = this.player;
      }
    }
  }

  checkGameOver() {
    if (this.player.gameboard.allShipsSunk()) {
      this.gameOver = true;
      this.winner = this.computer;
    } else if (this.computer.gameboard.allShipsSunk()) {
      this.gameOver = true;
      this.winner = this.player;
    }
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  isGameOver() {
    return this.gameOver;
  }

  getWinner() {
    return this.winner;
  }

  resetGame() {
    this.player = new Player('Player');
    this.computer = new Player('Computer', true);
    this.currentPlayer = this.player;
    this.gameOver = false;
    this.winner = null;
    this.initializeGame();
  }
} 