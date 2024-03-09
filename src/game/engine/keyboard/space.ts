import { Button } from "../button.js";
import { Canvas } from "../canvas.js";
import { Keyboard } from "../keyboard.js";
import { Position } from "../position.js";

export class Space extends Button {
  keyboard: Keyboard;

  constructor(
    canvas: Canvas,
    keyboard: Keyboard,
  ) {
    super(
      {
        x: keyboard.initial.x + (keyboard.size.width * 0.27),
        y: keyboard.initial.y + (keyboard.size.height * 0.03),
      },
      {
        width: keyboard.size.width * 0.36,
        height: keyboard.size.height * 0.14,
      },
      canvas,
      "#21618C",
      "#fff",
      0.5,
      {
        size: {
          height: 8,
        },
        value: "Space",
        fillStyle: "#fff",
        strokeStyle: ""
      }
    );
    this.keyboard = keyboard;
  }

  touchendSpace(touch: Position): boolean {
    if (this.inside(touch) === false) return false;
    if (this.keyboard.target === null) return false;
    this.keyboard.target.addChar(" ");
    return true;
  }
}