// Configurazione del canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

// Colori e dimensioni
const PLAYER_SIZE = 40; // Dimensione del giocatore
const STAR_SIZE = 20; // Dimensione delle stelle
const PLAYER_SPEED = 3; // Velocità del giocatore
const NUM_STARS = 10; // Numero di stelle
let score = 0;
let timeLeft = 40; // Timer iniziale in secondi

// Elementi HTML
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");

// Inizializzazione del giocatore
const player = {
  x: canvas.width / 2 - PLAYER_SIZE / 2,
  y: canvas.height / 2 - PLAYER_SIZE / 2,
  width: PLAYER_SIZE,
  height: PLAYER_SIZE,
  color: "green",
};

// Inizializzazione delle stelle
const stars = [];
for (let i = 0; i < NUM_STARS; i++) {
  stars.push({
    x: Math.random() * (canvas.width - STAR_SIZE),
    y: Math.random() * (canvas.height - STAR_SIZE),
    width: STAR_SIZE,
    height: STAR_SIZE,
    color: "yellow",
  });
}

// Movimento del giocatore
const keys = {};
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

// Funzione per disegnare il rettangolo
function drawRect(rect) {
  ctx.fillStyle = rect.color;
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}

// Controllo collisione
function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

// Aggiornamento del gioco
function update() {
  // Movimento del giocatore
  if (keys["ArrowUp"] && player.y > 0) player.y -= PLAYER_SPEED;
  if (keys["ArrowDown"] && player.y + player.height < canvas.height)
    player.y += PLAYER_SPEED;
  if (keys["ArrowLeft"] && player.x > 0) player.x -= PLAYER_SPEED;
  if (keys["ArrowRight"] && player.x + player.width < canvas.width)
    player.x += PLAYER_SPEED;

  // Controllo collisioni con le stelle
  stars.forEach((star, index) => {
    if (isColliding(player, star)) {
      stars.splice(index, 1); // Rimuovi la stella
      score += 10; // Incrementa il punteggio
      scoreElement.textContent = `Score: ${score}`;
    }
  });
}

// Disegno del gioco
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Disegna il giocatore
  drawRect(player);

  // Disegna le stelle
  stars.forEach((star) => drawRect(star));
}

// Timer del gioco
const timer = setInterval(() => {
  timeLeft--;
  timeElement.textContent = `Time: ${timeLeft}`;
  if (timeLeft <= 0) {
    clearInterval(timer);
    alert(`Game Over! Your score is ${score}`);
    window.location.reload();
  }
}, 1000);

// Ciclo di gioco
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
