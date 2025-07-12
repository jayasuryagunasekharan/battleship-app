import { Player } from './Player.js';
import { Gameboard } from './Gameboard.js';

describe('Player', () => {
  let player;

  beforeEach(() => {
    player = new Player('Human');
  });

  test('should create a player with a name', () => {
    expect(player.name).toBe('Human');
  });

  test('should have a gameboard', () => {
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test('should be able to make a move', () => {
    const opponent = new Player('Computer');
    const result = player.makeMove([0, 0], opponent);
    expect(result).toBe('miss');
  });

  test('should not be able to make invalid moves', () => {
    const opponent = new Player('Computer');
    player.makeMove([0, 0], opponent);
    const result = player.makeMove([0, 0], opponent);
    expect(result).toBe('invalid');
  });

  test('should be able to make random moves as computer', () => {
    const computerPlayer = new Player('Computer', true);
    const opponent = new Player('Human');
    
    // Make several random moves
    for (let i = 0; i < 5; i++) {
      const result = computerPlayer.makeRandomMove(opponent);
      expect(['hit', 'miss']).toContain(result);
    }
  });

  test('should not make moves on already attacked coordinates', () => {
    const computerPlayer = new Player('Computer', true);
    const opponent = new Player('Human');
    
    // Attack all coordinates
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        computerPlayer.makeMove([row, col], opponent);
      }
    }
    
    // Should not be able to make more moves
    const result = computerPlayer.makeRandomMove(opponent);
    expect(result).toBe('no_moves_left');
  });
}); 