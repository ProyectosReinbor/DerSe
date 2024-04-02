import type { Canvas_ENGINE } from "../canvas";
import type { Coordinate_ENGINE } from "../coordinate";
import type { Keyboard_ENGINE } from "../keyboard";
import { Lines_ENGINE } from "../lines";
import { Position_ENGINE } from "../position";
import { Size_ENGINE } from "../size";
import { Text_ENGINE } from "../text";

export class Delete_ENGINE extends Position_ENGINE {

  startTouch: number | false = false;
  lines: Lines_ENGINE;
  character: Text_ENGINE;
  keyboard: Keyboard_ENGINE;

  constructor(
    canvas: Canvas_ENGINE,
    keyboard: Keyboard_ENGINE,
  ) {
    super(
      keyboard.leftUpPlusSizePercentages(
        new Size_ENGINE(63, 0)
      ),
      keyboard.size.percentage(
        new Size_ENGINE(15, 20)
      ),
    );
    this.lines = new Lines_ENGINE(
      this.leftUp,
      this.size,
      canvas,
      "#21618C",
      "#fff",
      0.5
    );
    this.lines.addLine(
      new Size_ENGINE(10, 50),
      new Size_ENGINE(30, 20)
    );
    this.lines.addLine(
      new Size_ENGINE(90, 20),
      new Size_ENGINE(90, 80)
    );
    this.lines.addLine(
      new Size_ENGINE(30, 80),
      new Size_ENGINE(10, 50)
    );
    this.character = new Text_ENGINE(
      this.leftUpPlusSizePercentages(
        new Size_ENGINE(50, 15)
      ),
      this.size.percentage(
        new Size_ENGINE(15, 100)
      ),
      canvas,
      "X",
      "#fff",
      false,
      true
    );
    this.keyboard = keyboard;
  }

  touchstartDelete(touch: Coordinate_ENGINE) {
    const inside = this.insidePositionCoordinate(touch);
    if (inside === false)
      return;

    this.deleteLastCharacter();
  }

  deleteLastCharacter() {
    this.startTouch = new Date().getTime();
    if (this.keyboard.input === false)
      return;

    this.keyboard.input.deleteLastCharacter();
  }

  touchmoveDelete(touch: Coordinate_ENGINE) {
    const inside = this.insidePositionCoordinate(touch);
    if (inside === true)
      return;

    this.startTouch = false;
  }

  touchendDelete() {
    if (this.startTouch === false)
      return false;

    this.startTouch = false;
    return true;
  }

  holdDown() {
    if (this.startTouch === false)
      return;

    const time = new Date().getTime() - this.startTouch;
    if (time > 250)
      this.deleteLastCharacter();
  }

  drawDelete() {
    this.holdDown();
    this.lines.drawLines();
    this.character.drawText();
  }
}