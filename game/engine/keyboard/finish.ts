import type { Canvas_ENGINE } from "../canvas";
import type { Coordinate_ENGINE } from "../coordinate";
import type { Keyboard_ENGINE } from "../keyboard";
import { Lines_ENGINE } from "../lines";
import { Size_ENGINE } from "../size";
import { Square_ENGINE } from "../square";

export class Finish_ENGINE extends Square_ENGINE {

  seen: Lines_ENGINE;
  keyboard: Keyboard_ENGINE;

  constructor(
    canvas: Canvas_ENGINE,
    keyboard: Keyboard_ENGINE,
  ) {
    super(
      keyboard.leftUpPlusSizePercentages(
        new Size_ENGINE(88, 3)
      ),
      keyboard.size.percentage(
        new Size_ENGINE(1, 14)
      ),
      canvas,
      "#21618C",
      "#fff",
      0.5,
    );
    this.seen = new Lines_ENGINE(
      this.leftUp,
      this.size,
      canvas,
      false,
      "#fff",
      0.5,
    );
    this.seen.addLine(
      new Size_ENGINE(30, 50),
      new Size_ENGINE(50, 80)
    );
    this.seen.addLine(
      new Size_ENGINE(70, 20),
      new Size_ENGINE(0, 0)
    );
    this.keyboard = keyboard;
  }

  touchendFinish(touch: Coordinate_ENGINE) {
    if (this.insidePositionCoordinate(touch) === false)
      return false;

    this.keyboard.input = false;
    return true;
  }

  drawFinish() {
    this.drawSquare();
    this.seen.drawLines();
  }
}