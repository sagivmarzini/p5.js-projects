import type p5 from "p5";
import type { Vector } from "p5";

export class Line {
  a: Vector;
  b: Vector;

  constructor(from: Vector, to: Vector) {
    this.a = from;
    this.b = to;
  }

  draw(sketch: p5) {
    sketch.line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
