import { Button_ENGINE } from "./button";
import type { Canvas_ENGINE } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context";
import { Coordinate_ENGINE } from "./coordinate";
import type { Plane_ENGINE } from "./plane";
import { Position_ENGINE } from "./position";
import { Size_ENGINE } from "./size";
import { Text_ENGINE } from "./text";

export class Buttons extends Position_ENGINE {

  buttons: Button_ENGINE[] = [];
  canvas: Canvas_ENGINE;
  buttonDefault: Button_ENGINE;

  constructor(props: {
    leftUp: Coordinate_ENGINE;
    size: Size_ENGINE;
    canvas: Canvas_ENGINE;
    buttonDefault: Button_ENGINE;
  }) {
    super({
      leftUp: props.leftUp,
      size: props.size,
    });
    this.canvas = props.canvas;
    this.buttonDefault = props.buttonDefault;
  }

  pushButton(props: {
    boxes: Plane_ENGINE;
    button: {
      fillStyle: FillStyle;
      strokeStyle: StrokeStyle;
      lineWidth: number;
      text: {
        value: string;
        fillStyle: FillStyle;
        strokeStyle: StrokeStyle;
        dungeonFont: boolean;
      };
    };
  }) {
    const size = new Size_ENGINE({
      width: this.buttonDefault.size.width,
      height: this.buttonDefault.size.height,
    });
    const left = size.width * props.boxes.horizontal;
    const top = size.height * props.boxes.vertical;
    const button = new Button_ENGINE({
      leftUp: new Coordinate_ENGINE({
        x: this.leftUp.x + top,
        y: this.leftUp.y + left,
      }),
      size,
      canvas: this.canvas,
      fillStyle: props.button.fillStyle,
      strokeStyle: props.button.strokeStyle,
      lineWidth: props.button.lineWidth,
      text: new Text_ENGINE({
        canvas: this.canvas,
        leftUp: new Coordinate_ENGINE({
          x: 0,
          y: 0
        }),
        size: new Size_ENGINE({
          width: 0,
          height: this.buttonDefault.text.size.height
        }),
        value: props.button.text.value,
        fillStyle: props.button.text.fillStyle,
        strokeStyle: props.button.text.strokeStyle,
        dungeonFont: props.button.text.dungeonFont
      })
    });
    this.buttons.push(button);
  }

  drawButtons() {
    this.buttons.forEach(button => button.drawButton());
  }
}