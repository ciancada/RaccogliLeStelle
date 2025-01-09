const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player;
let stars = [];
let score = 0;
let time = 0;
let isGameOver = false;
let countdown = 3;
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

// Classe delle stelle
class Star {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  isCollected(player) {
    return (
      player.x < this.x + this.size &&
      player.x + player.size > this.x &&
      player.y < this.y + this.size &&
      player.y + player.size > this.y
    );
  }
}

// Funzione per inizializzare il gioco
function initGame() {
  player = new Player(400, 300, 30, "green");
  stars = Array.from({ length: 10 }, () => new Star(
    Math.random() * (canvas.width - 20),
    Math.random() * (canvas.height - 20),
    20,
    "yellow"
  ));
  score = 0;
  time = 0;
  countdown = 3;
  isGameOver = false;
  clearInterval(intervalId);
  intervalId = setInterval(updateTime, 1000);
}

// Funzione per aggiornare il timer
function updateTime() {
  if (countdown > 0) {
    countdown--;
  } else {
    time++;
  }
}

// Funzione per disegnare il campo di gioco
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Disegna il countdown iniziale
  if (countdown > 0) {
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText(countdown, canvas.width / 2, canvas.height / 2);
    return;
  }

  // Disegna il giocatore e le stelle
  player.draw();
  stars.forEach(star => star.draw());

  // Disegna il punteggio e il tempo
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.fillText(`Score: ${score}`, 10, 20);
  ctx.textAlign = "right";
  ctx.fillText(`Time: ${time}`, canvas.width - 10, 20);
}

// Funzione per aggiornare lo stato del gioco
function update() {
  if (isGameOver) return;

  // Controlla se il giocatore raccoglie una stella
  stars.forEach((star, index) => {
    if (star.isCollected(player)) {
      score++;
      stars[index] = new Star(
        Math.random() * (canvas.width - 20),
        Math.random() * (canvas.height - 20),
        20,
        "yellow"
      );
    }
  });

  draw();
}

// Gestione input per muovere il giocatore
const keys = {};
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

function gameLoop() {
  if (keys["ArrowUp"]) player.move(0, -1);
  if (keys["ArrowDown"]) player.move(0, 1);
  if (keys["ArrowLeft"]) player.move(-1, 0);
  if (keys["ArrowRight"]) player.move(1, 0);

  update();

  if (isGameOver) {
    showGameOverScreen();
    return;
  }

  requestAnimationFrame(gameLoop);
}

// Mostra la schermata di fine partita
function showGameOverScreen() {
  ctx.fillStyle = "red";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
  ctx.fillText("Press SPACE to play", canvas.width / 2, canvas.height / 2 + 60);
}

// Inizia o resetta il gioco
window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    if (isGameOver || countdown > 0) {
      initGame();
      gameLoop();
    }
  }
});

// Inizializza il gioco
initGame();
gameLoop();
