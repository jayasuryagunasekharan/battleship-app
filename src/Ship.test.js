import { Ship } from './Ship.js';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('should create a ship with correct length', () => {
    expect(ship.length).toBe(3);
  });

  test('should start with 0 hits', () => {
    expect(ship.hits).toBe(0);
  });

  test('should not be sunk initially', () => {
    expect(ship.isSunk()).toBe(false);
  });

  test('should increase hits when hit() is called', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('should be sunk when hits equal length', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('should not be sunk when hits are less than length', () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
}); 