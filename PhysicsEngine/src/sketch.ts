import p5 from "p5";
import { Circle } from "./classes/Circle";
import { Line } from "./classes/Line";

new p5((p: p5) => {
  let object: Circle;
  let boundaries: Line[];

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);

    object = new Circle(p, p.createVector(p.width / 2, p.height / 2));

    boundaries = [
      new Line(p, 0, 0, p.width, 0),
      new Line(p, p.width, 0, p.width, p.height),
      new Line(p, p.width, p.height, 0, p.height),
      new Line(p, 0, p.height, 0, 0),
    ];
  };

  p.draw = () => {
    p.background(30);

    // object.goto(p, p.mouseX, p.mouseY);
    object.draw(p);
    object.update(p, boundaries);
  };
});
