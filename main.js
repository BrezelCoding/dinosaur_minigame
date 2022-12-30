const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let timer = 0;
let cactusArray = [];

/* 1초에 60번 코드 실행하기 */
function gameExcute() {
  requestAnimationFrame(gameExcute);
  timer++;

  /* 애니메이션 잔상 없애주는 clearRect */
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 120 === 0) {
    const cactus = new Cactus();
    cactusArray.push(cactus);
  }
  cactusArray.forEach((cactus) => {
    cactus.x--;
    cactus.draw();
  });

  dino.draw();
}

gameExcute();
