import type { Canvas } from "../canvas";
import { Coordinate } from "../coordinate";
import type { Keyboard } from "../keyboard";
import { Lines } from "../lines";
import { Rect } from "../rect";
import { Size } from "../size";


export class Shift extends Rect {
  uppercase: boolean;
  triangle: Lines;
  lines: Lines;
  constructor(props: {
    canvas: Canvas,
    keyboard: Keyboard,
  }) {
    super({
      canvas: props.canvas,
      initial: new Coordinate({
        x: props.keyboard.initial.x + (props.keyboard.size.width * 0.02),
        y: props.keyboard.initial.y + (props.keyboard.size.height * 0.03),
      }),
      size: new Size({
        width: props.keyboard.size.width * 0.09,
        height: props.keyboard.size.height * 0.14,
      }),
      fillStyle: "#21618C",
      strokeStyle: "#AED6F1",
      lineWidth: 0.5,
    });
    this.uppercase = false;
    this.triangle = new Lines({
      canvas: props.canvas,
      fillStyle: "#fff",
      strokeStyle: "",
      lineWidth: 0
    });
    this.triangle.addLine(new Coordinate({
      x: this.initial.x + (this.size.width * 0.5),
      y: this.initial.y + (this.size.height * 0.2),
    }));
    this.triangle.addLine(new Coordinate({
      x: this.initial.x + (this.size.width * 0.1),
      y: this.initial.y + (this.size.height * 0.5),
    }));
    this.triangle.addLine(new Coordinate({
      x: this.initial.x + (this.size.width * 0.9),
      y: this.initial.y + (this.size.height * 0.5),
    }));
    this.triangle.addLine(new Coordinate({
      x: this.initial.x + (this.size.width * 0.5),
      y: this.initial.y + (this.size.height * 0.2),
    }));
    this.lines = new Lines({
      canvas: props.canvas,
      fillStyle: "",
      strokeStyle: "#fff",
      lineWidth: 2,
    });
    this.lines.addLine(new Coordinate({
      x: this.initial.x + (this.size.width * 0.5),
      y: this.initial.y + (this.size.height * 0.5)
    }));
    this.lines.addLine(new Coordinate({
      x: this.initial.x + (this.size.width * 0.5),
      y: this.initial.y + (this.size.height * 0.8)
    }));
  }

  touchendShift(touch: Coordinate) {
    if (this.insideCoordinate(touch) === false) return false;
    this.uppercase = !this.uppercase;
    return true;
  }

  drawShift() {
    this.drawRect();
    this.triangle.drawLines();
    this.lines.drawLines();
  }
}