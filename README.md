# Battleship Game

A classic Battleship game implementation using Test Driven Development (TDD) with JavaScript ES6 modules.

## Features

- **TDD Implementation**: All core game logic is thoroughly tested
- **Modular Architecture**: Clean separation of concerns with ES6 modules
- **Interactive UI**: Click-based gameplay with visual feedback
- **Computer AI**: Random move generation for computer opponent
- **Responsive Design**: Works on desktop and mobile devices
- **Game State Management**: Proper turn management and win detection

## Project Structure

```
battleship-app/
├── src/
│   ├── Ship.js              # Ship class with hit tracking
│   ├── Gameboard.js         # Gameboard with ship placement and attack logic
│   ├── Player.js            # Player class with move capabilities
│   ├── GameManager.js       # Main game logic and state management
│   ├── UIManager.js         # DOM manipulation and rendering
│   ├── index.js             # Application entry point
│   ├── Ship.test.js         # Ship class tests
│   ├── Gameboard.test.js    # Gameboard class tests
│   └── Player.test.js       # Player class tests
├── index.html               # Main HTML file
├── style.css                # Game styling
├── package.json             # Project dependencies and scripts
├── .babelrc                 # Babel configuration for Jest
└── README.md                # This file
```

## Core Classes

### Ship
- Tracks ship length and hit count
- `hit()` method to register hits
- `isSunk()` method to check if ship is destroyed

### Gameboard
- 10x10 grid for ship placement
- `placeShip()` for ship positioning
- `receiveAttack()` for handling attacks
- `allShipsSunk()` for win condition checking

### Player
- Contains a gameboard
- `makeMove()` for manual moves
- `makeRandomMove()` for computer AI

### GameManager
- Orchestrates game flow
- Manages turns and win conditions
- Handles game initialization and reset

### UIManager
- Renders game boards
- Handles user interactions
- Updates game status display

## Setup and Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Tests**:
   ```bash
   npm test
   ```

3. **Run Tests in Watch Mode**:
   ```bash
   npm run test:watch
   ```

4. **Open in Browser**:
   - Open `index.html` in a web browser
   - Or serve with a local server for ES6 module support

## How to Play

1. **Game Setup**: Ships are automatically placed randomly for both players
2. **Player Turn**: Click on the enemy board to attack coordinates
3. **Computer Turn**: Computer automatically makes its move after a short delay
4. **Game End**: First player to sink all enemy ships wins

## Testing Strategy

The project follows TDD principles:

1. **Ship Tests**: Verify ship creation, hit tracking, and sink detection
2. **Gameboard Tests**: Test ship placement, attack handling, and win conditions
3. **Player Tests**: Validate move capabilities and computer AI

All tests focus on the public interface of each class, ensuring proper encapsulation.

## Technical Details

- **ES6 Modules**: Uses import/export for clean module organization
- **Jest Testing**: Configured with Babel for ES6 support
- **DOM Manipulation**: Pure JavaScript without external libraries
- **Responsive CSS**: Grid-based layout with mobile optimization

## Future Enhancements

Potential improvements for extra credit:
- Drag and drop ship placement
- 2-player mode with device passing
- Smarter computer AI with adjacent targeting
- Sound effects and animations
- Ship rotation controls
- Game statistics tracking 