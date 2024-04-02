import { Coordinate_ENGINE } from "./coordinate";
import type { Size_ENGINE } from "./size";

export class Position_ENGINE {

  leftUp: Coordinate_ENGINE;
  size: Size_ENGINE;

  constructor(
    leftUp: Coordinate_ENGINE,
    size: Size_ENGINE,
  ) {
    this.leftUp = leftUp;
    this.size = size;
  }

  leftDown() {
    return new Coordinate_ENGINE(
      this.leftUp.x,
      this.leftUp.y + this.size.height
    );
  }

  rightDown() {
    return new Coordinate_ENGINE(
      this.leftUp.x + this.size.width,
      this.leftUp.y + this.size.height,
    );
  }

  rightUp() {
    return new Coordinate_ENGINE(
      this.leftUp.x + this.size.width,
      this.leftUp.y,
    );
  }

  leftUpPlusSizePercentages(percentages: Size_ENGINE) {
    const sizePercentage = this.size.percentage(percentages);
    const x = this.leftUp.x + sizePercentage.width;
    const y = this.leftUp.y + sizePercentage.height;
    return new Coordinate_ENGINE(x, y);
  }

  insidePositionCoordinate(coordinate: Coordinate_ENGINE) {
    const rightDown = this.rightDown();
    return this.leftUp.x <= coordinate.x &&
      this.leftUp.y <= coordinate.y &&
      rightDown.x >= coordinate.x &&
      rightDown.y >= coordinate.y;
  }

  insidePosition(position: Position_ENGINE) {
    const rightDown = this.rightDown();
    const positionRightDown = position.rightDown();
    return this.leftUp.x <= position.leftUp.x &&
      this.leftUp.y <= position.leftUp.y &&
      rightDown.x >= positionRightDown.x &&
      rightDown.y >= positionRightDown.y;
  }

  someVertexInside(position: Position_ENGINE): boolean {
    if (this.insidePositionCoordinate(position.leftUp))
      return true;

    if (this.insidePositionCoordinate(
      position.leftDown()
    ))
      return true;

    if (this.insidePositionCoordinate(
      position.rightUp()
    ))
      return true;

    if (this.insidePositionCoordinate(
      position.rightDown()
    ))
      return true;

    return false;
  }
}

