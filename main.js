'use strict';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let cactusArray = [];
let jumping = false;
let jumpTimer = 0;
let animation;

const dinoImg = new Image();
dinoImg.src = 'dinosaur.png';

const cactusImg = new Image();
cactusImg.src = 'cactus.png';

const dino = {
  x: 50,
  y: 10,
  width: 150,
  height: 150,
  draw() {
    // ctx.fillStyle = 'green';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(dinoImg, this.x, this.y, this.width, this.height);
  },
};

class Cactus {
  constructor() {
    this.x = 800;
    this.y = 200;
    this.width = 70;
    this.height = 90;
  }
  draw() {
    // ctx.fillStyle = 'red';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(cactusImg, this.x, this.y, this.width, this.height);
  }
}

/* 랜덤으로 코드 실행하기 */
function gameExcute() {
  animation = requestAnimationFrame(gameExcute);

  ctx.clearRect(0, 0, canvas.width, canvas.height); // 애니메이션 잔상 없애주는 clearRect

  /* 장애물 */
  let randomTime = Math.floor(Math.random() * 2000);
  if (randomTime % 120 === 0 && randomTime < 1000) {
    const cactus = new Cactus();
    cactusArray.push(cactus);
  }

  cactusArray.forEach((cactus, index, array) => {
    if (cactus.x < -70) {
      // x 좌표가 0 미만이면 제거
      array.splice(index, 1);
    }
    cactus.x--; // 장애물 움직이기
    collision(dino, cactus);
    cactus.draw();
  });

  /* 점프구현 */
  if (jumping == true) {
    dino.y -= 3;
    jumpTimer++;
  }
  if (jumpTimer > 30) {
    jumping = false;
    jumpTimer = 0;
  }
  if (jumping == false) {
    if (dino.y < 150) {
      dino.y += 3;
    }
  }
  dino.draw();
}

gameExcute();

// 충돌감지 collision detection
function collision(dino, cactus) {
  let xGap = cactus.x - (dino.x + dino.width) + 20;
  let yGap = cactus.y - (dino.y + dino.height) + 27;
  if (xGap < 0 && yGap < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
    const gameOver = 'Game Over';
    ctx.font = 'bold 70px verdana';
    ctx.fillStyle = 'cornflowerblue';
    ctx.fillText(gameOver, 180, 200);
  }
}

/* 스페이스바 누르면 점프 */
document.addEventListener('keydown', function (e) {
  if (e.code === 'Space') {
    jumping = true;
  }
});
