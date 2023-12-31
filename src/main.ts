import { distance, handleCircleCollision } from './physics';
import { randomFloat, randomInt } from './random';
import './style.css';

type Ball = {
  radius: number,
  x: number,
  y: number,
  vx: number,
  vy: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number
};

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext('2d')!;
document.querySelector('#app')!.append(canvas);
canvas.addEventListener('pointerdown', onMouseDown);

const balls: Ball[] = [
  {
    radius: 90,
    x: 100,
    y: 100,
    vx: -2,
    vy: 3,
    fillColor: 'pink',
    strokeColor: 'darkred',
    strokeWidth: 8
  },
  {
    radius: 65,
    x: canvas.width - 100,
    y: 100,
    vx: 1,
    vy: -3,
    fillColor: 'lightgreen',
    strokeColor: 'darkgreen',
    strokeWidth: 8
  },
  {
    radius: 40,
    x: canvas.width - 100,
    y: canvas.height - 100,
    vx: 2,
    vy: -2,
    fillColor: 'lightblue',
    strokeColor: 'darkcyan',
    strokeWidth: 8
  },
  {
    radius: 50,
    x: 100,
    y: canvas.height - 100,
    vx: -1,
    vy: 2,
    fillColor: 'yellow',
    strokeColor: 'darkorange',
    strokeWidth: 8
  },
  {
    radius: 75,
    x: 500,
    y: canvas.height - 100,
    vx: -1,
    vy: 3,
    fillColor: 'violet',
    strokeColor: 'darkviolet',
    strokeWidth: 8
  },
  {
    radius: 30,
    x: 450,
    y: canvas.height - 400,
    vx: 1,
    vy: 2,
    fillColor: 'deepmagenta',
    strokeColor: 'deeppink',
    strokeWidth: 8
  },
  {
    radius: 40,
    x: 250,
    y: canvas.height - 50,
    vx: -2,
    vy: 2,
    fillColor: 'darkorange',
    strokeColor: 'red',
    strokeWidth: 8
  },
  {
    radius: 100,
    x: 700,
    y: canvas.height - 200,
    vx: -1,
    vy: -1,
    fillColor: 'lightbrown',
    strokeColor: 'brown',
    strokeWidth: 8
  },
  {
    radius: 35,
    x: 800,
    y: canvas.height - 500,
    vx: -1,
    vy: 2,
    fillColor: 'cyan',
    strokeColor: 'blue',
    strokeWidth: 8
  },
  {
    radius: 55,
    x: 650,
    y: canvas.height - 450,
    vx: -2,
    vy: 1,
    fillColor: 'blue',
    strokeColor: 'lightgreen',
    strokeWidth: 8
  },
];

gameLoop();

gameLoop();

function onMouseDown(e: PointerEvent) {

  for (let i = 0; i < balls.length; i++) {
    const d = distance(balls[i], { x: e.offsetX, y: e.offsetY });
    if (d < balls[i].radius) {
      balls.splice(i, 1);
      return;
    }
  }

  //add ball
  balls.push({
    radius: randomInt(40, 70),
    x: e.offsetX,
    y: e.offsetY,
    vx: randomFloat(-10, 10),
    vy: randomFloat(-10, 10),
    fillColor: 'red',
    strokeColor: 'black',
    strokeWidth: 8
  })
};

function gameLoop() {
  requestAnimationFrame(gameLoop);
  update();
  render();
}

function update() {
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];

    ball.x += ball.vx;
    ball.y += ball.vy;

    // Check right edge collision
    if (ball.x + ball.radius >= canvas.width) {
      ball.vx = -ball.vx;
      ball.x = canvas.width - ball.radius;
    }

    // Check left edge collision
    if (ball.x - ball.radius <= 0) {
      ball.vx = -ball.vx;
      ball.x = ball.radius;
    }

    // Check top edge collision
    if (ball.y - ball.radius <= 0) {
      ball.vy = -ball.vy;
      ball.y = ball.radius;
    }

    // Check bottom edge collision
    if (ball.y + ball.radius >= canvas.height) {
      ball.vy = -ball.vy;
      ball.y = canvas.height - ball.radius;
    }

    for (let j = i + 1; j < balls.length; j++) {
      handleCircleCollision(ball, balls[j]);
    }
  }
}
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    drawCircle(ball.x, ball.y, ball.radius, ball.fillColor, ball.strokeColor, ball.strokeWidth);
  };

}

function drawCircle(x: number, y: number, radius: number, fillColor: string, strokeColor: string, strokeWidth: number) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);

  context.fillStyle = fillColor;
  context.fill();

  context.lineWidth = strokeWidth;
  context.strokeStyle = strokeColor;
  context.stroke();
}

