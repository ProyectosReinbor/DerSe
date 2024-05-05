import type { Canvas_ENGINE } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context";
import type { Coordinate_ENGINE } from "./coordinate";
import type { Size_ENGINE } from "./size";
import { Square_ENGINE } from "./square";
import type { Text_ENGINE } from "./text";

export class Button_ENGINE extends Square_ENGINE {

  text: Text_ENGINE;

  constructor(
    leftUp: Coordinate_ENGINE,
    size: Size_ENGINE,
    canvas: Canvas_ENGINE,
    fillStyle: FillStyle,
    strokeStyle: StrokeStyle,
    lineWidth: number,
    text: Text_ENGINE,
  ) {
    super(
      leftUp,
      size,
      canvas,
      fillStyle,
      strokeStyle,
      lineWidth,
    );
    this.text = text;
  }

  drawButton() {
    this.drawSquare();
    this.text.drawText();
  }
}