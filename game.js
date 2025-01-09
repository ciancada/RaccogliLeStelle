// Variabili principali
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 375, y: 550, size: 50, color: "green" };
let stars = [];
let score = 0;
let timeLeft = 40;
let gameOver = false;

let countdown = 3; // Countdown iniziale
let gameStarted = false; // Controlla se il gioco è iniziato
let keys = {}; // Per il movimento fluido

// Inizializza le stelle
function createStars(num) {
  stars = [];
  for (let i = 0; i < num; i++) {
    stars.push({
      x: Math.random() * (canvas.width - 20),
      y: Math.random() * (canvas.height - 20),
      size: 20,
      color: "yellow",
    });
  }
}

// Disegna rettangoli (giocatore o stelle)
function drawRect(obj) {
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x, obj.y, obj.size, obj.size);
}

// Controlla le collisioni
function isColliding(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}

// Countdown iniziale
function startCountdown() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText(countdown, canvas.width / 2, canvas.height / 2);

  if (countdown > 0) {
    countdown--;
    setTimeout(startCountdown, 1000);
  } else {
    gameStarted = true;
    createStars(5); // Inizia il gioco
    gameLoop();
  }
}

// Aggiorna il gioco
function updateGame() {
  if (timeLeft <= 0) {
    gameOver = true;
  }

  if (!gameOver) {
    // Pulisce lo schermo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Disegna il giocatore e le stelle
    drawRect(player);
    stars.forEach(drawRect);

    // Mostra il punteggio e il timer
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.fillText(`Time: ${Math.ceil(timeLeft)}`, canvas.width - 100, 20);

    // Aggiorna il timer
    timeLeft -= 1 / 60;

    // Movimento del giocatore
    if (keys["ArrowLeft"] && player.x > 0) player.x -= 5;
    if (keys["ArrowRight"] && player.x < canvas.width - player.size) player.x += 5;
    if (keys["ArrowUp"] && player.y > 0) player.y -= 5;
    if (keys["ArrowDown"] && player.y < canvas.height - player.size) player.y += 5;

    // Controlla collisioni con le stelle
    stars.forEach((star, index) => {
      if (isColliding(player, star)) {
        score++;
        stars.splice(index, 1); // Rimuove la stella raccolta
        stars.push({
          x: Math.random() * (canvas.width - 20),
          y: Math.random() * (canvas.height - 20),
          size: 20,
          color: "yellow",
        });
      }
    });
  } else {
    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
    ctx.fillText(`Score: ${score}`, canvas.width / 2 - 80, canvas.height / 2 + 50);
  }
}

// Gestione del movimento del giocatore
document.addEventListener("keydown", (e) => {
  keys[e.key] = true;

  // Restart con SPACE
  if (e.key === " " && gameOver) {
    score = 0;
    timeLeft = 40;
    gameOver = false;
    gameStarted = false;
    countdown = 3;
    startCountdown();
  }
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Loop del gioco
function gameLoop() {
  if (gameStarted) {
    updateGame();
    requestAnimationFrame(gameLoop);
  }
}

// Avvia il countdown iniziale
startCountdown();
