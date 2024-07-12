let board;
let boardWidth = 1000;
let boardHeight = 550;
let ctx;

//mario
let marioX = boardWidth / 8;
let marioY = boardHeight / 1.5;
let marioWidth = 42; //21x22
let marioHeight = 44;
let marioImg;
let marioImgRun;

let mario = {
  x: marioX,
  y: marioY,
  width: marioWidth,
  height: marioHeight,
  jumping: false,
  moving: false,
  falling: false,
  runCycle: 0
};

//physics
let moveSpeed = 2.5;
let jumpVel = 0;
let moveVel = 0;
let gravity = 0.4;
let friction = 0.7;
let keys = [];

//game
let score = 0;

window.onload = function () {
  board = document.getElementById("myCanvas");
  board.height = boardHeight;
  board.width = boardWidth;
  ctx = board.getContext("2d");

  //mario
  marioImg = new Image();
  marioImg.src =
    "https://raw.githubusercontent.com/booyaalex/bootleg-mario-thing/main/images/Mario/mario_idle.png";
  marioImg.onload = function () {
    ctx.drawImage(marioImg, mario.x, mario.y, mario.width, mario.height);
  };

  //test block
  //ctx.fillStyle = "red";
  //ctx.fillRect(0, 0, 25, 25);

  requestAnimationFrame(update);
  document.addEventListener("keydown", marioMove);
  document.addEventListener("keyup", marioStop);
};

function update() {
  requestAnimationFrame(update);
  ctx.clearRect(0, 0, boardWidth, boardHeight);

  //Sprites
  if (mario.jumping) {
    mario.width = marioWidth;
    marioImg.src =
      "../images/Mario/mario_jump.png";
    if (jumpVel >= 0) {
      mario.jumping = false;
      mario.falling = true;
    }
  } else if (mario.falling) {
    mario.width = marioWidth;
    marioImg.src =
      "../images/Mario/mario_jump.png";
    if (mario.y >= boardHeight / 1.5) {
      mario.falling = false;
    }
  } else if (mario.moving) {
    mario.width = marioWidth / 1.3;
    if (mario.runCycle < 1) {
      mario.runCycle = 1;
    } else if (Math.trunc(mario.runCycle) >= 5) {
      mario.runCycle = 1;
    }
    marioImg.src =
      "../images/Mario/mario_run" +
      Math.trunc(mario.runCycle) +
      ".png";
    mario.runCycle = mario.runCycle + 0.25;
  } else {
    mario.width = marioWidth;
    mario.runCycle = 0;
    marioImg.src =
      "../images/Mario/mario_idle.png";
  }

  //Movement
  if (keys[65] || keys[37]) {
    mario.moving = true;
    if (moveVel > -moveSpeed) {
      moveVel--;
    }
  }
  if (keys[68] || keys[39]) {
    mario.moving = true;
    if (moveVel < moveSpeed) {
      moveVel++;
    }
  }
  moveVel *= friction;
  mario.x += moveVel;

  //Jumping
  if (keys[32] || keys[38]) {
    if (!mario.jumping && !mario.falling) {
      mario.jumping = true;
      jumpVel = -10;
    }
  }

  jumpVel += gravity;
  mario.y = Math.min(mario.y + jumpVel, boardHeight / 1.5);

  ctx.drawImage(marioImg, mario.x, mario.y, mario.width, mario.height);

  //text
  ctx.font = "12px Arial";
  ctx.fillText("jumpVel: " + jumpVel, 0, 10);
  ctx.fillText("falling: " + mario.falling, 0, 20);
  ctx.fillText("jumping: " + mario.jumping, 0, 30);
  ctx.fillText("runCycle: " + Math.trunc(mario.runCycle), 0, 40);
  ctx.fillText("xPos: " + mario.x, 0, 50);
  ctx.fillText("moving: " + mario.moving, 0, 60);
  ctx.fillText("moveVel: " + moveVel, 0, 70);
}

function marioMove(e) {
  keys[e.keyCode] = true;
}

function marioStop(e) {
  keys[e.keyCode] = false;
  mario.moving = false;
}
