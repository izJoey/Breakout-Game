const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let ballSpeed;
let xBall = 2;
let yBall = 2;
let score = 0;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

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
// Ball Draw
function ballDraw() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px ";
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

//Ball
const ball = document.createElement("div");
ball.classList.add("ball");
ballDraw();
grid.appendChild(ball);

// Ball Move
function ballMove() {
  ballCurrentPosition[0] += xBall;
  ballCurrentPosition[1] += yBall;
  ballDraw();
  checkCollisions();
}

ballSpeed = setInterval(ballMove, 20);

//Check Collisions
function checkCollisions() {
  // blocks
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      ballDirection();
      score++;
      scoreDisplay.innerHTML = score;

      // win
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = "YOU WIN!";
        clearInterval(ballSpeed);
        document.removeEventListener("keydown", userMove);
      }
    }
  }
  //wall
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    ballDirection();
  }
  // user collisions
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    ballDirection();
  }
  if (ballCurrentPosition[1] <= 0) {
    // game over
    clearInterval(ballSpeed);
    scoreDisplay.innerHTML = "Game Over";
    document.removeEventListener("keydown", userMove);
  }
}

function ballDirection() {
  if (xBall === 2 && yBall === 2) {
    yBall = -2;
    return;
  }
  if (xBall === 2 && yBall === -2) {
    xBall = -2;
    return;
  }
  if (xBall === -2 && yBall === -2) {
    yBall = 2;
    return;
  }
  if (xBall === -2 && yBall === 2) {
    xBall = 2;
    return;
  }
}
