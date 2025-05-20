import p5 from "p5";
import type { Line } from "./Line";

export class Circle {
  pos: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  radius = 50;

  constructor(p: p5, position: p5.Vector, velocity = p.createVector(0, 0)) {
    this.pos = position;
    this.velocity = velocity;
    this.acceleration = p.createVector(0, 1);
  }

  draw(p: p5) {
    p.circle(this.pos.x, this.pos.y, this.radius * 2);
  }

  update(p: p5, boundaries: Line[]) {
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);

    for (let boundary of boundaries) {
      if (this.isColliding(p, boundary)) {
        this.velocity.mult(-0.5);
      }
    }
  }

  goto(p: p5, x: number, y: number) {
    this.pos = p.createVector(x, y);
  }

  private isColliding(p: p5, wall: Line) {
    const { x: x1, y: y1 } = wall.a;
    const { x: x2, y: y2 } = wall.b;

    const [closestX, closestY] = this.linePoint(
      p,
      this.pos.x,
      this.pos.y,
      x1,
      y1,
      x2,
      y2
    );

    const onSegment = this.linePoint(p, x1, y1, x2, y2, closestX, closestY);
    if (!onSegment) return false;

    const distance = p.dist(this.pos.x, this.pos.y, closestX, closestY);

    return distance < this.radius;
  }

  private linePoint(
    p: p5,
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    const dot =
      ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) /
      p.dist(x1, y1, x2, y2) ** 2;

    const closestX = x1 + dot * (x2 - x1);
    const closestY = y1 + dot * (y2 - y1);

    return [closestX, closestY];
  }
}
