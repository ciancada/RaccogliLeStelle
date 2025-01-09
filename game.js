const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let squareSize = 30;
let playerSize = squareSize * 2;
let fieldSize = 400;
let score = 0;
let timeLeft = 40;
let isPlaying = false;
let countdown = 3;

let player = {
  x: 0,
  y: 0,
  speed: 5
};

let squares = [];

function drawSquare(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

function init() {
  player.x = fieldSize / 2 - playerSize / 2;
  player.y = fieldSize / 2 - playerSize / 2;
  generateSquares();
  score = 0;
  timeLeft = 40;
  isPlaying = true;
  requestAnimationFrame(update);
}

function generateSquares() {
  squares = [];
  for (let i = 0; i < 20; i++) {
    squares.push({
      x: Math.random() * (fieldSize - squareSize),
      y: Math.random() * (fieldSize - squareSize)
    });
  }
}

function update() {
  if (isPlaying) {
    ctx.clearRect(0, 0, fieldSize, fieldSize);

    drawSquare(player.x, player.y, playerSize, 'green');

    squares.forEach(square => {
      drawSquare(square.x, square.y, squareSize, 'yellow');
    });

    // Gestisci il movimento del giocatore, collisioni, ecc.
    // ...

    timeLeft--;
    if (timeLeft <= 0) {
      isPlaying = false;
      ctx.font = '30px Arial';
      ctx.fillText('GAME OVER', canvas.width / 2 - 100, canvas.height / 2);
      ctx.fillText('Score: ' + score, canvas.width / 2 - 50, canvas.height / 2 + 30);
    }

    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
    ctx.fillText('Time: ' + timeLeft, 10, 40);

    requestAnimationFrame(update);
  }
}

let keysPressed = {};
document.addEventListener('keydown', (event) => {
  keysPressed[event.key] = true;
});
document.addEventListener('keyup', (event) => {
  delete keysPressed[event.key];
});

init();
