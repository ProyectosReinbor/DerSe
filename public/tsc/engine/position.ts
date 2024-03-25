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

  leftUpPlusSizePercentages(props: {
    percentages: Size_ENGINE;
  }) {
    const size = this.size.getPercentages(props);
    return new Coordinate_ENGINE({
      x: this.leftUp.x + size.width,
      y: this.leftUp.y + size.height,
    });
  }

  insidePositionCoordinate(props: {
    coordinate: Coordinate_ENGINE;
  }) {
    return this.leftUp.x <= props.coordinate.x &&
      this.leftUp.y <= props.coordinate.y &&
      this.rightDown.x >= props.coordinate.x &&
      this.rightDown.y >= props.coordinate.y;
  }

  insidePosition(props: {
    position: Position_ENGINE;
  }) {
    return this.leftUp.x <= props.position.leftUp.x &&
      this.leftUp.y <= props.position.leftUp.y &&
      this.rightDown.x >= props.position.rightDown.x &&
      this.rightDown.y >= props.position.rightDown.y;
  }

  someVertexInside(props: {
    position: Position_ENGINE
  }): boolean {
    if (this.insidePositionCoordinate({
      coordinate: props.position.leftUp
    }) === true)
      return true;

    if (this.insidePositionCoordinate({
      coordinate: props.position.leftDown
    }) === true)
      return true;

    if (this.insidePositionCoordinate({
      coordinate: props.position.rightUp
    }) === true)
      return true;

    if (this.insidePositionCoordinate({
      coordinate: props.position.rightDown
    }) === true)
      return true;

    return false;
  }
}

