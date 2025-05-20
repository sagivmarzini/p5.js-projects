import p5 from "p5";
import { Ray } from "./Ray";
import type { Line } from "./Line";

export class Particle {
  position: p5.Vector;
  rays: Ray[] = [];

  constructor(p: p5, x: number, y: number) {
    this.position = p.createVector(x, y);
  }

  goto(position: p5.Vector) {
    this.position = position;

    for (let ray of this.rays) {
      ray.position = position;
    }
  }

  shootRay(direction: number) {
    this.rays.push(new Ray(this.position, direction));
  }

  shootRays(p: p5, numRays: number) {
    // Clear existing rays if needed
    this.rays = [];

    for (let i = 0; i < numRays; i++) {
      const angle = (i * 360) / numRays;

      this.rays.push(new Ray(this.position, p.radians(angle)));
    }
  }

  castRays(p: p5, wall: Line) {
    for (let ray of this.rays) {
      const collision = ray.cast(p, wall);

      p.push();
      p.strokeWeight(10);
      if (collision) p.point(collision);
      p.pop();
    }
  }

  draw(p: p5) {
    p.circle(this.position.x, this.position.y, 5);

    for (let ray of this.rays) {
      ray.draw(p);
    }
  }
}
