import { Gameboard } from './Gameboard.js';
import { Ship } from './Ship.js';

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('should create an empty 10x10 board', () => {
    expect(gameboard.board.length).toBe(10);
    expect(gameboard.board[0].length).toBe(10);
  });

  test('should place ship horizontally', () => {
    const ship = new Ship(3);
    const result = gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(result).toBe(true);
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[0][1]).toBe(ship);
    expect(gameboard.board[0][2]).toBe(ship);
    expect(gameboard.board[0][3]).toBe(null);
  });

  test('should place ship vertically', () => {
    const ship = new Ship(3);
    const result = gameboard.placeShip(ship, [0, 0], 'vertical');
    expect(result).toBe(true);
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[1][0]).toBe(ship);
    expect(gameboard.board[2][0]).toBe(ship);
    expect(gameboard.board[3][0]).toBe(null);
  });

  test('should not place ship outside boundaries', () => {
    const ship = new Ship(3);
    const result = gameboard.placeShip(ship, [8, 8], 'horizontal');
    expect(result).toBe(false);
  });

  test('should not place ship on occupied cells', () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(2);
    gameboard.placeShip(ship1, [0, 0], 'horizontal');
    const result = gameboard.placeShip(ship2, [0, 1], 'vertical');
    expect(result).toBe(false);
  });

  test('should record missed attack', () => {
    const result = gameboard.receiveAttack([0, 0]);
    expect(result).toBe('miss');
    expect(gameboard.missedAttacks).toContainEqual([0, 0]);
  });

  test('should hit ship and call ship.hit()', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    
    const result = gameboard.receiveAttack([0, 0]);
    expect(result).toBe('hit');
    expect(ship.hits).toBe(1);
  });

  test('should not allow attacking same coordinate twice', () => {
    gameboard.receiveAttack([0, 0]);
    const result = gameboard.receiveAttack([0, 0]);
    expect(result).toBe('invalid');
  });

  test('should detect when all ships are sunk', () => {
    const ship = new Ship(1);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test('should not detect all ships sunk when ships remain', () => {
    const ship = new Ship(2);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.allShipsSunk()).toBe(false);
  });
}); 