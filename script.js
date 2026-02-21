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

  // Mundo grande
  const worldWidth = 3000;
  const worldHeight = 3000;

  // Jogador posição no mundo
  let player = {
    x: worldWidth / 2,
    y: worldHeight / 2,
    size: 40,
    speed: 5
  };

  let keys = {};

  document.addEventListener("keydown", e => keys[e.key] = true);
  document.addEventListener("keyup", e => keys[e.key] = false);

  function update() {
    if (keys["w"]) player.y -= player.speed;
    if (keys["s"]) player.y += player.speed;
    if (keys["a"]) player.x -= player.speed;
    if (keys["d"]) player.x += player.speed;

    // Limites do mapa
    player.x = Math.max(0, Math.min(worldWidth, player.x));
    player.y = Math.max(0, Math.min(worldHeight, player.y));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Câmera centraliza no jogador
    const cameraX = player.x - canvas.width / 2;
    const cameraY = player.y - canvas.height / 2;

    ctx.save();
    ctx.translate(-cameraX, -cameraY);

    // ===== Desenhar mapa =====
    ctx.fillStyle = "#4c7a4c";
    ctx.fillRect(0, 0, worldWidth, worldHeight);

    // ===== Desenhar jogador =====
    ctx.fillStyle = playerColor;
    ctx.fillRect(
      player.x - player.size / 2,
      player.y - player.size / 2,
      player.size,
      player.size
    );

    ctx.restore();

    requestAnimationFrame(gameLoop);
  }

  function gameLoop() {
    update();
    draw();
  }

  gameLoop();
}
