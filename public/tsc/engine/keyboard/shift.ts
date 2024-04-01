import type { Canvas_ENGINE } from "../canvas";
import type { Coordinate_ENGINE } from "../coordinate";
import type { Keyboard_ENGINE } from "../keyboard";
import { Lines_ENGINE } from "../lines";
import { Size_ENGINE } from "../size";
import { Square_ENGINE } from "../square";

export class Shift_ENGINE extends Square_ENGINE {

  uppercase: boolean;
  triangle: Lines_ENGINE;
  lines: Lines_ENGINE;

  constructor(
    canvas: Canvas_ENGINE,
    keyboard: Keyboard_ENGINE,
  ) {
    super(
      keyboard.leftUpPlusSizePercentages(
        new Size_ENGINE(2, 3)
      ),
      keyboard.size.getPercentages(
        new Size_ENGINE(9, 14)
      ),
      canvas,
      "#21618C",
      "#AED6F1",
      0.5,
    );
    this.uppercase = false;
    this.triangle = new Lines_ENGINE(
      this.leftUp,
      this.size,
      canvas,
      "#fff",
      false,
      0
    );
    this.triangle.addLine(
      new Size_ENGINE(50, 20),
      new Size_ENGINE(10, 50)
    );
    this.triangle.addLine(
      new Size_ENGINE(90, 50),
      new Size_ENGINE(50, 20)
    );
    this.lines = new Lines_ENGINE(
      this.leftUp,
      this.size,
      canvas,
      false,
      "#fff",
      2,
    );
    this.lines.addLine(
      new Size_ENGINE(50, 50),
      new Size_ENGINE(50, 80)
    );
  }

  touchendShift(touch: Coordinate_ENGINE) {
    if (this.insidePositionCoordinate(touch) === false)
      return false;

    this.uppercase = !this.uppercase;
    return true;
  }

  drawShift() {
    this.drawSquare();
    this.triangle.drawLines();
    this.lines.drawLines();
  }
}