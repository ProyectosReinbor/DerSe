import { Coordinate } from "./coordinate.js";
export class TouchCanvas {
  constructor(
    canvas,
    horizontal,
    vertical,
  ) {
    this.touch = null;
    this.moved = false;
    this.canvas = canvas;
    this.horizontal = horizontal;
    this.vertical = vertical;
  }

  touchstartTouchCamera(x, y) {
    this.moved = false;
    this.touch = new Coordinate(x, y);
  }

  touchmoveTouchCamera(x, y) {
    if (this.touch === null) return false;

    let moved = false;

    if (this.horizontal === true) {
      const distance = this.touch.x - x;
      if (distance > 5 || distance < -5) {
        this.canvas.initial.x += distance;
        this.touch.x = x;
        moved = true;
      }
    }

    if (this.vertical === true) {
      const distance = this.touch.y - y;
      if (distance > 5 || distance < -5) {
        this.canvas.initial.y += distance;
        this.touch.y = y;
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