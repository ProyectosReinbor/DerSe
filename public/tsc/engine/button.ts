import type { Canvas_ENGINE } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context";
import type { Coordinate_ENGINE } from "./coordinate";
import type { Size_ENGINE } from "./size";
import { Square_ENGINE } from "./square";
import type { Text_ENGINE } from "./text";

export class Button_ENGINE extends Square_ENGINE {

  text: Text_ENGINE;

  constructor(props: {
    leftUp: Coordinate_ENGINE,
    size: Size_ENGINE,
    canvas: Canvas_ENGINE,
    fillStyle: FillStyle,
    strokeStyle: StrokeStyle,
    lineWidth: number,
    text: Text_ENGINE,
  }) {
    super({
      leftUp: props.leftUp,
      size: props.size,
      canvas: props.canvas,
      fillStyle: props.fillStyle,
      strokeStyle: props.strokeStyle,
      lineWidth: props.lineWidth,
    });
    this.text = props.text;
  }

  drawButton() {
    this.drawSquare();
    this.text.drawText();
  }
}