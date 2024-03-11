import { Rect } from "./rect.js";
import { Text } from "./text.js";

export class Button extends Rect {
  constructor(
    initialX,
    initialY,
    sizeWidth,
    sizeHeight,
    canvas,
    fillStyle,
    strokeStyle,
    lineWidth,
    textSizeHeight,
    textValue,
    textFillStyle,
    textStrokeStyle,
  ) {
    super(
      canvas,
      initialX,
      initialY,
      sizeWidth,
      sizeHeight,
      fillStyle,
      strokeStyle,
      lineWidth
    );
    this.text = new Text(
      0,
      0,
      sizeWidth,
      textSizeHeight,
      canvas,
      textValue,
      textFillStyle,
      textStrokeStyle
    );
    this.text.initial = this.initial;
  }

  drawButton() {
    this.drawRect();
    this.text.drawText();
  }
}