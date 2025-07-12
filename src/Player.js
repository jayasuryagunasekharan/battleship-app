import { Gameboard } from './Gameboard.js';

export class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.isComputer = isComputer;
  }

  makeMove(coordinates, opponent) {
    return opponent.gameboard.receiveAttack(coordinates);
  }

  makeRandomMove(opponent) {
    const availableMoves = [];
    
    // Find all available coordinates
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const coordString = `${row},${col}`;
        if (!opponent.gameboard.attackedCoordinates.has(coordString)) {
          availableMoves.push([row, col]);
        }
      }
    }
    
    if (availableMoves.length === 0) {
      return 'no_moves_left';
    }
    
    // Choose random move
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const randomMove = availableMoves[randomIndex];
    
    return this.makeMove(randomMove, opponent);
  }
} 