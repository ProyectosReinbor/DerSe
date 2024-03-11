
import { Lines } from "../lines.js";
import { Position } from "../position.js";
import { Rect } from "../rect.js";

export class Finish extends Rect {
  constructor(
    canvas,
    keyboard,
  ) {
    super(
      keyboard.initial.x + (keyboard.size.width * 0.88),
      keyboard.initial.y + (keyboard.size.height * 0.03),
      keyboard.size.width * 0.1,
      keyboard.size.height * 0.14,
      canvas,
      "#21618C",
      "#fff",
      0.5,
    );
    this.seen = new Lines(
      canvas,
      undefined,
      "#fff",
      0.5
    );
    this.seen.addLine(
      this.initial.x + (this.size.width * 0.3),
      this.initial.y + (this.size.height * 0.5),
    );
    this.seen.addLine(
      this.initial.x + (this.size.width * 0.5),
      this.initial.y + (this.size.height * 0.8),
    );
    this.seen.addLine(
      this.initial.x + (this.size.width * 0.7),
      this.initial.y + (this.size.height * 0.2),
    );
    this.keyboard = keyboard;
  }

  touchendFinish(x, y) {
    if (this.inside(x, y, x, y) === false) return false;
    this.keyboard.target = null;
    return true;
  }

  drawFinish() {
    this.drawRect();
    this.seen.drawLines();
  }
}