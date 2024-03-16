
import {
  type Canvas,
  type Keyboard,
  Coordinate,
  Size,
  Button
} from "../exports.js";

export class CloseQuestion extends Button {
  keyboard: Keyboard;
  constructor(
    canvas: Canvas,
    keyboard: Keyboard,
  ) {
    super(
      new Coordinate(
        keyboard.initial.x + (keyboard.size.width * 0.79),
        keyboard.initial.y + (keyboard.size.height * 0.03),
      ),
      new Size(
        keyboard.size.width * 0.07,
        keyboard.size.height * 0.14,
      ),
      canvas,
      "#21618C",
      "#fff",
      0.5,
      {
        size: new Size(0, 10),
        value: "?",
        fillStyle: "#fff",
        strokeStyle: "",
      }
    );
    this.keyboard = keyboard;
  }

  touchendCloseQuestion(touch: Coordinate) {
    if (this.insideCoordinate(touch) === false) return false;
    if (this.keyboard.target === null) return false;
    this.keyboard.target.addChar("?");
    return true;
  }
}