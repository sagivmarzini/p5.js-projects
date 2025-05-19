import { Line } from "./Line";
import p5 from "p5";

export class Ray extends Line {
  constructor(start: p5.Vector, angle: number) {
    const direction = p5.Vector.fromAngle(angle);
    const end = p5.Vector.add(start, direction);

    super(start, end);
  }
}
