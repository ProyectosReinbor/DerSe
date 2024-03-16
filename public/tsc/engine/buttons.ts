import {
  type Canvas,
  Button,
  Coordinate,
  Size,
  Position
} from "./exports.js";

export class Buttons extends Position {
  buttons: Button[] = [];
  canvas: Canvas;
  buttonParameters: {
    size: Size;
    text: {
      size: Size;
    }
  };
  constructor(
    initial: Coordinate,
    size: Size,
    canvas: Canvas,
    buttonParameters: {
      size: Size;
      text: {
        size: Size;
      }
    }
  ) {
    super(initial, size);
    this.canvas = canvas;
    this.buttonParameters = buttonParameters;
  }

  setButton(
    index: number,
    boxes: Coordinate,
    fillStyle: string,
    strokeStyle: string,
    lineWidth: number,
    buttonParameters: {
      text: {
        value: string;
        fillStyle: string;
        strokeStyle: string;
      }
    }
  ) {
    const button = new Button(
      new Coordinate(
        this.initial.x,
        this.initial.y,
      ),
      new Size(
        this.buttonParameters.size.width,
        this.buttonParameters.size.height,
      ),
      this.canvas,
      fillStyle,
      strokeStyle,
      lineWidth,
      {
        size: this.buttonParameters.text.size,
        value: buttonParameters.text.value,
        fillStyle: buttonParameters.text.fillStyle,
        strokeStyle: buttonParameters.text.strokeStyle,
      }
    );
    const left = button.size.width * boxes.x;
    const top = button.size.height * boxes.y;
    button.initial.x += left;
    button.initial.y += top;
    this.buttons[index] = button;
    return button;
  }

  drawButtons() {
    this.buttons.forEach(button => button.drawButton());
  }
}