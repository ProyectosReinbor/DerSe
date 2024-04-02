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

  leftUpPlusSizePercentages(
    percentages: Size_ENGINE
  ) {
    const size = this.size.getPercentages(percentages);
    return new Coordinate_ENGINE(
      this.leftUp.x + size.width,
      this.leftUp.y + size.height,
    );
  }

  insidePositionCoordinate(
    coordinate: Coordinate_ENGINE
  ) {
    const thisRightDown = this.rightDown();
    return this.leftUp.x <= coordinate.x &&
      this.leftUp.y <= coordinate.y &&
      thisRightDown.x >= coordinate.x &&
      thisRightDown.y >= coordinate.y;
  }

  insidePosition(
    position: Position_ENGINE
  ) {
    const thisRightDown = this.rightDown();
    const positionRightDown = position.rightDown();
    return this.leftUp.x <= position.leftUp.x &&
      this.leftUp.y <= position.leftUp.y &&
      thisRightDown.x >= positionRightDown.x &&
      thisRightDown.y >= positionRightDown.y;
  }

  someVertexInside(
    position: Position_ENGINE
  ): boolean {
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

