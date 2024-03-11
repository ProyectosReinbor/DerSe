import { Lines } from "../lines.js";
import { Rect } from "../rect.js";

export class Shift extends Rect {
  constructor(
    canvas,
    keyboard,
  ) {
    super(
      keyboard.initial.x + (keyboard.size.width * 0.02),
      keyboard.initial.y + (keyboard.size.height * 0.03),
      keyboard.size.width * 0.09,
      keyboard.size.height * 0.14,
      canvas,
      "#21618C",
      "#AED6F1",
      0.5,
    );
    this.uppercase = false;
    this.triangle = new Lines(
      canvas,
      "#fff",
      undefined,
      undefined,
    );
    this.triangle.addLine(
      this.initial.x + (this.size.width * 0.5),
      this.initial.y + (this.size.height * 0.2),
    );
    this.triangle.addLine(
      this.initial.x + (this.size.width * 0.1),
      this.initial.y + (this.size.height * 0.5),
    );
    this.triangle.addLine(
      this.initial.x + (this.size.width * 0.9),
      this.initial.y + (this.size.height * 0.5),
    );
    this.triangle.addLine(
      this.initial.x + (this.size.width * 0.5),
      this.initial.y + (this.size.height * 0.2),
    );
    this.lines = new Lines(
      canvas,
      undefined,
      "#fff",
      2,
    );
    this.lines.addLine(
      this.initial.x + (this.size.width * 0.5),
      this.initial.y + (this.size.height * 0.5)
    );
    this.lines.addLine(
      this.initial.x + (this.size.width * 0.5),
      this.initial.y + (this.size.height * 0.8)
    );
  }

  touchendShift(
    initialX,
    initialY,
  ) {
    if (
      this.inside(
        initialX,
        initialY,
        initialX,
        initialY,
      ) === false
    ) return false;
    this.uppercase = !this.uppercase;
    return true;
  }

  drawShift() {
    this.drawRect();
    this.triangle.drawLines();
    this.lines.drawLines();
  }
}