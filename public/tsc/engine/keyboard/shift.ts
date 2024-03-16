import type { Canvas } from "../canvas";
import { Coordinate } from "../coordinate";
import type { Keyboard } from "../keyboard";
import { Lines } from "../lines";
import { Rect } from "../rect";
import { Size } from "../size";


export class Shift extends Rect {
  uppercase: boolean;
  triangle: Lines;
  lines: Lines;
  constructor(
    canvas: Canvas,
    keyboard: Keyboard,
  ) {
    super(
      new Coordinate(
        keyboard.initial.x + (keyboard.size.width * 0.02),
        keyboard.initial.y + (keyboard.size.height * 0.03),
      ),
      new Size(
        keyboard.size.width * 0.09,
        keyboard.size.height * 0.14,
      ),
      canvas,
      "#21618C",
      "#AED6F1",
      0.5,
    );
    this.uppercase = false;
    this.triangle = new Lines(
      canvas,
      "#fff",
    );
    this.triangle.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.5),
      this.initial.y + (this.size.height * 0.2),
    ));
    this.triangle.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.1),
      this.initial.y + (this.size.height * 0.5),
    ));
    this.triangle.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.9),
      this.initial.y + (this.size.height * 0.5),
    ));
    this.triangle.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.5),
      this.initial.y + (this.size.height * 0.2),
    ));
    this.lines = new Lines(
      canvas,
      undefined,
      "#fff",
      2,
    );
    this.lines.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.5),
      this.initial.y + (this.size.height * 0.5)
    ));
    this.lines.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.5),
      this.initial.y + (this.size.height * 0.8)
    ));
  }

  touchendShift(touch: Coordinate) {
    if (this.insideCoordinate(touch) === false) return false;
    this.uppercase = !this.uppercase;
    return true;
  }

  drawShift() {
    this.drawRect();
    this.triangle.drawLines();
    this.lines.drawLines();
  }
}