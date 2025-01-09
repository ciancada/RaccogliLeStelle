// Configurazione del canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Dimensioni del canvas
canvas.width = 800; // Larghezza
canvas.height = 600; // Altezza

// Oggetto giocatore (quadrato verde)
const player = {
  x: canvas.width / 2 - 15, // Posizione iniziale
  y: canvas.height / 2 - 15,
  size: 30, // Dimensioni
  color: "green", // Colore
  speed: 5, // Velocità
};

// Array di nemici (quadrati gialli)
const enemies = [];
const enemySize = 10;

// Variabili di stato
let score = 0;
let time = 60; // Tempo in secondi
let gameInterval;

// Genera nemici casualmente
function generateEnemies() {
  for (let i = 0; i < 20; i++) {
    enemies.push({
      x: Math.random() * (canvas.width - enemySize),
      y: Math.random() * (canvas.height - enemySize),
      size: enemySize,
      color: "yellow",
    });
  }
}

// Disegna un quadrato
function drawSquare(square) {
  ctx.fillStyle = square.color;
  ctx.fillRect(square.x, square.y, square.size, square.size);
}

// Controlla collisioni tra due quadrati
function checkCollision(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}

// Gestisce il movimento del giocatore
function movePlayer(direction) {
  if (direction === "ArrowUp" && player.y > 0) player.y -= player.speed;
  if (direction === "ArrowDown" && player.y < canvas.height - player.size)
    player.y += player.speed;
  if (direction === "ArrowLeft" && player.x > 0) player.x -= player.speed;
  if (direction === "ArrowRight" && player.x < canvas.width - player.size)
    player.x += player.speed;
}

// Aggiorna il gioco
function updateGame() {
  // Cancella il canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Disegna il giocatore
  drawSquare(player);

  // Disegna i nemici
  enemies.forEach((enemy, index) => {
    drawSquare(enemy);

    // Controlla collisione con il giocatore
    if (checkCollision(player, enemy)) {
      enemies.splice(index, 1); // Rimuove il nemico colpito
      score += 10; // Incrementa il punteggio
    }
  });

  // Mostra il punteggio e il tempo
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
  ctx.fillText(`Time: ${time}`, 10, 40);
}

// Timer del gioco
function startTimer() {
  gameInterval = setInterval(() => {
    time--;
    if (time <= 0) {
      clearInterval(gameInterval);
      alert(`Tempo scaduto! Punteggio finale: ${score}`);
    }
  }, 1000);
}

// Avvia il gioco
function startGame() {
  generateEnemies();
  startTimer();
  setInterval(updateGame, 1000 / 60); // Aggiorna a 60 FPS
}

// Ascolta i tasti premuti per il movimento
window.addEventListener("keydown", (e) => movePlayer(e.key));

// Inizia il gioco
startGame();
