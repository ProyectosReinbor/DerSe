import type { Canvas_ENGINE } from "./canvas";
import type { Coordinate_ENGINE } from "./coordinate";

export class MoveCanvas {

  touch: Coordinate_ENGINE | false = false;
  moved: boolean = false;
  canvas: Canvas_ENGINE;
  moveHorizontal: boolean;
  moveVertical: boolean;

  constructor(props: {
    canvas: Canvas_ENGINE;
    moverHorizontal: boolean;
    moverVertical: boolean;
  }) {
    this.canvas = props.canvas;
    this.moveHorizontal = props.moverHorizontal;
    this.moveVertical = props.moverVertical;
  }

  touchstartMoveCamera(props: {
    touch: Coordinate_ENGINE;
  }) {
    this.moved = false;
    this.touch = props.touch;
  }

  touchmoveMoveCamera(props: {
    touch: Coordinate_ENGINE;
  }): boolean {
    if (this.touch === false)
      return false;

    let moved = false;

    if (this.moveHorizontal === true) {
      const distance = this.touch.x - props.touch.x;
      if (distance > 5 || distance < -5) {
        this.canvas.leftUp.x += distance;
        this.touch.x = props.touch.x;
        moved = true;
      }
    }

    if (this.moveVertical === true) {
      const distance = this.touch.y - props.touch.y;
      if (distance > 5 || distance < -5) {
        this.canvas.leftUp.y += distance;
        this.touch.y = props.touch.y;
        moved = true;
      }
    }

    if (moved === true)
      this.moved = true;

    return this.moved;
  }

  touchendTouchCamera(): boolean {
    this.touch = false;
    return this.moved;
  }
}