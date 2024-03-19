import type { Canvas } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context.js";
import { Coordinate } from "./coordinate.js";
import { Line } from "./line.js";
import { Position } from "./position.js";
import { Size } from "./size.js";

export class Lines extends Position {
  lines: Line[] = [];
  canvas: Canvas;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  lineWidth: number;
  constructor(props: {
    initial: Coordinate;
    size: Size;
    canvas: Canvas;
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
    lineWidth: number;
  }) {
    super(props);
    this.canvas = props.canvas;
    this.fillStyle = props.fillStyle;
    this.strokeStyle = props.strokeStyle;
    this.lineWidth = props.lineWidth;
  }

  addLine(percentage: Coordinate) {
    this.lines.push(
      new Line({
        initial: this.endPercentage(percentage),
        canvas: this.canvas,
      })
    );
  }

  drawLines() {
    if (this.lines.length === 0) return;
    this.canvas.context.beginPath();
    this.lines.forEach(line => line.drawLine());

    if (this.strokeStyle !== false) {
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.stroke();
    }

    if (this.fillStyle !== false) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }

    this.canvas.context.closePath();
  }
}