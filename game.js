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

  draw() 
