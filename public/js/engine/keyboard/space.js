import { Button } from "../button.js";

export class Space extends Button {
  constructor(
    canvas,
    keyboard,
  ) {
    super(
      keyboard.initial.x + (keyboard.size.width * 0.27),
      keyboard.initial.y + (keyboard.size.height * 0.03),
      keyboard.size.width * 0.36,
      keyboard.size.height * 0.14,
      canvas,
      "#21618C",
      "#fff",
      0.5,
      8,
      "Space",
      "#fff",
    );
    this.keyboard = keyboard;
  }

  touchendSpace(x, y) {
    if (this.inside(x, y, x, y) === false) return false;
    this.keyboard.target.addChar(" ");
    return true;
  }
}