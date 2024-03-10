
import { Canvas } from "../canvas.js";
import { Keyboard } from "../keyboard.js";
import { Lines } from "../lines.js";
import { Position } from "../position.js";
import { Rect } from "../rect.js";

export class Finish extends Rect {

  seen: Lines;
  keyboard: Keyboard;

  constructor(
    canvas: Canvas,
    keyboard: Keyboard,
  ) {
    super(
      {
        x: keyboard.initial.x + (keyboard.size.width * 0.88),
        y: keyboard.initial.y + (keyboard.size.height * 0.03),
      },
      {
        width: keyboard.size.width * 0.1,
        height: keyboard.size.height * 0.14,
      },
      canvas,
      "#21618C",
      "#fff",
      0.5,
    );
    this.keyboard = keyboard;
    this.seen = new Lines(
      canvas,
      [
        {
          x: this.initial.x + (this.size.width * 0.3),
          y: this.initial.y + (this.size.height * 0.5),
        },
        {
          x: this.initial.x + (this.size.width * 0.5),
          y: this.initial.y + (this.size.height * 0.8),
        },
        {
          x: this.initial.x + (this.size.width * 0.7),
          y: this.initial.y + (this.size.height * 0.2),
        }
      ],
      "",
      "#fff",
      0.5,
    );
  }

  touchendFinish(touch: Position): boolean {
    if (this.inside(touch) === false) return false;
    if (this.keyboard.target === null) return false;
    this.keyboard.target = null;
    return true;
  }

  drawFinish() {
    this.drawRect();
    this.seen.drawLines();
  }
}