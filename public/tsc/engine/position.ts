import { Coordinate } from "./coordinate";
import { Size } from "./size";

export class Position {
  initial: Coordinate;
  size: Size;
  constructor(props: {
    initial: Coordinate;
    size: Size;
  }) {
    this.initial = props.initial;
    this.size = props.size;
  }

  get end() {
    return new Coordinate({
      x: this.initial.x + this.size.width,
      y: this.initial.y + this.size.height,
    });
  }

  endPercentage(percentage: Coordinate) {
    const size = this.size.percentage(percentage);
    return new Coordinate({
      x: this.initial.x + size.width,
      y: this.initial.y + size.height,
    });
  }

  insideCoordinate(initial: Coordinate) {
    return this.inside(
      new Position({
        initial,
        size: new Size({
          width: 0,
          height: 0
        })
      })
    );
  }

  inside(position: Position) {
    return this.initial.x <= position.initial.x &&
      this.initial.y <= position.initial.y &&
      this.end.x >= position.end.x &&
      this.end.y >= position.end.y;
  }

  collision(position: Position): boolean {
    const collision = position.collision(this);
    if (collision === true) return true;
    const coordinateLeftUp = position.initial;
    const coordinateRightUp = new Coordinate({
      x: position.end.x,
      y: position.initial.y
    });
    const coordinateLeftDown = new Coordinate({
      x: position.initial.x,
      y: position.end.y
    });
    const coordinateRightDown = position.end;
    if (this.insideCoordinate(coordinateLeftUp) === true) return true;
    if (this.insideCoordinate(coordinateRightUp) === true) return true;
    if (this.insideCoordinate(coordinateLeftDown) === true) return true;
    if (this.insideCoordinate(coordinateRightDown) === true) return true;
    return false;
  }
}

