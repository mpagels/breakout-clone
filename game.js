const canvas = document.querySelector("#canvas");
canvas.width = 500;
canvas.height = 600;
const ctx = canvas.getContext("2d");

let movePlattform = 0;
const PLATTFORM_SPEED = 20;
const PLATTFORM_SPEED_RIGHT = PLATTFORM_SPEED;
const PLATTFORM_SPEED_LEFT = PLATTFORM_SPEED * -1;
const plattform = {
  x: 180,
  y: 580,
  sizeX: 100,
  sizeY: 10,
};
const block = {
  x: 20,
  y: 20,
  sizeX: 100,
  sizeY: 20,
};
const allBlocks = [block];
let x = block.x;
let y = block.y;

let counter = 1;
while (counter < 16) {
  x += 120;
  if (counter % 4 === 0) {
    x = 20;
    y += 40;
  }
  allBlocks.push({
    x,
    y,
    sizeX: 100,
    sizeY: 20,
  });
  counter++;
}

// plattform
ctx.fillStyle = "red";
ctx.fillRect(plattform.x, plattform.y, plattform.sizeX, plattform.sizeY);

// ball
ctx.beginPath();
let ballStartX = 250;
let ballStartY = 170;
ctx.arc(ballStartX, ballStartY, 10, 0, 2 * Math.PI);
ctx.fillStyle = "green";
ctx.fill();

const GRAVITY = 4;
const SPEED = -4;

gravity = GRAVITY;
moveX = -3;

main();

function main() {
  ctx.clearRect(0, 0, 500, 600);
  ctx.beginPath();
  ballStartX += moveX;
  ballStartY += gravity;
  ctx.arc(ballStartX, ballStartY, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "green";
  ctx.fill();

  // check if bounce side
  if (ballStartX < 0 && moveX < 0) {
    moveX = 3;
  } else if (ballStartX > 500 && moveX > 0) {
    moveX = -3;
  }
  // check if bounce top
  if (ballStartY < 0) {
    gravity = GRAVITY;
  }
  // build all blocks
  allBlocks.forEach((block, index) => {
    ctx.fillStyle = "black";
    ctx.fillRect(block.x, block.y, block.sizeX, block.sizeY);
    if (
      ballStartY > block.y &&
      ballStartY < block.y + block.sizeY &&
      ballStartX > block.x &&
      ballStartX < block.x + block.sizeX
    ) {
      allBlocks.splice(index, 1);
      console.log("Treffer");
      if (gravity > 0) {
        gravity = GRAVITY * -1;
      } else {
        gravity = GRAVITY;
      }
    }
  });

  plattform.x += movePlattform;
  ctx.fillStyle = "red";
  ctx.fillRect(plattform.x, plattform.y, plattform.sizeX, plattform.sizeY);

  // check if ball bounce from plattform
  if (
    ballStartY > 580 &&
    ballStartX > plattform.x &&
    ballStartX < plattform.x + plattform.sizeX
  ) {
    gravity = GRAVITY * -1;
  }

  movePlattform = 0;
  if (allBlocks.length > 0) {
    if (ballStartY < 610) {
      requestAnimationFrame(main);
    } else {
      ctx.font = "50px Arial";
      ctx.fillStyle = "black";
      ctx.fillText("YOU LOSE!!", 110, 250);
    }
  } else {
    ctx.clearRect(0, 0, 500, 600);
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("YOU WON!!", 120, 250);
  }
}

function buildBlocks() {
  allBlocks.forEach((block) => {
    ctx.fillStyle = "black";
    ctx.fillRect(block.x, block.y, block.sizeX, block.sizeY);
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    movePlattform = PLATTFORM_SPEED_RIGHT;
  } else if (event.key === "ArrowLeft") {
    movePlattform = PLATTFORM_SPEED_LEFT;
  }
});
