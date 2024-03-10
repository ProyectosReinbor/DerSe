import { Coordinate } from "./coordinate.js";
import { Size } from "./size.js";

export class Position {
  constructor(
    initial = {},
    size = {}
  ) {
    this.initial = new Coordinate(initial.x, initial.y);
    this.size = new Size(size.width, size.height);
  }

  get end() {
    return new Coordinate({
      x: this.initial.x + this.size.width,
      y: this.initial.y + this.size.height,
    });
  }

  inside(position) {
    return this.initial.x <= position.initial.x &&
      this.initial.y <= position.initial.y &&
      this.end.x >= position.end.x &&
      this.end.y >= position.end.y;
  }
}

