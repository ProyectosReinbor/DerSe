import { Coordinate } from "./coordinate.js";
import { Size } from "./size.js";

export class Position {
  constructor(
    initialX,
    initialY,
    sizeWidth,
    sizeHeight
  ) {
    this.initial = new Coordinate(initialX, initialY);
    this.size = new Size(sizeWidth, sizeHeight);
  }

  get end() {
    return new Coordinate(
      this.initial.x + this.size.width,
      this.initial.y + this.size.height,
    );
  }

  inside(
    initialX,
    initialY,
    endX,
    endY
  ) {
    return this.initial.x <= initialX &&
      this.initial.y <= initialY &&
      this.end.x >= endX &&
      this.end.y >= endY;
  }
}

