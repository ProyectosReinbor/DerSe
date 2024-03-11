import { Lines } from "../lines.js";
import { Rect } from "../rect.js";

export class Enter extends Rect {
  constructor(
    canvas,
    keyboard,
  ) {
    super(
      keyboard.initial.x + (keyboard.size.width * 0.13),
      keyboard.initial.y + (keyboard.size.height * 0.03),
      keyboard.size.width * 0.12,
      keyboard.size.height * 0.14,
      canvas,
      "#21618C",
      "#fff",
      0.5,
    );
    this.keyboard = keyboard;
    this.triangle = new Lines(
      canvas,
      "#fff",
    );
    this.triangle.addLine(
      this.initial.x + (this.size.width * 0.1),
      this.initial.y + (this.size.height * 0.6),
    );
    this.triangle.addLine(
      this.initial.x + (this.size.width * 0.3),
      this.initial.y + (this.size.height * 0.4),
    );
    this.triangle.addLine(
      this.initial.x + (this.size.width * 0.3),
      this.initial.y + (this.size.height * 0.8),
    );
    this.triangle.addLine(
      this.initial.x + (this.size.width * 0.1),
      this.initial.y + (this.size.height * 0.6),
    );
    this.lines = new Lines(
      canvas,
      undefined,
      "#fff",
      0.5,
    );
    this.lines.addLine(
      this.initial.x + (this.size.width * 0.2),
      this.initial.y + (this.size.height * 0.6),
    );
    this.lines.addLine(
      this.initial.x + (this.size.width * 0.8),
      this.initial.y + (this.size.height * 0.6),
    );
    this.lines.addLine(
      this.initial.x + (this.size.width * 0.8),
      this.initial.y + (this.size.height * 0.2),
    );
  }

  touchendEnter(initialX, initialY) {
    if (this.inside(
      initialX,
      initialY,
      initialX,
      initialY,
    ) === false) return false;
    this.keyboard.target.addLineBreak();
    return true;
  }

  drawEnter() {
    this.drawRect();
    this.triangle.drawLines();
    this.lines.drawLines();
  }
}