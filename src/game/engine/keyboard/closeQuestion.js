
import { Button } from "../button.js";
import { Canvas } from "../canvas.js";
import { Keyboard } from "../keyboard.js";
import { Position } from "../position.js";


export class CloseQuestion extends Button {
  constructor(
    canvas,
    keyboard,
  ) {
    super(
      keyboard.initial.x + (keyboard.size.width * 0.79),
      keyboard.initial.y + (keyboard.size.height * 0.03),
      keyboard.size.width * 0.07,
      keyboard.size.height * 0.14,
      canvas,
      "#21618C",
      "#fff",
      0.5,
      10,
      "?",
      "#fff"
    );
    this.keyboard = keyboard;
  }

  touchendCloseQuestion(touch: Position): boolean {
    if (this.inside(touch) === false) return false;
    if (this.keyboard.target === null) return false;
    this.keyboard.target.addChar("?");
    return true;
  }
}