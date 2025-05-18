import p5 from "p5";

export class Particle {
  position: p5.Vector;

  constructor(p: p5, x: number, y: number) {
    this.position = p.createVector(x, y);
  }
}
