import { Coordinate_ENGINE } from "./coordinate";
import { Size_ENGINE } from "./size";

export class Position_ENGINE {

  protected _leftUp: Coordinate_ENGINE;
  protected _size: Size_ENGINE;

  public get leftUp(): Coordinate_ENGINE {
    return this._leftUp;
  }

  public get size(): Size_ENGINE {
    return this._size;
  }

  constructor(
    _leftUp: Coordinate_ENGINE,
    _size: Size_ENGINE,
  ) {
    this._leftUp = _leftUp;
    this._size = _size;
  }

  public get leftDown(): Coordinate_ENGINE {
    return new Coordinate_ENGINE(
      this._leftUp.x,
      this._leftUp.y + this._size.height
    );
  }

  public get rightDown(): Coordinate_ENGINE {
    return new Coordinate_ENGINE(
      this._leftUp.x + this._size.width,
      this._leftUp.y + this._size.height,
    );
  }

  public get rightUp(): Coordinate_ENGINE {
    return new Coordinate_ENGINE(
      this._leftUp.x + this._size.width,
      this._leftUp.y,
    );
  }

  public leftUpPlusSizePixels(
    percentages: Size_ENGINE
  ): Coordinate_ENGINE {
    const pixels = this._size.pixels(percentages);
    return new Coordinate_ENGINE(
      this._leftUp.x + pixels.width,
      this._leftUp.y + pixels.height
    );
  }

  public coordinateWithinPosition(
    coordinate: Coordinate_ENGINE
  ): boolean {
    return this.leftUp.x <= coordinate.x &&
      this.leftUp.y <= coordinate.y &&
      this.rightDown.x >= coordinate.x &&
      this.rightDown.y >= coordinate.y;
  }

  public positionWithinPosition(
    position: Position_ENGINE
  ): boolean {
    return this.leftUp.x <= position.leftUp.x &&
      this.leftUp.y <= position.leftUp.y &&
      this.rightDown.x >= position.rightDown.x &&
      this.rightDown.y >= position.rightDown.y;
  }

  public someVertexWithinPosition(
    position: Position_ENGINE
  ): boolean {
    if (this.coordinateWithinPosition(position.leftUp))
      return true;

    if (this.coordinateWithinPosition(position.leftDown))
      return true;

    if (this.coordinateWithinPosition(position.rightUp))
      return true;

    if (this.coordinateWithinPosition(position.rightDown))
      return true;

    return false;
  }
}

