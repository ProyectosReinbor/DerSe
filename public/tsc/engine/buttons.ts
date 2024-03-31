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

  constructor(
    leftUp: Coordinate_ENGINE,
    size: Size_ENGINE,
    canvas: Canvas_ENGINE,
    buttonDefault: Button_ENGINE,
  ) {
    super(
      leftUp,
      size,
    );
    this.canvas = canvas;
    this.buttonDefault = buttonDefault;
  }

  pushButton(
    boxes: Plane_ENGINE,
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
    }
  ) {
    const size = new Size_ENGINE(
      this.buttonDefault.size.width,
      this.buttonDefault.size.height,
    );
    const left = size.width * boxes.horizontal;
    const top = size.height * boxes.vertical;
    const newButton = new Button_ENGINE(
      new Coordinate_ENGINE(
        this.leftUp.x + top,
        this.leftUp.y + left,
      ),
      size,
      this.canvas,
      button.fillStyle,
      button.strokeStyle,
      button.lineWidth,
      new Text_ENGINE(
        new Coordinate_ENGINE(0, 0),
        new Size_ENGINE(
          0,
          this.buttonDefault.text.size.height
        ),
        this.canvas,
        button.text.value,
        button.text.fillStyle,
        button.text.strokeStyle,
        button.text.dungeonFont
      )
    );
    this.buttons.push(newButton);
  }

  drawButtons() {
    this.buttons.forEach(button => button.drawButton());
  }
}