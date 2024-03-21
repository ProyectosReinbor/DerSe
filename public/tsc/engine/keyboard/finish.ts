import type { Canvas } from "../canvas";
import { Coordinate } from "../coordinate";
import type { Keyboard } from "../keyboard";
import { Lines } from "../lines";
import { Rect } from "../rect";
import { Size } from "../size";


export class Finish extends Rect {
  seen: Lines;
  keyboard: Keyboard;
  constructor(props: {
    canvas: Canvas;
    keyboard: Keyboard;
  }) {
    super({
      canvas: props.canvas,
      initial: props.keyboard.endPercentage(
        new Size({ width: 88, height: 3 })
      ),
      size: props.keyboard.size.percentage(
        new Size({ width: 1, height: 14 })
      ),
      fillStyle: "#21618C",
      strokeStyle: "#fff",
      lineWidth: 0.5,
    });
    this.seen = new Lines({
      initial: this.initial,
      size: this.size,
      canvas: props.canvas,
      fillStyle: false,
      strokeStyle: "#fff",
      lineWidth: 0.5
    });
    this.seen.addLine(new Coordinate({ x: 30, y: 50 }));
    this.seen.addLine(new Coordinate({ x: 50, y: 80 }));
    this.seen.addLine(new Coordinate({ x: 70, y: 20 }));
    this.keyboard = props.keyboard;
  }

  touchendFinish(touch: Coordinate) {
    if (this.insideCoordinate(touch) === false) return false;
    this.keyboard.target = false;
    return true;
  }

  drawFinish() {
    this.drawRect();
    this.seen.drawLines();
  }
}