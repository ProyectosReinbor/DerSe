import type { CanvasENGINE } from "./canvas";
import type { CoordinateENGINE } from "./coordinate";

export class MoveCanvas {

  touch: CoordinateENGINE | false = false;
  moved: boolean = false;
  canvas: CanvasENGINE;
  moveHorizontal: boolean;
  moveVertical: boolean;

  constructor(
    canvas: CanvasENGINE,
    moverHorizontal: boolean,
    moverVertical: boolean,
  ) {
    this.canvas = canvas;
    this.moveHorizontal = moverHorizontal;
    this.moveVertical = moverVertical;
  }

  touchstartMoveCamera(
    touch: CoordinateENGINE
  ) {
    this.moved = false;
    this.touch = touch;
  }

  touchmoveMoveCamera(
    touch: CoordinateENGINE
  ): boolean {
    if (this.touch === false)
      return false;

    let moved = false;

    if (this.moveHorizontal === true) {
      const distance = this.touch.x - touch.x;
      if (distance > 5 || distance < -5) {
        this.canvas.leftUp.x += distance;
        this.touch.x = touch.x;
        moved = true;
      }
    }

    if (this.moveVertical === true) {
      const distance = this.touch.y - touch.y;
      if (distance > 5 || distance < -5) {
        this.canvas.leftUp.y += distance;
        this.touch.y = touch.y;
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