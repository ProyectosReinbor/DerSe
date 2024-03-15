
import type { Canvas } from "../canvas.js";
import { Coordinate } from "../coordinate.js";
import type { Keyboard } from "../keyboard.js";
import { Lines } from "../lines.js";
import { Rect } from "../rect.js";
import { Size } from "../size.js";

export class Finish extends Rect {
  seen: Lines;
  keyboard: Keyboard;
  constructor(
    canvas: Canvas,
    keyboard: Keyboard,
  ) {
    super(
      new Coordinate(
        keyboard.initial.x + (keyboard.size.width * 0.88),
        keyboard.initial.y + (keyboard.size.height * 0.03),
      ),
      new Size(
        keyboard.size.width * 0.1,
        keyboard.size.height * 0.14,
      ),
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
    this.seen.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.3),
      this.initial.y + (this.size.height * 0.5),
    ));
    this.seen.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.5),
      this.initial.y + (this.size.height * 0.8),
    ));
    this.seen.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.7),
      this.initial.y + (this.size.height * 0.2),
    ));
    this.keyboard = keyboard;
  }

  touchendFinish(touch: Coordinate) {
    if (this.insideCoordinate(touch) === false) return false;
    this.keyboard.target = null;
    return true;
  }

  drawFinish() {
    this.drawRect();
    this.seen.drawLines();
  }
}