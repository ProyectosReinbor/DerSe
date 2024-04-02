import type { Canvas_ENGINE } from "../canvas";
import type { Coordinate_ENGINE } from "../coordinate";
import type { Keyboard_ENGINE } from "../keyboard";
import { Lines_ENGINE } from "../lines";
import { Size_ENGINE } from "../size";
import { Square_ENGINE } from "../square";

export class Enter_ENGINE extends Square_ENGINE {

  triangle: Lines_ENGINE;
  lines: Lines_ENGINE;
  keyboard: Keyboard_ENGINE;

  constructor(
    canvas: Canvas_ENGINE,
    keyboard: Keyboard_ENGINE,
  ) {
    super(
      keyboard.leftUpPlusSizePercentages(
        new Size_ENGINE(13, 3)
      ),
      keyboard.size.percentage(
        new Size_ENGINE(12, 14)
      ),
      canvas,
      "#21618C",
      "#fff",
      0.5,
    );
    this.triangle = new Lines_ENGINE(
      this.leftUp,
      this.size,
      canvas,
      "#fff",
      false,
      0
    );
    this.triangle.addLine(
      new Size_ENGINE(10, 60),
      new Size_ENGINE(30, 40)
    );
    this.triangle.addLine(
      new Size_ENGINE(30, 80),
      new Size_ENGINE(10, 60)
    );
    this.lines = new Lines_ENGINE(
      this.leftUp,
      this.size,
      canvas,
      false,
      "#fff",
      0.5,
    );
    this.lines.addLine(
      new Size_ENGINE(20, 60),
      new Size_ENGINE(80, 60)
    );
    this.lines.addLine(
      new Size_ENGINE(80, 20),
      new Size_ENGINE(0, 0)
    );
    this.keyboard = keyboard;
  }

  touchendEnter(touch: Coordinate_ENGINE) {
    if (this.insidePositionCoordinate(touch) === false)
      return false;

    if (this.keyboard.input === false)
      return false;

    this.keyboard.input.addLineBreak();
    return true;
  }

  drawEnter() {
    this.drawSquare();
    this.triangle.drawLines();
    this.lines.drawLines();
  }
}