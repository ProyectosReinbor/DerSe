export class TouchCanvas {
  constructor(
    canvas,
    horizontal = false,
    vertical = false,
  ) {
    this.canvas = canvas;
    this.touch = false;
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.moved = false;
  }

  touchstartTouchCamera(touch) {
    this.moved = false;
    this.touch = touch;
  }

  touchmoveTouchCamera(touch) {
    if (this.touch === false) return false;

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

    if (moved === true) {
      this.moved = true;
    }
    return this.moved;
  }

  touchendTouchCamera() {
    this.touch = false;
    return this.moved;
  }
}