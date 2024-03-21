import type { Canvas } from "../canvas";
import { Coordinate } from "../coordinate";
import type { Keyboard } from "../keyboard";
import { Lines } from "../lines";
import { Rect } from "../rect";
import { Size } from "../size";


export class Enter extends Rect {
  triangle: Lines;
  lines: Lines;
  keyboard: Keyboard;
  constructor(props: {
    canvas: Canvas;
    keyboard: Keyboard;
  }) {
    super({
      canvas: props.canvas,
      initial: props.keyboard.endPercentage(
        new Size({ width: 13, height: 3 })
      ),
      size: props.keyboard.size.percentage(
        new Size({ width: 12, height: 14 })
      ),
      fillStyle: "#21618C",
      strokeStyle: "#fff",
      lineWidth: 0.5,
    });
    this.triangle = new Lines({
      initial: this.initial,
      size: this.size,
      canvas: props.canvas,
      fillStyle: "#fff",
      strokeStyle: false,
      lineWidth: 0
    });
    this.triangle.addLine(
      new Size({
        width: 10,
        height: 60
      })
    );
    this.triangle.addLine(
      new Size({
        width: 30,
        height: 40,
      })
    );
    this.triangle.addLine(
      new Size({
        width: 30,
        height: 80,
      })
    );
    this.triangle.addLine(
      new Size({
        width: 10,
        height: 60
      })
    );
    this.lines = new Lines({
      initial: this.initial,
      size: this.size,
      canvas: props.canvas,
      fillStyle: false,
      strokeStyle: "#fff",
      lineWidth: 0.5,
    });
    this.lines.addLine(
      new Size({
        width: 20,
        height: 60
      })
    );
    this.lines.addLine(
      new Size({
        width: 80,
        height: 60
      })
    );
    this.lines.addLine(
      new Size({
        width: 80,
        height: 20
      })
    );
    this.keyboard = props.keyboard;
  }

  touchendEnter(touch: Coordinate) {
    if (this.insideCoordinate(touch) === false) return false;
    if (this.keyboard.target === false) return false;
    this.keyboard.target.addLineBreak();
    return true;
  }

  drawEnter() {
    this.drawRect();
    this.triangle.drawLines();
    this.lines.drawLines();
  }
}