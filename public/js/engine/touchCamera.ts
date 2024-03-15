import type { Canvas } from "./canvas.js";
import { Coordinate } from "./coordinate.js";
export class TouchCanvas {
  touch: null | Coordinate;
  moved: boolean;
  canvas: Canvas;
  horizontal: boolean;
  vertical: boolean;
  constructor(
    canvas: Canvas,
    horizontal: boolean,
    vertical: boolean,
  ) {
    this.touch = null;
    this.moved = false;
    this.canvas = canvas;
    this.horizontal = horizontal;
    this.vertical = vertical;
  }

  touchstartTouchCamera(touch: Coordinate) {
    this.moved = false;
    this.touch = touch;
  }

  touchmoveTouchCamera(touch: Coordinate) {
    if (this.touch === null) return false;

    let moved = false;

    if (this.horizontal === true) {
      const distance = this.touch.x - touch.x;
      if (distance > 5 || distance < -5) {
        this.canvas.initial.x += distance;
        this.touch.x = touch.x;
        moved = true;
      }
    }

    if (this.vertical === true) {
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