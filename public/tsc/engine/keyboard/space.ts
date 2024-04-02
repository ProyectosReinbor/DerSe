import { Button_ENGINE } from "../button";
import type { Canvas_ENGINE } from "../canvas";
import { Coordinate_ENGINE } from "../coordinate";
import type { Keyboard_ENGINE } from "../keyboard";
import { Size_ENGINE } from "../size";
import { Text_ENGINE } from "../text";

export class Space_ENGINE extends Button_ENGINE {

  keyboard: Keyboard_ENGINE;

  constructor(
    canvas: Canvas_ENGINE,
    keyboard: Keyboard_ENGINE,
  ) {
    super(
      keyboard.leftUpPlusSizePercentages(
        new Size_ENGINE(27, 3)
      ),
      keyboard.size.percentage(
        new Size_ENGINE(36, 14)
      ),
      canvas,
      "#21618C",
      "#fff",
      0.5,
      new Text_ENGINE(
        new Coordinate_ENGINE(0, 0),
        new Size_ENGINE(0, 8),
        canvas,
        "Space",
        "#fff",
        false,
        false
      )
    );
    this.keyboard = keyboard;
  }

  touchendSpace(touch: Coordinate_ENGINE) {
    if (this.insidePositionCoordinate(touch) === false)
      return false;

    if (this.keyboard.input === false)
      return false;

    this.keyboard.input.addChar(" ");
    return true;
  }
}