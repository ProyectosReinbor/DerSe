import { Coordinate_ENGINE } from "./coordinate";
import type { Size_ENGINE } from "./size";

export class Position_ENGINE {

  leftUp: Coordinate_ENGINE;
  size: Size_ENGINE;

  constructor(props: {
    leftUp: Coordinate_ENGINE;
    size: Size_ENGINE;
  }) {
    this.leftUp = props.leftUp;
    this.size = props.size;
  }

  get leftDown() {
    return new Coordinate_ENGINE({
      x: this.leftUp.x,
      y: this.leftUp.y + this.size.height
    });
  }

  get rightDown() {
    return new Coordinate_ENGINE({
      x: this.leftUp.x + this.size.width,
      y: this.leftUp.y + this.size.height,
    });
  }

  get rightUp() {
    return new Coordinate_ENGINE({
      x: this.leftUp.x + this.size.width,
      y: this.leftUp.y,
    });
  }

  topLeftPlusPercentageOfMeasurements(percentages: Size_ENGINE) {
    const size = this.size.getPercentages(percentages);
    return new Coordinate_ENGINE({
      x: this.leftUp.x + size.width,
      y: this.leftUp.y + size.height,
    });
  }

  coordinateWithinPosition(coordinate: Coordinate_ENGINE) {
    return this.leftUp.x <= coordinate.x &&
      this.leftUp.y <= coordinate.y &&
      this.rightDown.x >= coordinate.x &&
      this.rightDown.y >= coordinate.y;
  }

  positionWithinPosition(position: Position_ENGINE) {
    return this.leftUp.x <= position.leftUp.x &&
      this.leftUp.y <= position.leftUp.y &&
      this.rightDown.x >= position.rightDown.x &&
      this.rightDown.y >= position.rightDown.y;
  }

  someVertexOfThePositionWithinThePosition(position: Position_ENGINE): boolean {
    if (this.coordinateWithinPosition(position.leftUp) === true)
      return true;

    if (this.coordinateWithinPosition(position.leftDown) === true)
      return true;

    if (this.coordinateWithinPosition(position.rightUp) === true)
      return true;

    if (this.coordinateWithinPosition(position.rightDown) === true)
      return true;

    return false;
  }
}

