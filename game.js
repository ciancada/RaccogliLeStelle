const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const gameOverScreen = document.getElementById("game-over");
const gameOverText = document.getElementById("game-over-text");
const finalScore = document.getElementById("final-score");
const playAgain = document.getElementById("play-again");

let score = 0;
let time = 0;
let isGameOver = false;
let intervalId;

// Start the countdown before the game
function startCountdown() {
  let countdown = 3;
  const countdownInterval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText(countdown, canvas.width / 2, canvas.height / 2);
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

  // Update score display
  scoreElement.textContent = `Score: ${score}`;

  // Game logic goes here

  requestAnimationFrame(gameLoop);
}

// End the game
function endGame() {
  isGameOver = true;
  clearInterval(intervalId);
  gameOverScreen.style.display = "block";
  finalScore.textContent = `Score: ${score}`;
}

// Listen for SPACE to start/restart
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && isGameOver) {
    startCountdown();
  }
});

// Initialize game
startCountdown();
