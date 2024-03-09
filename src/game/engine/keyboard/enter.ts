import { Lines } from "../lines.js";
import { Rect } from "../rect.js";
import { Keyboard } from "../keyboard.js";
import { Canvas } from "../canvas.js";
import { Position } from "../position.js";

export class Enter extends Rect {
  keyboard: Keyboard;
  triangle: Lines;
  lines: Lines;

  constructor(
    canvas: Canvas,
    keyboard: Keyboard,
  ) {
    super(
      {
        x: keyboard.initial.x + (keyboard.size.width * 0.13),
        y: keyboard.initial.y + (keyboard.size.height * 0.03),
      },
      {
        width: keyboard.size.width * 0.12,
        height: keyboard.size.height * 0.14,
      },
      canvas,
      "#21618C",
      "#fff",
      0.5,
    );
    this.keyboard = keyboard;
    this.triangle = new Lines(
      canvas,
      [
        {
          x: this.initial.x + (this.size.width * 0.1),
          y: this.initial.y + (this.size.height * 0.6),
        },
        {
          x: this.initial.x + (this.size.width * 0.3),
          y: this.initial.y + (this.size.height * 0.4)
        },
        {
          x: this.initial.x + (this.size.width * 0.3),
          y: this.initial.y + (this.size.height * 0.8),
        },
        {
          x: this.initial.x + (this.size.width * 0.1),
          y: this.initial.y + (this.size.height * 0.6),
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
          x: this.initial.x + (this.size.width * 0.2),
          y: this.initial.y + (this.size.height * 0.6),
        },
        {
          x: this.initial.x + (this.size.width * 0.8),
          y: this.initial.y + (this.size.height * 0.6),
        },
        {
          x: this.initial.x + (this.size.width * 0.8),
          y: this.initial.y + (this.size.height * 0.2),
        }
      ],
      "",
      "#fff",
      0.5,
    );
  }

  touchendEnter(touch: Position): boolean {
    if (this.inside(touch) === false) return false;
    if (this.keyboard.target === null) return false;
    this.keyboard.target.addLineBreak();
    return true;
  }

  drawEnter() {
    this.drawRect();
    this.triangle.drawLines();
    this.lines.drawLines();
  }
}