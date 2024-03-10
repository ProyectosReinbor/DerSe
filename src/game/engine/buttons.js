import { Button } from "./button.js";
import { Position } from "./position.js";
import { Canvas } from "./canvas.js";

export class Buttons extends Position {

  canvas: Canvas;
  factory: {
    size: {
      width: number;
      height: number;
    };
    text: {
      size: {
        height: number;
      };
    }
  };
  buttons: Button[] = [];

  constructor(
    initial: {
      x: number;
      y: number;
    },
    size: {
      width: number;
      height: number;
    },
    canvas: Canvas,
    factory: {
      size: {
        width: number;
        height: number;
      };
      text: {
        size: {
          height: number;
        };
      };
    },
  ) {
    super(
      initial,
      size,
    );
    this.canvas = canvas;
    this.factory = factory;
  }

  setButton(
    index: number,
    box: {
      x: number,
      y: number,
    },
    fillStyle: string,
    strokeStyle: string,
    lineWidth: number,
    text: {
      value: string;
      fillStyle: string;
      strokeStyle: string;
    }
  ): Button {
    const button = new Button(
      this.initial,
      this.factory.size,
      this.canvas,
      fillStyle,
      strokeStyle,
      lineWidth,
      {
        size: this.factory.size,
        value: text.value,
        fillStyle: text.fillStyle,
        strokeStyle: text.strokeStyle,
      }
    );
    button.initial.x += button.size.width * box.x;
    button.initial.y += button.size.height * box.y;
    this.buttons[index] = button;
    return button;
  }

  drawButtons(): void {
    this.buttons.forEach(button => button.drawButton());
  }
}