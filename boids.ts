import { Vector2 } from "../lib/vector2";

const canvas: HTMLCanvasElement = document.createElement("canvas");
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 800;

document.body.appendChild(canvas);

const BOIDS_COUNT = 150;
let BOID_SPEED = 4;
const BOID_SIZE = 10;
const BOID_SENSOR_RADIUS = 60;
const BOID_OBSTACLE_SENSOR_RADIUS = 20;
const BOID_MIN_DISTANCE = 40;
const SENSOR_STEP_COUNT = 6;
const SENSOR_STEP_SIZE = 15;
const OBSTACLE_BORDER = 10;

let separationPower = 0.3;
let alignmentPower = 0.3;
let cohesionPower = 0.3;

const tick = () => {
  render();
  update();
  requestAnimationFrame(tick);
};

const update = () => {
  flock.update();

  // for (const obstacle of obstacles) {
  //   obstacle.update();
  // }
};

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0007";
  for (const obstacle of obstacles) {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
  }

  flock.render();
};

class Boid {
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2 = new Vector2();
  isSpecial = false;

  constructor(position: Vector2, velocity: Vector2) {
    this.position = position;
    this.velocity = velocity;
  }

  update() {
    const { x, y } = this.position;

    this.velocity = Vector2.add(this.velocity, this.acceleration);
    this.velocity = Vector2.setMagnitude(
      this.velocity,
      Math.min(Vector2.magnitude(this.velocity), BOID_SPEED)
    );
    this.position = Vector2.add(this.position, this.velocity);

    if (this.position.x < 0) {
      this.position.x += canvas.width;
    }
    if (this.position.y < 0) {
      this.position.y += canvas.height;
    }
    if (this.position.x > canvas.width) {
      this.position.x -= canvas.width;
    }
    if (this.position.y > canvas.height) {
      this.position.y -= canvas.height;
    }

    this.acceleration = new Vector2();
  }

  render() {
    const { x, y } = this.position;
    const { isSpecial } = this;

    // ctx.beginPath();
    // ctx.arc(x, y, 5, 0, Math.PI * 2);
    // ctx.closePath();
    // ctx.fill();

    const dot = 1 * this.velocity.x + 0 * this.velocity.y;
    const det = 1 * this.velocity.y - 0 * this.velocity.x;
    let angle = Math.atan2(det, dot);
    // console.log(angle);
    if (angle < 0) {
      angle = Math.PI * 2 + angle;
    }

    const dir = Vector2.setMagnitude(
      this.velocity,
      BOID_OBSTACLE_SENSOR_RADIUS
    );

    if (isSpecial) {
      ctx.beginPath();
      ctx.arc(x, y, BOID_SENSOR_RADIUS, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = "#d3f1ed77";
      ctx.fill();

      const sensorPositions = [dir];

      ctx.strokeStyle = "green";
      for (let i = 1; i <= SENSOR_STEP_COUNT; i++) {
        {
          const angleDiff = (Math.PI / 180) * (i * SENSOR_STEP_SIZE);
          const cs = Math.cos(angleDiff);
          const sn = Math.sin(angleDiff);
          const dir2 = new Vector2(
            dir.x * cs - dir.y * sn,
            dir.x * sn + dir.y * cs
          );
          sensorPositions.push(dir2);
        }
        {
          const angleDiff = -(Math.PI / 180) * (i * SENSOR_STEP_SIZE);
          const cs = Math.cos(angleDiff);
          const sn = Math.sin(angleDiff);
          const dir2 = new Vector2(
            dir.x * cs - dir.y * sn,
            dir.x * sn + dir.y * cs
          );
          sensorPositions.push(dir2);
        }
      }
      for (const pos of sensorPositions) {
        const inBounds = canMoveForward(x + pos.x, y + pos.y);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + pos.x, y + pos.y);
        ctx.closePath();
        ctx.strokeStyle = inBounds ? "green" : "red";
        ctx.stroke();
      }
    }

    // console.log(angle);

    // const base = Vector2.add(
    //   this.position,
    //   Vector2.setMagnitude(new Vector2(1, 0), 30)
    // );

    // ctx.beginPath();
    // ctx.moveTo(x, y);
    // ctx.arc(x, y, 30, 0, angle);
    // ctx.moveTo(x, y);
    // ctx.closePath();
    // ctx.fillStyle = "yellow";
    // ctx.fill();

    // ctx.beginPath();
    // ctx.moveTo(x, y);
    // ctx.lineTo(base.x, base.y);
    // ctx.closePath();
    // ctx.strokeStyle = "black";
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(x, y);
    // ctx.lineTo(dir.x, dir.y);
    // ctx.closePath();
    // ctx.strokeStyle = "#0f09";
    // ctx.stroke();

    ctx.fillStyle = isSpecial ? "#ed1b56" : "#00a2ff";

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.translate(-x, -y);

    ctx.beginPath();
    ctx.moveTo(x + BOID_SIZE, y);
    ctx.lineTo(x - BOID_SIZE, y + BOID_SIZE / 2);
    ctx.lineTo(x - BOID_SIZE, y - BOID_SIZE / 2);
    ctx.closePath();

    ctx.fill();

    ctx.restore();
  }
}

