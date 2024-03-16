import type { Canvas } from "../canvas";
import { Coordinate } from "../coordinate";
import type { Keyboard } from "../keyboard";
import { Lines } from "../lines";
import { Rect } from "../rect";
import { Size } from "../size";


export class Enter extends Rect {
  triangle: Lines;
  lines: Lines;
  keyboard: Keyboard;
  constructor(
    canvas: Canvas,
    keyboard: Keyboard,
  ) {
    super(
      new Coordinate(
        keyboard.initial.x + (keyboard.size.width * 0.13),
        keyboard.initial.y + (keyboard.size.height * 0.03),
      ),
      new Size(
        keyboard.size.width * 0.12,
        keyboard.size.height * 0.14,
      ),
      canvas,
      "#21618C",
      "#fff",
      0.5,
    );
    this.triangle = new Lines(
      canvas,
      "#fff",
    );
    this.triangle.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.1),
      this.initial.y + (this.size.height * 0.6),
    ));
    this.triangle.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.3),
      this.initial.y + (this.size.height * 0.4),
    ));
    this.triangle.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.3),
      this.initial.y + (this.size.height * 0.8),
    ));
    this.triangle.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.1),
      this.initial.y + (this.size.height * 0.6),
    ));
    this.lines = new Lines(
      canvas,
      undefined,
      "#fff",
      0.5,
    );
    this.lines.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.2),
      this.initial.y + (this.size.height * 0.6),
    ));
    this.lines.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.8),
      this.initial.y + (this.size.height * 0.6),
    ));
    this.lines.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.8),
      this.initial.y + (this.size.height * 0.2),
    ));
    this.keyboard = keyboard;
  }

  touchendEnter(touch: Coordinate) {
    if (this.insideCoordinate(touch) === false) return false;
    if (this.keyboard.target === null) return false;
    this.keyboard.target.addLineBreak();
    return true;
  }

  drawEnter() {
    this.drawRect();
    this.triangle.drawLines();
    this.lines.drawLines();
  }
}