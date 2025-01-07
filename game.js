// Variabili principali
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 375, y: 550, size: 50, color: "green" };
let stars = [];
let score = 0;
let timeLeft = 40;
let gameOver = false;

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
  } else {
    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
    ctx.fillText(`Score: ${score}`, canvas.width / 2 - 80, canvas.height / 2 + 50);
  }
}

// Gestione del movimento del giocatore
document.addEventListener("keydown", (e) => {
  if (!gameOver) {
    if (e.key === "ArrowLeft" && player.x > 0) player.x -= 10;
    if (e.key === "ArrowRight" && player.x < canvas.width - player.size) player.x += 10;
    if (e.key === "ArrowUp" && player.y > 0) player.y -= 10;
    if (e.key === "ArrowDown" && player.y < canvas.height - player.size) player.y += 10;

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
  }

  // Restart con SPACE
  if (e.key === " " && gameOver) {
    score = 0;
    timeLeft = 40;
    gameOver = false;
    createStars(5);
  }
});

// Loop del gioco
function gameLoop() {
  updateGame();
  requestAnimationFrame(gameLoop);
}

// Inizializza il gioco
createStars(5);
gameLoop();
