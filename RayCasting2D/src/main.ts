import p5 from "p5";
import { Line } from "./classes/Line";
import { Particle } from "./classes/Particle";

const NUM_WALLS = 5;
const NUM_RAYS = 10;

let walls: Line[] = [];
let particle: Particle;

new p5((sketch: p5) => {
  sketch.setup = () => {
    sketch.createCanvas(window.innerWidth, window.innerHeight);
    sketch.stroke(255);

    for (let i = 0; i < NUM_WALLS; i++) {
      walls[i] = new Line(
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
    particle.shootRays(sketch, NUM_RAYS);
  };

  sketch.draw = () => {
    const mousePosition = sketch.createVector(sketch.mouseX, sketch.mouseY);

    particle.goto(mousePosition);

    sketch.background(10);

    particle.draw(sketch);

    for (let wall of walls) {
      wall.draw(sketch);
      particle.castRays(sketch, wall);
    }
  };
});
