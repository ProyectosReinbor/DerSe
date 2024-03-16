import { type Canvas, Coordinate } from "./exports.js";

export class TouchCanvas {
  touch: null | Coordinate;
  moved: boolean;
  canvas: Canvas;
  canHorizontal: boolean;
  canVertical: boolean;
  constructor(
    canvas: Canvas,
    canHorizontal: boolean = false,
    canVertical: boolean = false,
  ) {
    this.touch = null;
    this.moved = false;
    this.canvas = canvas;
    this.canHorizontal = canHorizontal;
    this.canVertical = canVertical;
  }

  touchstartTouchCamera(touch: Coordinate) {
    this.moved = false;
    this.touch = touch;
  }

  touchmoveTouchCamera(touch: Coordinate) {
    if (this.touch === null) return false;

    let moved = false;

    if (this.canHorizontal === true) {
      const distance = this.touch.x - touch.x;
      if (distance > 5 || distance < -5) {
        this.canvas.initial.x += distance;
        this.touch.x = touch.x;
        moved = true;
      }
    }

    if (this.canVertical === true) {
      const distance = this.touch.y - touch.y;
      if (distance > 5 || distance < -5) {
        this.canvas.initial.y += distance;
        this.touch.y = touch.y;
        moved = true;
      }
    }

    if (moved === true) this.moved = true;
    return this.moved;
  }

  touchendTouchCamera() {
    this.touch = null;
    return this.moved;
  }
}