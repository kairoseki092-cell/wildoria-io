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

  let x = canvas.width / 2;
  let y = canvas.height / 2;

  document.addEventListener("keydown", (e) => {
    if (e.key === "w") y -= 10;
    if (e.key === "s") y += 10;
    if (e.key === "a") x -= 10;
    if (e.key === "d") x += 10;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = playerColor;
    ctx.fillRect(x, y, 50, 50);
    requestAnimationFrame(draw);
  }

  draw();
}
