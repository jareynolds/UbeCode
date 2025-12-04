// Stick Figure Fighting Game - Main JavaScript

// Game State
const gameState = {
  currentScreen: 'main-menu',
  currentPlayer: null,
  player1: null,
  player2: null,
  gameStarted: false,
  // Animation state for arm swings
  player1AttackAnim: 0, // 0 = no animation, 0-1 = animation progress
  player2AttackAnim: 0
};

// DOM Elements
const screens = {
  mainMenu: document.getElementById('main-menu'),
  characterCreation: document.getElementById('character-creation'),
  gameArena: document.getElementById('game-arena'),
  gameOver: document.getElementById('game-over')
};

// Screen Management
function showScreen(screenId) {
  document.querySelectorAll('.game-screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
  gameState.currentScreen = screenId;
}

// Character Preview
function updateCharacterPreview() {
  const canvas = document.getElementById('character-preview');
  const ctx = canvas.getContext('2d');
  const color = document.getElementById('body-color').value;
  const headSize = parseInt(document.getElementById('head-size').value);
  const bodyHeight = parseInt(document.getElementById('body-height').value);

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw stick figure
  const centerX = canvas.width / 2;
  const startY = 30;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;

  // Head
  ctx.beginPath();
  ctx.arc(centerX, startY + headSize, headSize, 0, Math.PI * 2);
  ctx.fill();

  // Body
  const bodyStart = startY + headSize * 2;
  ctx.beginPath();
  ctx.moveTo(centerX, bodyStart);
  ctx.lineTo(centerX, bodyStart + bodyHeight);
  ctx.stroke();

  // Arms
  const armY = bodyStart + bodyHeight * 0.3;
  ctx.beginPath();
  ctx.moveTo(centerX, armY);
  ctx.lineTo(centerX - 30, armY + 20);
  ctx.moveTo(centerX, armY);
  ctx.lineTo(centerX + 30, armY + 20);
  ctx.stroke();

  // Legs
  const legStart = bodyStart + bodyHeight;
  ctx.beginPath();
  ctx.moveTo(centerX, legStart);
  ctx.lineTo(centerX - 20, legStart + 40);
  ctx.moveTo(centerX, legStart);
  ctx.lineTo(centerX + 20, legStart + 40);
  ctx.stroke();
}

// Create Character
function createCharacter() {
  const character = {
    name: document.getElementById('player-name').value || `Player ${gameState.currentPlayer}`,
    color: document.getElementById('body-color').value,
    headSize: parseInt(document.getElementById('head-size').value),
    bodyHeight: parseInt(document.getElementById('body-height').value),
    health: 100,
    x: gameState.currentPlayer === 1 ? 150 : 650,
    y: 300
  };

  if (gameState.currentPlayer === 1) {
    gameState.player1 = character;
    // Reset form for player 2
    document.getElementById('player-name').value = '';
    document.getElementById('body-color').value = '#ff0000';
    document.getElementById('current-player-title').textContent = 'Player 2 - Create Your Stick Figure';
    gameState.currentPlayer = 2;
    updateCharacterPreview();
  } else {
    gameState.player2 = character;
    startGame();
  }
}

// Start Game
function startGame() {
  gameState.gameStarted = true;

  // Update player names in UI
  document.getElementById('player1-name').textContent = gameState.player1.name;
  document.getElementById('player2-name').textContent = gameState.player2.name;

  showScreen('game-arena');
  initGameCanvas();
  startGameLoop();
}

// Game Canvas
let gameCanvas, gameCtx;
let keys = {};

function initGameCanvas() {
  gameCanvas = document.getElementById('game-canvas');
  gameCtx = gameCanvas.getContext('2d');
}

function drawStickFigure(player, facingRight = true, attackAnim = 0) {
  const ctx = gameCtx;
  const { x, y, color, headSize, bodyHeight } = player;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;

  // Head
  ctx.beginPath();
  ctx.arc(x, y - bodyHeight - headSize, headSize, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.beginPath();
  ctx.moveTo(x, y - bodyHeight);
  ctx.lineTo(x, y);
  ctx.stroke();

  // Arms
  const armY = y - bodyHeight * 0.7;
  const armDir = facingRight ? 1 : -1;

  // Calculate attacking arm position based on animation progress
  // Animation: 0 = rest position, 0.5 = fully extended, 1 = returning to rest
  let attackProgress = attackAnim <= 0.5 ? attackAnim * 2 : (1 - attackAnim) * 2;
  const restX = 25;
  const restY = -10;
  const extendedX = 50; // Extend further forward
  const extendedY = 0; // Straighten out

  const attackArmX = x + ((restX + (extendedX - restX) * attackProgress) * armDir);
  const attackArmY = armY + (restY + (extendedY - restY) * attackProgress);

  ctx.beginPath();
  // Back arm (non-attacking)
  ctx.moveTo(x, armY);
  ctx.lineTo(x - 25, armY + 15);
  // Front arm (attacking) - animated
  ctx.moveTo(x, armY);
  ctx.lineTo(attackArmX, attackArmY);
  ctx.stroke();

  // Legs
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - 20, y + 40);
  ctx.moveTo(x, y);
  ctx.lineTo(x + 20, y + 40);
  ctx.stroke();
}

function drawGame() {
  // Clear canvas
  gameCtx.fillStyle = '#f0f0f0';
  gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  // Draw ground
  gameCtx.fillStyle = '#8B4513';
  gameCtx.fillRect(0, 350, gameCanvas.width, 50);

  // Draw players
  if (gameState.player1) {
    drawStickFigure(gameState.player1, true, gameState.player1AttackAnim);
  }
  if (gameState.player2) {
    drawStickFigure(gameState.player2, false, gameState.player2AttackAnim);
  }
}

function updateHealth(playerNum, health) {
  const healthBar = document.getElementById(`player${playerNum}-health`);
  healthBar.style.width = `${health}%`;
  healthBar.textContent = health;

  if (health > 50) {
    healthBar.className = 'progress-bar bg-success';
  } else if (health > 25) {
    healthBar.className = 'progress-bar bg-warning';
  } else {
    healthBar.className = 'progress-bar bg-danger';
  }
}

function checkCollision() {
  const p1 = gameState.player1;
  const p2 = gameState.player2;
  return Math.abs(p1.x - p2.x) < 50;
}

function handleAttack(attacker, defender, attackerNum) {
  // Trigger attack animation
  if (attackerNum === 1) {
    gameState.player1AttackAnim = 0.01; // Start animation
  } else {
    gameState.player2AttackAnim = 0.01; // Start animation
  }

  if (checkCollision()) {
    const damage = Math.floor(Math.random() * 10) + 5;
    defender.health = Math.max(0, defender.health - damage);
    updateHealth(attackerNum === 1 ? 2 : 1, defender.health);

    if (defender.health <= 0) {
      endGame(attackerNum);
    }
  }
}

function endGame(winnerNum) {
  gameState.gameStarted = false;
  const winner = winnerNum === 1 ? gameState.player1 : gameState.player2;
  document.getElementById('winner-announcement').textContent = `${winner.name} Wins!`;
  showScreen('game-over');
}

function gameLoop() {
  if (!gameState.gameStarted) return;

  // Player 1 controls (WASD + Space)
  if (keys['a'] && gameState.player1.x > 30) {
    gameState.player1.x -= 5;
  }
  if (keys['d'] && gameState.player1.x < gameCanvas.width - 30) {
    gameState.player1.x += 5;
  }

  // Player 2 controls (Arrow keys + Enter)
  if (keys['ArrowLeft'] && gameState.player2.x > 30) {
    gameState.player2.x -= 5;
  }
  if (keys['ArrowRight'] && gameState.player2.x < gameCanvas.width - 30) {
    gameState.player2.x += 5;
  }

  // Update attack animations
  const animSpeed = 0.05; // Controls animation speed (higher = faster)

  if (gameState.player1AttackAnim > 0) {
    gameState.player1AttackAnim += animSpeed;
    if (gameState.player1AttackAnim >= 1) {
      gameState.player1AttackAnim = 0; // Reset animation
    }
  }

  if (gameState.player2AttackAnim > 0) {
    gameState.player2AttackAnim += animSpeed;
    if (gameState.player2AttackAnim >= 1) {
      gameState.player2AttackAnim = 0; // Reset animation
    }
  }

  drawGame();
}

function startGameLoop() {
  setInterval(gameLoop, 1000 / 60); // 60 FPS
}

// Reset Game
function resetGame() {
  gameState.player1 = null;
  gameState.player2 = null;
  gameState.currentPlayer = null;
  gameState.gameStarted = false;
  gameState.player1AttackAnim = 0;
  gameState.player2AttackAnim = 0;

  // Reset health bars
  updateHealth(1, 100);
  updateHealth(2, 100);

  showScreen('main-menu');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Player selection buttons
  document.getElementById('player1-btn').addEventListener('click', () => {
    gameState.currentPlayer = 1;
    document.getElementById('current-player-title').textContent = 'Player 1 - Create Your Stick Figure';
    document.getElementById('body-color').value = '#0000ff';
    showScreen('character-creation');
    updateCharacterPreview();
  });

  document.getElementById('player2-btn').addEventListener('click', () => {
    gameState.currentPlayer = 2;
    document.getElementById('current-player-title').textContent = 'Player 2 - Create Your Stick Figure';
    document.getElementById('body-color').value = '#ff0000';
    showScreen('character-creation');
    updateCharacterPreview();
  });

  // Character creation
  document.getElementById('create-character-btn').addEventListener('click', createCharacter);

  // Character preview updates
  document.getElementById('body-color').addEventListener('input', updateCharacterPreview);
  document.getElementById('head-size').addEventListener('input', updateCharacterPreview);
  document.getElementById('body-height').addEventListener('input', updateCharacterPreview);

  // Game over buttons
  document.getElementById('play-again-btn').addEventListener('click', resetGame);
  document.getElementById('main-menu-btn').addEventListener('click', resetGame);

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    keys[e.key] = true;

    // Attack controls
    if (e.key === ' ' && gameState.gameStarted) {
      handleAttack(gameState.player1, gameState.player2, 1);
    }
    if (e.key === 'Enter' && gameState.gameStarted) {
      handleAttack(gameState.player2, gameState.player1, 2);
    }
  });

  document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
  });
});
