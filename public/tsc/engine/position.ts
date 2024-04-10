import { Coordinate_ENGINE } from "./coordinate";
import type { Size_ENGINE } from "./size";

export class Position_ENGINE {

  private leftUp: Coordinate_ENGINE;
  private size: Size_ENGINE;

  constructor(
    leftUp: Coordinate_ENGINE,
    size: Size_ENGINE,
  ) {
    this.leftUp = leftUp;
    this.size = size;
  }

  getLeftUp(): Coordinate_ENGINE {
    return this.leftUp;
  }

  getSize(): Size_ENGINE {
    return this.size;
  }

  getLeftDown(): Coordinate_ENGINE {
    return new Coordinate_ENGINE(
      this.leftUp.getX(),
      this.leftUp.getY() + this.size.getHeight()
    );
  }

  getRightDown(): Coordinate_ENGINE {
    return new Coordinate_ENGINE(
      this.leftUp.getX() + this.size.getWidth(),
      this.leftUp.getY() + this.size.getHeight(),
    );
  }

  getRightUp(): Coordinate_ENGINE {
    return new Coordinate_ENGINE(
      this.leftUp.getX() + this.size.getWidth(),
      this.leftUp.getY(),
    );
  }

  getLeftUpPlusSizePixels(
    percentages: Size_ENGINE
  ): Coordinate_ENGINE {
    const sizePercentage = this.size.getPixels(percentages);
    const x = this.leftUp.getX() + sizePercentage.getWidth();
    const y = this.leftUp.getY() + sizePercentage.getHeight();
    return new Coordinate_ENGINE(x, y);
  }

  coordinateWithinPosition(
    coordinate: Coordinate_ENGINE
  ): boolean {
    const rightDown = this.getRightDown();
    const coordinateX = coordinate.getX();
    const coordinateY = coordinate.getY();
    return this.leftUp.getX() <= coordinateX &&
      this.leftUp.getY() <= coordinateY &&
      rightDown.getX() >= coordinateX &&
      rightDown.getY() >= coordinateY;
  }

  positionWithinPosition(
    position: Position_ENGINE
  ): boolean {
    const rightDown = this.getRightDown();
    const positionRightDown = position.getRightDown();
    return this.leftUp.getX() <= position.leftUp.getX() &&
      this.leftUp.getY() <= position.leftUp.getY() &&
      rightDown.getX() >= positionRightDown.getX() &&
      rightDown.getY() >= positionRightDown.getY();
  }

  someVertexInside(
    position: Position_ENGINE
  ): boolean {
    if (this.coordinateWithinPosition(position.leftUp))
      return true;

    if (this.coordinateWithinPosition(
      position.getLeftDown()
    ))
      return true;

    if (this.coordinateWithinPosition(
      position.getRightUp()
    ))
      return true;

    if (this.coordinateWithinPosition(
      position.getRightDown()
    ))
      return true;

    return false;
  }
}

