import { Canvas } from "../canvas.js";
import { Keyboard } from "../keyboard.js";
import { Lines } from "../lines.js";
import { Position } from "../position.js";
import { Rect } from "../rect.js";

export class Shift extends Rect {

  triangle: Lines;
  lines: Lines;
  keyboard: Keyboard;
  mode: "uppercase" | "lowercase" = "lowercase";

  constructor(
    canvas: Canvas,
    keyboard: Keyboard,
  ) {
    super(
      {
        x: keyboard.initial.x + (keyboard.size.width * 0.02),
        y: keyboard.initial.y + (keyboard.size.height * 0.03),
      },
      {
        width: keyboard.size.width * 0.09,
        height: keyboard.size.height * 0.14,
      },
      canvas,
      "#21618C",
      "#AED6F1",
      0.5,
    );
    this.keyboard = keyboard;

    this.triangle = new Lines(
      canvas,
      [
        {
          x: this.initial.x + (this.size.width * 0.5),
          y: this.initial.y + (this.size.height * 0.2),
        },
        {
          x: this.initial.x + (this.size.width * 0.1),
          y: this.initial.y + (this.size.height * 0.5),
        },
        {
          x: this.initial.x + (this.size.width * 0.9),
          y: this.initial.y + (this.size.height * 0.5),
        },
        {
          x: this.initial.x + (this.size.width * 0.5),
          y: this.initial.y + (this.size.height * 0.2),
        },
      ],
      "#fff",
      "",
      0,
    );

    this.lines = new Lines(
      canvas,
      [
        {
          x: this.initial.x + (this.size.width * 0.5),
          y: this.initial.y + (this.size.height * 0.5),
        },
        {
          x: this.initial.x + (this.size.width * 0.5),
          y: this.initial.y + (this.size.height * 0.8),
        },
      ],
      "",
      "#fff",
      2,
    );
  }

  touchendShift(touch: Position): boolean {
    if (this.inside(touch) === false) return false;
    this.mode = this.mode === "uppercase"
      ? "lowercase"
      : "uppercase";
    return true;
  }

  drawShift() {
    this.drawRect();
    this.triangle.drawLines();
    this.lines.drawLines();
  }
}