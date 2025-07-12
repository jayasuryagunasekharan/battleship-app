export class Gameboard {
  constructor() {
    this.board = this.createBoard();
    this.missedAttacks = [];
    this.attackedCoordinates = new Set();
  }

  createBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      board[i] = new Array(10).fill(null);
    }
    return board;
  }

  placeShip(ship, coordinates, direction) {
    const [row, col] = coordinates;
    
    // Check if placement is within boundaries
    if (direction === 'horizontal') {
      if (col + ship.length > 10) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col + i] !== null) return false;
      }
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col + i] = ship;
      }
    } else if (direction === 'vertical') {
      if (row + ship.length > 10) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][col] !== null) return false;
      }
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col] = ship;
      }
    }
    
    return true;
  }

  receiveAttack(coordinates) {
    const [row, col] = coordinates;
    const coordString = `${row},${col}`;
    
    // Check if already attacked
    if (this.attackedCoordinates.has(coordString)) {
      return 'invalid';
    }
    
    this.attackedCoordinates.add(coordString);
    
    const target = this.board[row][col];
    if (target === null) {
      this.missedAttacks.push(coordinates);
      return 'miss';
    } else {
      target.hit();
      return 'hit';
    }
  }

  allShipsSunk() {
    const ships = new Set();
    
    // Collect all ships on the board
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (this.board[row][col] !== null) {
          ships.add(this.board[row][col]);
        }
      }
    }
    
    // Check if all ships are sunk
    return Array.from(ships).every(ship => ship.isSunk());
  }
} 