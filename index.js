const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;

const userStart = [230, 10];
let currentPosition = userStart;

// Block
class Block {
  constructor(x, y) {
    this.bottomLeft = [x, y];
    this.bottomRight = [x + blockWidth, y];
    this.topLeft = [x, y + blockHeight];
    this.topRight = [x + blockWidth, y + blockHeight];
  }
}
// Enemies Blocks
const blocks = [
  // Frist Row
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];
// Block Visual
function blockVisual() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

blockVisual();

// User
const user = document.createElement("div");
user.classList.add("user");
userDraw();
grid.appendChild(user);

// User Draw
function userDraw() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

// User Movement
function userMove(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        userDraw();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        userDraw();
      }
      break;
  }
}

document.addEventListener("keydown", userMove);
