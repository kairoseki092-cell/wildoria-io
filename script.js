const menu = document.getElementById("menu");
const playBtn = document.getElementById("playBtn");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let playerColor = "#4CAF50";

document.querySelectorAll(".color").forEach(color => {
  color.addEventListener("click", () => {
    document.querySelectorAll(".color").forEach(c => c.classList.remove("selected"));
    color.classList.add("selected");
    playerColor = color.dataset.color;
  });
});

playBtn.addEventListener("click", () => {
  menu.style.display = "none";
  canvas.style.display = "block";
  startGame();
});

function startGame() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const worldWidth = 3000;
  const worldHeight = 3000;

  let player = {
    x: worldWidth / 2,
    y: worldHeight / 2,
    size: 40,
    speed: 5
  };

  let keys = {};

  document.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
  });

  document.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
  });

  function update() {
    if (keys["w"]) player.y -= player.speed;
    if (keys["s"]) player.y += player.speed;
    if (keys["a"]) player.x -= player.speed;
    if (keys["d"]) player.x += player.speed;

    player.x = Math.max(0, Math.min(worldWidth, player.x));
    player.y = Math.max(0, Math.min(worldHeight, player.y));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cameraX = player.x - canvas.width / 2;
    const cameraY = player.y - canvas.height / 2;

    ctx.save();
    ctx.translate(-cameraX, -cameraY);

    // Fundo
    ctx.fillStyle = "#4c7a4c";
    ctx.fillRect(0, 0, worldWidth, worldHeight);

    // Grid
    ctx.strokeStyle = "rgba(0,0,0,0.1)";
    ctx.lineWidth = 1;
    const gridSize = 50;

    for (let x = 0; x < worldWidth; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, worldHeight);
      ctx.stroke();
    }

    for (let y = 0; y < worldHeight; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(worldWidth, y);
      ctx.stroke();
    }

    // Jogador
    ctx.fillStyle = playerColor;
    ctx.fillRect(
      player.x - player.size / 2,
      player.y - player.size / 2,
      player.size,
      player.size
    );

    ctx.restore();

    // Bordas escuras fora do mapa
    ctx.fillStyle = "rgba(0,0,0,0.4)";

    if (cameraX < 0) {
      ctx.fillRect(0, 0, -cameraX, canvas.height);
    }

    if (cameraY < 0) {
      ctx.fillRect(0, 0, canvas.width, -cameraY);
    }

    if (cameraX + canvas.width > worldWidth) {
      ctx.fillRect(worldWidth - cameraX, 0, canvas.width, canvas.height);
    }

    if (cameraY + canvas.height > worldHeight) {
      ctx.fillRect(0, worldHeight - cameraY, canvas.width, canvas.height);
    }
  }

  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}
