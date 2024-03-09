import { Coordinate } from "./coordinate.js";
import { Size } from "./size.js";

export class Position {

  initial: Coordinate;
  size: Size;

  constructor(
    initial: {
      x: number;
      y: number;
    },
    size: {
      width: number;
      height: number;
    }
  ) {
    this.initial = new Coordinate(
      initial.x,
      initial.y,
    );
    this.size = new Size(
      size.width,
      size.height,
    );
  }

  get end(): Coordinate {
    return new Coordinate(
      this.initial.x + this.size.width,
      this.initial.y + this.size.height,
    );
  }

  inside(position: Position): boolean {
    return this.initial.x <= position.initial.x &&
      this.initial.y <= position.initial.y &&
      this.end.x >= position.end.x &&
      this.end.y >= position.end.y;
  }
}

