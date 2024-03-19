import type { Canvas } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context";
import { Coordinate } from "./coordinate";
import { Rect } from "./rect";
import { Size } from "./size";
import { Text } from "./text";

export class Button extends Rect {
  text: Text;
  constructor(props: {
    initial: Coordinate,
    size: Size,
    canvas: Canvas,
    fillStyle: FillStyle,
    strokeStyle: StrokeStyle,
    lineWidth: number,
    text: Text,
  }) {
    super(props);
    this.text = props.text;
  }

  drawButton() {
    this.drawRect();
    this.text.drawText();
  }
}