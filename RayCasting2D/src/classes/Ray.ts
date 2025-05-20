import { Line } from "./Line";
import p5 from "p5";

export class Ray {
  position: p5.Vector;
  direction: p5.Vector;

  constructor(start: p5.Vector, angle: number) {
    this.direction = p5.Vector.fromAngle(angle, 1000);

    this.position = start;
  }

  draw(p: p5, color = p.color(0, 0, 255)) {
    p.stroke(color);
    p.line(
      this.position.x,
      this.position.y,
      this.direction.x * 100,
      this.direction.y * 100
    );
  }

  lookAt(position: p5.Vector) {
    this.direction = p5.Vector.sub(position, this.position);
  }

  cast(p: p5, wall: Line) {
    const { x: x1, y: y1 } = this.position;
    const { x: x2, y: y2 } = this.position.copy().add(this.direction);
    const { x: x3, y: y3 } = wall.a;
    const { x: x4, y: y4 } = wall.b;

    const t = this.calculateT(x1, y1, x2, y2, x3, y3, x4, y4);
    const u = this.calculateU(x1, y1, x2, y2, x3, y3, x4, y4);

    if (!t || !u) return;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      const pointX = x1 + t * (x2 - x1);
      const pointY = y1 + t * (y2 - y1);

      return p.createVector(pointX, pointY);
    }
  }

  private calculateT(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ) {
    const numerator = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denominator === 0) return;

    return numerator / denominator;
  }

  private calculateU(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ) {
    const numerator = (x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3);
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denominator === 0) return;

    return -numerator / denominator;
  }
}
