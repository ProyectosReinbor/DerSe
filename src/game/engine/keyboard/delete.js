
import { Canvas } from "../canvas.js";
import { Keyboard } from "../keyboard.js";
import { Lines } from "../lines.js";
import { Position } from "../position.js";
import { Text } from "../text.js";

export class Delete extends Position {

  keyboard: Keyboard;
  character: Text;
  lines: Lines;

  startTouch: number | null = null;

  constructor(
    canvas: Canvas,
    keyboard: Keyboard,
  ) {
    super(
      {
        x: keyboard.initial.x + (keyboard.size.width * 0.63),
        y: keyboard.initial.y,
      },
      {
        width: keyboard.size.width * 0.15,
        height: keyboard.size.height * 0.2,
      }
    );
    this.keyboard = keyboard;
    this.lines = new Lines(
      canvas,
      [
        {
          x: this.initial.x + (this.size.width * 0.1),
          y: this.initial.y + (this.size.height * 0.5),
        },
        {
          x: this.initial.x + (this.size.width * 0.3),
          y: this.initial.y + (this.size.height * 0.2),
        },
        {
          x: this.initial.x + (this.size.width * 0.9),
          y: this.initial.y + (this.size.height * 0.2),
        },
        {
          x: this.initial.x + (this.size.width * 0.9),
          y: this.initial.y + (this.size.height * 0.8),
        },
        {
          x: this.initial.x + (this.size.width * 0.3),
          y: this.initial.y + (this.size.height * 0.8),
        },
        {
          x: this.initial.x + (this.size.width * 0.1),
          y: this.initial.y + (this.size.height * 0.5),
        },
      ],
      "#21618C",
      "#fff",
      0.5,
    );
    this.character = new Text(
      {
        x: this.initial.x + (this.size.width * 0.50),
        y: this.initial.y + (this.size.height * 0.15),
      },
      {
        width: this.size.width * 0.15,
        height: 9,
      },
      canvas,
      "X",
      "#fff",
      "",
    );
  }

  touchstartDelete(touch: Position): void {
    if (this.inside(touch) === false) return;
    this.deleteLastCharacter();
  }

  deleteLastCharacter(): void {
    this.startTouch = new Date().getTime();
    if (this.keyboard.target === null) return;
    this.keyboard.target.deleteLastCharacter();
  }

  touchmoveDelete(touch: Position): void {
    if (this.inside(touch) === false) return;
  }

  touchendDelete(): boolean {
    if (this.startTouch === null) return false;
    this.startTouch = null;
    return true;
  }

  holdDown(): void {
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