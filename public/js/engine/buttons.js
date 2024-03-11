import { Button } from "./button.js";
import { Position } from "./position.js";

export class Buttons extends Position {
  constructor(
    initialX,
    initialY,
    sizeWidth,
    sizeHeight,
    canvas,
    factorySizeWidth,
    factorySizeHeight,
    factoryTextSizeHeight,
  ) {
    super(
      initialX,
      initialY,
      sizeWidth,
      sizeHeight,
    );
    this.buttons = [];
    this.canvas = canvas;
    this.factory = {
      size: new Size(
        factorySizeWidth,
        factorySizeHeight,
      ),
      text: {
        size: new Size(
          0,
          factoryTextSizeHeight,
        ),
      }
    };
  }

  setButton(
    index,
    boxX,
    boxY,
    fillStyle,
    strokeStyle,
    lineWidth,
    textValue,
    textFillStyle,
    textStrokeStyle,
  ) {
    const button = new Button(
      this.initial.x,
      this.initial.y,
      this.factory.size.width,
      this.factory.size.height,
      this.canvas,
      fillStyle,
      strokeStyle,
      lineWidth,
      this.factory.size.height,
      textValue,
      textFillStyle,
      textStrokeStyle,
    );
    const left = button.size.width * boxX;
    const top = button.size.height * boxY;
    button.initial.x += left;
    button.initial.y += top;
    this.buttons[index] = button;
    return button;
  }

  drawButtons() {
    this.buttons.forEach(button => button.drawButton());
  }
}