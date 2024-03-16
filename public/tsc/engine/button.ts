import type { Canvas } from "./canvas";
import type { Coordinate } from "./coordinate";
import { Rect } from "./rect";
import { Size } from "./size";
import { Text } from "./text";

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