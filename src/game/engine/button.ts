import { Canvas } from "../engine/canvas.js";
import { Rect } from "./rect.js";
import { Text } from "./text.js";

export class Button extends Rect {

  text: Text;

  constructor(
    initial: {
      x: number,
      y: number,
    },
    size: {
      width: number,
      height: number,
    },
    canvas: Canvas,
    fillStyle: string,
    strokeStyle: string,
    lineWidth: number,
    text: {
      size: {
        height: number;
      };
      value: string;
      fillStyle: string;
      strokeStyle: string;
    }
  ) {
    super(
      initial,
      size,
      canvas,
      fillStyle,
      strokeStyle,
      lineWidth
    );
    this.text = new Text(
      initial,
      {
        width: this.size.width,
        height: text.size.height,
      },
      canvas,
      text.value,
      text.fillStyle,
      text.strokeStyle
    );
    this.text.initial = this.initial;
  }

  drawButton() {
    this.drawRect();
    this.text.drawText();
  }
}