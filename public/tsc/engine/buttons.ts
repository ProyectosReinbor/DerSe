import { Button } from "./button";
import type { Canvas } from "./canvas";
import { Coordinate } from "./coordinate";
import { Position } from "./position";
import { Size } from "./size";
import { Text } from "./text";


export class Buttons extends Position {
  buttons: Button[] = [];
  canvas: Canvas;
  buttonDefault: Button;
  constructor(props: {
    initial: Coordinate;
    size: Size;
    canvas: Canvas;
    buttonDefault: Button;
  }) {
    super(props);
    this.canvas = props.canvas;
    this.buttonDefault = props.buttonDefault;
  }

  setButton(
    index: number,
    boxes: Coordinate,
    newButton: Button
  ) {
    const size = new Size({
      width: this.buttonDefault.size.width,
      height: this.buttonDefault.size.height,
    });
    const left = size.width * boxes.x;
    const top = size.height * boxes.y;
    this.buttons[index] = new Button({
      initial: new Coordinate({
        x: this.initial.x + top,
        y: this.initial.y + left,
      }),
      size,
      canvas: this.canvas,
      fillStyle: newButton.fillStyle,
      strokeStyle: newButton.strokeStyle,
      lineWidth: newButton.lineWidth,
      text: new Text({
        canvas: this.canvas,
        initial: new Coordinate({ x: 0, y: 0 }),
        size: new Size({
          width: 0,
          height: this.buttonDefault.text.size.height
        }),
        value: newButton.text.value,
        fillStyle: newButton.text.fillStyle,
        strokeStyle: newButton.text.strokeStyle,
        dungeonFont: false
      })
    });
  }

  drawButtons() {
    this.buttons.forEach(button => button.drawButton());
  }
}