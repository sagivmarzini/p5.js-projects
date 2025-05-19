import p5 from "p5";
import { Line } from "./classes/Line";
import { Particle } from "./classes/Particle";

const NUM_LINES = 5;

let lines: Line[] = [];
let particle: Particle;

new p5((sketch: p5) => {
  sketch.setup = () => {
    sketch.createCanvas(window.innerWidth, window.innerHeight);
    sketch.stroke(255);

    for (let i = 0; i < NUM_LINES; i++) {
      lines[i] = new Line(
        sketch.createVector(
          sketch.random(sketch.width),
          sketch.random(sketch.height)
        ),
        sketch.createVector(
          sketch.random(sketch.width),
          sketch.random(sketch.height)
        )
      );
    }

    particle = new Particle(sketch, sketch.width / 2, sketch.height / 2);
  };

  sketch.draw = () => {
    sketch.background(10);

    particle.draw(sketch);
    particle.shootRay(90);

    for (let line of lines) {
      line.draw(sketch);
    }
  };
});
