import type p5 from "p5";

export class Line {
  a: p5.Vector;
  b: p5.Vector;

  constructor(from: p5.Vector, to: p5.Vector) {
    this.a = from;
    this.b = to;
  }

  draw(sketch: p5) {
    sketch.line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
