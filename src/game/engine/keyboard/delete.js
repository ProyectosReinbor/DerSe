
import { Lines } from "../lines.js";
import { Position } from "../position.js";
import { Text } from "../text.js";

export class Delete extends Position {
  constructor(
    canvas,
    keyboard,
  ) {
    super(
      keyboard.initial.x + (keyboard.size.width * 0.63),
      keyboard.initial.y,
      keyboard.size.width * 0.15,
      keyboard.size.height * 0.2,
    );
    this.startTouch = null;
    this.keyboard = keyboard;
    this.lines = new Lines(
      canvas,
      "#21618C",
      "#fff",
      0.5
    );
    this.lines.addLine(
      this.initial.x + (this.size.width * 0.1),
      this.initial.y + (this.size.height * 0.5),
    );
    this.lines.addLine(
      this.initial.x + (this.size.width * 0.3),
      this.initial.y + (this.size.height * 0.2),
    );
    this.lines.addLine(
      this.initial.x + (this.size.width * 0.9),
      this.initial.y + (this.size.height * 0.2),
    );
    this.lines.addLine(
      this.initial.x + (this.size.width * 0.9),
      this.initial.y + (this.size.height * 0.8),
    );
    this.lines.addLine(
      this.initial.x + (this.size.width * 0.3),
      this.initial.y + (this.size.height * 0.8),
    );
    this.lines.addLine(
      this.initial.x + (this.size.width * 0.1),
      this.initial.y + (this.size.height * 0.5),
    );
    this.character = new Text(
      this.initial.x + (this.size.width * 0.50),
      this.initial.y + (this.size.height * 0.15),
      this.size.width * 0.15,
      9,
      canvas,
      "X",
      "#fff",
    );
  }

  touchstartDelete(initialX, initialY) {
    const inside = this.inside(
      initialX,
      initialY,
      initialX,
      initialY
    );
    if (inside === false) return;
    this.deleteLastCharacter();
  }

  deleteLastCharacter() {
    this.startTouch = new Date().getTime();
    this.keyboard.target.deleteLastCharacter();
  }

  touchmoveDelete(initialX, initialY) {
    const inside = this.inside(
      initialX,
      initialY,
      initialX,
      initialY
    );
    if (inside) return;
    this.startTouch = null;
  }

  touchendDelete() {
    if (this.startTouch === null) return false;
    this.startTouch = null;
    return true;
  }

  holdDown() {
    if (this.startTouch === null) return;
    const time = new Date().getTime() - this.startTouch;
    if (time > 250) {
      this.deleteLastCharacter();
    }
  }

  drawDelete() {
    this.holdDown();
    this.lines.drawLines();
    this.character.drawText();
  }
}