class Flock {
  boids: Boid[] = [];
  obstacles: Obstacle[] = [];
  constructor() {
    const boids: Boid[] = [];

    for (let i = 0; i < BOIDS_COUNT; ++i) {
      const pos = new Vector2(
        randInt(0, canvas.width),
        randInt(0, canvas.height)
      );
      const vel = Vector2.setMagnitude(
        new Vector2(rand(-1, 1), rand(-1, 1)),
        BOID_SPEED
      );

      boids.push(new Boid(pos, vel));
    }

    // boids[0].isSpecial = true;

    this.boids = boids;
  }

  update() {
    for (const boid of this.boids) {
      const localBoids: Boid[] = [];

      for (const other of this.boids) {
        if (boid === other) continue;

        const direction = Vector2.subtract(other.position, boid.position);
        const d2 = Vector2.magnitudeSq(direction);

        if (d2 < BOID_SENSOR_RADIUS * BOID_SENSOR_RADIUS) {
          localBoids.push(other);
        }
      }

      if (localBoids.length) {
        // cohesion
        {
          let avgPosition = new Vector2();
          for (const b of localBoids) {
            avgPosition = Vector2.add(b.position, avgPosition);
          }
          avgPosition = Vector2.mult(avgPosition, 1 / localBoids.length);
          const dir = Vector2.subtract(avgPosition, boid.position);
          boid.acceleration = Vector2.add(
            boid.acceleration,
            Vector2.setMagnitude(dir, cohesionPower)
          );
        }

        // separation
        for (const b of localBoids) {
          const dir = Vector2.subtract(boid.position, b.position);
          const d2 = Vector2.magnitudeSq(dir);
          if (d2 > BOID_MIN_DISTANCE * BOID_MIN_DISTANCE) {
            continue;
          }
          var distMultiplier = 1 - d2 / (BOID_MIN_DISTANCE * BOID_MIN_DISTANCE);
          boid.acceleration = Vector2.add(
            boid.acceleration,
            Vector2.setMagnitude(dir, distMultiplier * separationPower)
          );
        }

        // alignment
        let avgVelocity = new Vector2();
        for (const b of localBoids) {
          avgVelocity = Vector2.add(avgVelocity, b.velocity);
        }
        avgVelocity = Vector2.mult(avgVelocity, 1 / localBoids.length);
        boid.acceleration = Vector2.add(
          boid.acceleration,
          Vector2.setMagnitude(avgVelocity, alignmentPower)
        );
      }

      // obstacles
      {
        const { x, y } = boid.position;
        const dir = Vector2.setMagnitude(
          boid.velocity,
          BOID_OBSTACLE_SENSOR_RADIUS
        );
        const inBounds = canMoveForward(x + dir.x, y + dir.y);
        let avoidObstacleSteer = null;

        if (!inBounds) {
          for (let i = 1; i <= SENSOR_STEP_COUNT; i++) {
            {
              const angleDiff = (Math.PI / 180) * (i * SENSOR_STEP_SIZE);
              const cs = Math.cos(angleDiff);
              const sn = Math.sin(angleDiff);
              const dir2 = new Vector2(
                dir.x * cs - dir.y * sn,
                dir.x * sn + dir.y * cs
              );
              if (canMoveForward(x + dir2.x, y + dir2.y)) {
                avoidObstacleSteer = Vector2.subtract(dir2, boid.velocity);
                break;
              }
            }
            {
              const angleDiff = -(Math.PI / 180) * (i * SENSOR_STEP_SIZE);
              const cs = Math.cos(angleDiff);
              const sn = Math.sin(angleDiff);
              const dir2 = new Vector2(
                dir.x * cs - dir.y * sn,
                dir.x * sn + dir.y * cs
              );
              if (canMoveForward(x + dir2.x, y + dir2.y)) {
                avoidObstacleSteer = Vector2.subtract(dir2, boid.velocity);
                break;
              }
            }
          }
        }

        if (avoidObstacleSteer) {
          avoidObstacleSteer = Vector2.setMagnitude(avoidObstacleSteer, 2);
          boid.acceleration = Vector2.add(
            boid.acceleration,
            avoidObstacleSteer
          );
        }
      }
    }

    for (const boid of this.boids) {
      boid.update();
    }
  }

