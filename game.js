const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");

let player;
let obstacles = [];
let score = 0;
let time = 0;
let isGameOver = false;
let intervalId;

// Classe del giocatore
class Player {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speed = 5;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  move(dx, dy) {
    this.x += dx * this.speed;
    this.y += dy * this.speed;

    // Limiti del canvas
    this.x = Math.max(0, Math.min(canvas.width - this.size, this.x));
    this.y = Math.max(0, Math.min(canvas.height - this.size, this.y));
  }
}

// Classe degli ostacoli
class Obstacle {
  constructor(x, y, size, color, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speed = speed;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = -this.size;
      this.x = Math.random() * (canvas.width - this.size);
    }
  }

  checkCollision(player) {
    return (
      this.x < player.x + player.size &&
      this.x + this.size > player.x &&
      this.y < player.y + player.size &&
      this.y + this.size > player.y
    );
  }
}

// Inizializzazione del gioco
function initializeGame() {
  player = new Player(canvas.width / 2 - 15, canvas.height - 50, 30, "blue");
  obstacles = [];
  for (let i = 0; i < 5; i++) {
    obstacles.push(
      new Obstacle(
        Math.random() * (canvas.width - 20),
        Math.random() * -canvas.height,
        20,
        "red",
        2 + Math.random() * 3
      )
    );
  }
}

// Start the countdown before the game
function startCountdown() {
  let countdown = 3;
  const countdownInterval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText(countdown > 0 ? countdown : "GO!", canvas.width / 2, canvas.height / 2);
    countdown--;

    if (countdown < 0) {
      clearInterval(countdownInterval);
      startGame();
    }
  }, 1000);
}

// Start the game
function startGame() {
  score = 0;
  time = 0;
  isGameOver = false;
  gameOverScreen.style.display = "none";
  initializeGame();
  intervalId = setInterval(updateTime, 1000);
  gameLoop();
}

// Update the time
function updateTime() {
  if (!isGameOver) {
    time++;
    timeElement.textContent = `Time: ${time}`;
  }
}

// Game loop
function gameLoop() {
  if (isGameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Disegna il giocatore e gli ostacoli
  player.draw();
  obstacles.forEach((obstacle) => {
    obstacle.draw();
    obstacle.update();

    // Controlla le collisioni
    if (obstacle.checkCollision(player)) {
      endGame();
    }
  });

  // Aggiorna il punteggio
  score++;
  scoreElement.textContent = `Score: ${score}`;

  requestAnimationFrame(gameLoop);
}

// End the game
function endGame() {
  isGameOver = true;
  clearInterval(intervalId);
  gameOverScreen.style.display = "block";
  finalScore.textContent = `Score: ${score}`;
}

// Gestione input da tastiera
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") player.move(0, -1);
  if (event.code === "ArrowDown") player.move(0, 1);
  if (event.code === "ArrowLeft") player.move(-1, 0);
  if (event.code === "ArrowRight") player.move(1, 0);

  // Inizia o riavvia il gioco con la barra spaziatrice
  if (event.code === "Space" && isGameOver) {
    startCountdown();
  }
});

// Inizializza il conto alla rovescia
startCountdown();
