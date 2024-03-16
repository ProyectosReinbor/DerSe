import { Coordinate, Size } from "./exports.js";

export class Position {
  initial: Coordinate;
  size: Size;
  constructor(
    initial: Coordinate,
    size: Size
  ) {
    this.initial = initial;
    this.size = size;
  }

  get end() {
    return new Coordinate(
      this.initial.x + this.size.width,
      this.initial.y + this.size.height,
    );
  }

  insideCoordinate(initial: Coordinate) {
    return this.inside(
      new Position(initial, new Size)
    );
  }

  inside(position: Position) {
    return this.initial.x <= position.initial.x &&
      this.initial.y <= position.initial.y &&
      this.end.x >= position.end.x &&
      this.end.y >= position.end.y;
  }
}