  render() {
    for (const boid of this.boids) {
      boid.render();
    }
  }
}

interface Obstacle {}

class RectangleObstacle implements Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  dx: 1;
  dy: 1;
  constructor(x, y, w, h, dx, dy) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.dx = dx;
    this.dy = dy;
  }

  update() {
    // this.y += this.dy;
    // this.x += this.dx;
    // if (this.y < 20 || this.y + this.h > canvas.height - 20) {
    //   this.dy *= -1;
    // }
    // if (this.x < 20 || this.x + this.w > canvas.width - 20) {
    //   this.dx *= -1;
    // }
  }
}

const obstacles = [];
obstacles.push(
  new RectangleObstacle(40, 40, 100, 300, rand(-2, 2), rand(-2, 2))
);
obstacles.push(
  new RectangleObstacle(250, 200, 150, 150, rand(-2, 2), rand(-2, 2))
);
obstacles.push(
  new RectangleObstacle(450, 400, 150, 150, rand(-2, 2), rand(-2, 2))
);
obstacles.push(
  new RectangleObstacle(750, 220, 100, 150, rand(-2, 2), rand(-2, 2))
);
obstacles.push(
  new RectangleObstacle(650, 650, 200, 100, rand(-2, 2), rand(-2, 2))
);

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function canMoveForward(x: number, y: number) {
  if (
    x < OBSTACLE_BORDER ||
    y < OBSTACLE_BORDER ||
    x > canvas.width - OBSTACLE_BORDER ||
    y > canvas.height - OBSTACLE_BORDER
  ) {
    return false;
  }
  for (const obstacle of obstacles) {
    if (isColliding(x, y, obstacle)) {
      return false;
    }
  }
  return true;
}

function isColliding(x, y, obstacle: Obstacle): boolean {
  if (obstacle instanceof RectangleObstacle) {
    const l = obstacle.x - OBSTACLE_BORDER;
    const t = obstacle.y - OBSTACLE_BORDER;
    const r = obstacle.x + obstacle.w + OBSTACLE_BORDER;
    const b = obstacle.y + obstacle.h + OBSTACLE_BORDER;

    return !(x < l || y < t || x > r || y > b);
  }

  return false;
}

(document.getElementById("separation") as HTMLInputElement).addEventListener(
  "input",
  (e) => {
    separationPower = e.target.value;
  }
);

(document.getElementById("alignment") as HTMLInputElement).addEventListener(
  "input",
  (e) => {
    alignmentPower = e.target.value;
  }
);

(document.getElementById("cohesion") as HTMLInputElement).addEventListener(
  "input",
  (e) => {
    cohesionPower = e.target.value;
  }
);

(document.getElementById("speed") as HTMLInputElement).addEventListener(
  "input",
  (e) => {
    BOID_SPEED = e.target.value;
  }
);

const flock = new Flock();

tick();
