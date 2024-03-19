import type { Canvas } from "./canvas";
import type { Coordinate } from "./coordinate";

export class TouchCanvas {
  touch: Coordinate | false = false;
  moved: boolean = false;
  canvas: Canvas;
  canHorizontal: boolean;
  canVertical: boolean;
  constructor(props: {
    canvas: Canvas;
    canHorizontal: boolean;
    canVertical: boolean;
  }) {
    this.canvas = props.canvas;
    this.canHorizontal = props.canHorizontal;
    this.canVertical = props.canVertical;
  }

  touchstartTouchCamera(touch: Coordinate) {
    this.moved = false;
    this.touch = touch;
  }

  touchmoveTouchCamera(touch: Coordinate): boolean {
    if (this.touch === false) return false;

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

  touchendTouchCamera(): boolean {
    this.touch = false;
    return this.moved;
  }
}