const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let squareSize = 30; // Dimensione del quadrato giallo
let playerSize = squareSize * 2;
let fieldSize = 400; // Dimensione del campo di gioco
let score = 0;
let timeLeft = 40;
let isPlaying = false;
let countdown = 3;

// Posizione e velocità del giocatore
let player = {
    x: 0,
    y: 0,
    speed: 5
};

// Array per i quadrati gialli
let squares = [];

// Funzione per disegnare un quadrato
function drawSquare(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

// Funzione per inizializzare il gioco
function init() {
  // ... (codice esistente)

  // Genera i quadrati gialli iniziali
  generateSquares();
}

// Funzione per generare i quadrati gialli
function generateSquares() {
  squares = [];
  for (let i = 0; i < 20; i++) {
    squares.push({
      x: Math.random() * (fieldSize - squareSize),
      y: Math.random() * (fieldSize - squareSize)
    });
  }
}

// Funzione per aggiornare il gioco
function update() {
  // ... (codice esistente)

  // Gestisci il movimento del giocatore
  if (keysPressed.left) player.x -= player.speed;
  if (keysPressed.right) player.x += player.speed;
  if (keysPressed.up) player.y -= player.speed;
  if (keysPressed.down) player.y += player.speed;

  // Limita il giocatore all'interno del campo
  player.x = Math.max(0, Math.min(player.x, fieldSize - playerSize));
  player.y = Math.max(0, Math.min(player.y, fieldSize - playerSize));

  // Controlla le collisioni
  squares = squares.filter(square => {
    if (
      player.x < square.x + squareSize &&
      player.x + playerSize > square.x &&
      player.y < square.y + squareSize &&
      player.y + playerSize > square.y
    ) {
      score++;
      return false; // Rimuovi il quadrato colpito dall'array
    }
    return true;
  });
}

// Oggetto per tenere traccia dei tasti premuti
let keysPressed = {};
document.addEventListener('keydown', (event) => {
  keysPressed[event.key] = true;
});
document.addEventListener('keyup', (event) => {
  delete keysPressed[event.key];
});

// ... (resto del codice)
