import type { Canvas } from "./canvas.js";
import { Coordinate } from "./coordinate.js";
import { Rect } from "./rect.js";
import { Size } from "./size.js";
import { Text } from "./text.js";

export class Button extends Rect {
  text: Text;
  constructor(
    initial: Coordinate,
    size: Size,
    canvas: Canvas,
    fillStyle: string = "",
    strokeStyle: string = "",
    lineWidth: number = 0,
    textParameters: {
      size: Size;
      value: string;
      fillStyle: string;
      strokeStyle: string;
    },
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
      this.initial,
      new Size(
        size.width,
        textParameters.size.height
      ),
      canvas,
      textParameters.value,
      textParameters.fillStyle,
      textParameters.strokeStyle,
    );
  }

  drawButton() {
    this.drawRect();
    this.text.drawText();
  }
}