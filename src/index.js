import { GameManager } from './GameManager.js';
import { UIManager } from './UIManager.js';
import '../style.css';

document.addEventListener('DOMContentLoaded', () => {
  const gameManager = new GameManager();
  const uiManager = new UIManager(gameManager);
  
  gameManager.initializeGame();
  uiManager.initialize();
}); 