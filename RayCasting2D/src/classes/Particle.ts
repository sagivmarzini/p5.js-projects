import p5 from "p5";
import { Ray } from "./Ray";

export class Particle {
  position: p5.Vector;
  rays: Ray[] = [];

  constructor(p: p5, x: number, y: number) {
    this.position = p.createVector(x, y);
  }

  shootRay(direction: number) {
    this.rays.push(new Ray(this.position, direction));
  }

  draw(p: p5) {
    p.circle(this.position.x, this.position.y, 5);

    for (let ray of this.rays) {
      ray.draw(p);
    }
  }
}
