export class UIManager {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.playerBoard = null;
    this.computerBoard = null;
    this.statusDisplay = null;
    this.resetButton = null;
    this.rulesButton = null;
    this.rulesModal = null;
    this.isRulesVisible = false;
  }

  initialize() {
    this.createGameContainer();
    this.createBoards();
    this.createStatusDisplay();
    this.createControls();
    this.createRulesModal();
    this.renderBoards();
    this.updateStatus();
  }

  createGameContainer() {
    const container = document.createElement('div');
    container.className = 'game-container';
    container.innerHTML = `
      <h1>Battleship</h1>
      <div class="boards-container"></div>
      <div class="status-container"></div>
      <div class="controls-container"></div>
    `;
    document.body.appendChild(container);
  }

  createBoards() {
    const boardsContainer = document.querySelector('.boards-container');
    
    // Player board
    const playerSection = document.createElement('div');
    playerSection.className = 'board-section';
    playerSection.innerHTML = `
      <h2>Your Board</h2>
      <div class="board player-board"></div>
    `;
    
    // Computer board
    const computerSection = document.createElement('div');
    computerSection.className = 'board-section';
    computerSection.innerHTML = `
      <h2>Enemy Board</h2>
      <div class="board computer-board"></div>
    `;
    
    boardsContainer.appendChild(playerSection);
    boardsContainer.appendChild(computerSection);
    
    this.playerBoard = document.querySelector('.player-board');
    this.computerBoard = document.querySelector('.computer-board');
  }

  createStatusDisplay() {
    const statusContainer = document.querySelector('.status-container');
    this.statusDisplay = document.createElement('div');
    this.statusDisplay.className = 'status-display';
    statusContainer.appendChild(this.statusDisplay);
  }

  createControls() {
    const controlsContainer = document.querySelector('.controls-container');
    
    // Create buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';
    
    // Reset button
    this.resetButton = document.createElement('button');
    this.resetButton.textContent = 'New Game';
    this.resetButton.className = 'control-button reset-button';
    this.resetButton.addEventListener('click', () => {
      this.gameManager.resetGame();
      this.renderBoards();
      this.updateStatus();
    });
    
    // Rules button
    this.rulesButton = document.createElement('button');
    this.rulesButton.textContent = '📖 Rules';
    this.rulesButton.className = 'control-button rules-button';
    this.rulesButton.addEventListener('click', () => {
      this.toggleRules();
    });
    
    buttonsContainer.appendChild(this.resetButton);
    buttonsContainer.appendChild(this.rulesButton);
    controlsContainer.appendChild(buttonsContainer);
  }

  createRulesModal() {
    this.rulesModal = document.createElement('div');
    this.rulesModal.className = 'rules-modal';
    this.rulesModal.innerHTML = `
      <div class="rules-content">
        <div class="rules-header">
          <h2>🚢 Battleship Game Rules</h2>
          <button class="close-rules">×</button>
        </div>
        <div class="rules-body">
          <div class="rules-section">
            <h3>🎯 Objective</h3>
            <p>Sink all of your opponent's ships before they sink yours.</p>
          </div>
          
          <div class="rules-section">
            <h3>⚙️ Setup</h3>
            <ul>
              <li><strong>Board Size:</strong> 10×10 grid (A1 to J10)</li>
              <li><strong>Ships:</strong> Each player has 5 ships of different sizes:</li>
            </ul>
            <div class="ship-info">
              <div class="ship-item">
                <div class="ship-visual carrier"></div>
                <span>Carrier (5 squares)</span>
              </div>
              <div class="ship-item">
                <div class="ship-visual battleship"></div>
                <span>Battleship (4 squares)</span>
              </div>
              <div class="ship-item">
                <div class="ship-visual cruiser"></div>
                <span>Cruiser (3 squares)</span>
              </div>
              <div class="ship-item">
                <div class="ship-visual submarine"></div>
                <span>Submarine (3 squares)</span>
              </div>
              <div class="ship-item">
                <div class="ship-visual destroyer"></div>
                <span>Destroyer (2 squares)</span>
              </div>
            </div>
          </div>
          
          <div class="rules-section">
            <h3>📋 Ship Placement Rules</h3>
            <ul>
              <li><strong>Placement:</strong> Ships can be placed horizontally or vertically</li>
              <li><strong>No Overlap:</strong> Ships cannot overlap or touch each other</li>
              <li><strong>Within Boundaries:</strong> Ships must fit completely on the board</li>
              <li><strong>Hidden:</strong> Players cannot see each other's ship placements</li>
            </ul>
          </div>
          
          <div class="rules-section">
            <h3>🎮 Gameplay</h3>
            <ul>
              <li><strong>Turns:</strong> Players take turns attacking</li>
              <li><strong>Attacking:</strong> Click on a coordinate to attack</li>
              <li><strong>Results:</strong></li>
            </ul>
            <div class="result-examples">
              <div class="result-item">
                <div class="cell hit"></div>
                <span>Hit - You hit an enemy ship</span>
              </div>
              <div class="result-item">
                <div class="cell miss"></div>
                <span>Miss - No ship at that location</span>
              </div>
            </div>
            <ul>
              <li><strong>Sinking:</strong> A ship is sunk when all its squares are hit</li>
              <li><strong>Win Condition:</strong> First player to sink all enemy ships wins</li>
            </ul>
          </div>
          
          <div class="rules-section">
            <h3>💡 Strategy Tips</h3>
            <ul>
              <li><strong>Spread Out:</strong> Don't cluster your ships together</li>
              <li><strong>Pattern Recognition:</strong> Look for patterns in hits to find ship locations</li>
              <li><strong>Elimination:</strong> Once you hit a ship, target adjacent squares</li>
              <li><strong>Tracking:</strong> Keep track of your hits and misses</li>
            </ul>
          </div>
          
          <div class="rules-section">
            <h3>🎯 How to Play This App</h3>
            <ol>
              <li><strong>Start:</strong> The game automatically sets up ships</li>
              <li><strong>Your Turn:</strong> Click on the enemy board to attack</li>
              <li><strong>Computer Turn:</strong> Computer automatically responds</li>
              <li><strong>Continue:</strong> Take turns until someone wins</li>
              <li><strong>New Game:</strong> Click "New Game" button to restart</li>
            </ol>
          </div>
        </div>
      </div>
    `;
    
    // Add close functionality
    const closeButton = this.rulesModal.querySelector('.close-rules');
    closeButton.addEventListener('click', () => {
      this.toggleRules();
    });
    
    // Close on outside click
    this.rulesModal.addEventListener('click', (e) => {
      if (e.target === this.rulesModal) {
        this.toggleRules();
      }
    });
    
    document.body.appendChild(this.rulesModal);
  }

  toggleRules() {
    this.isRulesVisible = !this.isRulesVisible;
    if (this.isRulesVisible) {
      this.rulesModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      this.rulesModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  renderBoards() {
    this.renderBoard(this.playerBoard, this.gameManager.player.gameboard, true);
    this.renderBoard(this.computerBoard, this.gameManager.computer.gameboard, false);
  }

  renderBoard(boardElement, gameboard, showShips) {
    boardElement.innerHTML = '';
    
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        
        const coordString = `${row},${col}`;
        const hasBeenAttacked = gameboard.attackedCoordinates.has(coordString);
        
        if (hasBeenAttacked) {
          if (gameboard.board[row][col] === null) {
            cell.classList.add('miss');
          } else {
            cell.classList.add('hit');
          }
        } else if (showShips && gameboard.board[row][col] !== null) {
          cell.classList.add('ship');
        }
        
        if (!showShips) {
          cell.addEventListener('click', (e) => this.handleCellClick(row, col));
        }
        
        boardElement.appendChild(cell);
      }
    }
  }

  handleCellClick(row, col) {
    if (this.gameManager.isGameOver() || this.gameManager.getCurrentPlayer() !== this.gameManager.player) {
      return;
    }

    const result = this.gameManager.makePlayerMove([row, col]);
    
    if (result) {
      this.renderBoards();
      this.updateStatus();
      
      // Add delay for computer move
      if (!this.gameManager.isGameOver()) {
        setTimeout(() => {
          this.renderBoards();
          this.updateStatus();
        }, 500);
      }
    }
  }

  updateStatus() {
    if (this.gameManager.isGameOver()) {
      const winner = this.gameManager.getWinner();
      this.statusDisplay.textContent = `Game Over! ${winner.name} wins!`;
      this.statusDisplay.className = 'status-display game-over';
    } else {
      const currentPlayer = this.gameManager.getCurrentPlayer();
      this.statusDisplay.textContent = `${currentPlayer.name}'s turn`;
      this.statusDisplay.className = 'status-display';
    }
  }
} 