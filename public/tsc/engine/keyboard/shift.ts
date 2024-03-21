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
      initial: props.keyboard.endPercentage(
        new Size({ width: 2, height: 3 })
      ),
      size: props.keyboard.size.percentage(
        new Size({ width: 9, height: 14 })
      ),
      fillStyle: "#21618C",
      strokeStyle: "#AED6F1",
      lineWidth: 0.5,
    });
    this.uppercase = false;
    this.triangle = new Lines({
      initial: this.initial,
      size: this.size,
      canvas: props.canvas,
      fillStyle: "#fff",
      strokeStyle: false,
      lineWidth: 0
    });
    this.triangle.addLine(
      new Size({ width: 50, height: 20 })
    );
    this.triangle.addLine(
      new Size({ width: 10, height: 50 })
    );
    this.triangle.addLine(
      new Size({ width: 90, height: 50 })
    );
    this.triangle.addLine(
      new Size({ width: 50, height: 20 })
    );
    this.lines = new Lines({
      initial: this.initial,
      size: this.size,
      canvas: props.canvas,
      fillStyle: false,
      strokeStyle: "#fff",
      lineWidth: 2,
    });
    this.lines.addLine(
      new Size({ width: 50, height: 50 })
    );
    this.lines.addLine(
      new Size({ width: 50, height: 80 })
    );
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