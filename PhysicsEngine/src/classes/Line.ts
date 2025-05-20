import type p5 from "p5";

export class Line {
  a: p5.Vector;
  b: p5.Vector;

  constructor(p: p5, ax: number, ay: number, bx: number, by: number) {
    this.a = p.createVector(ax, ay);
    this.b = p.createVector(bx, by);
  }

  draw(p: p5, color = p.color(255)) {
    p.stroke(color);
    p.line(this.a.x, this.a.y, this.b.x, this.b.y);
  }

  getLength(p: p5) {
    return p.dist(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
