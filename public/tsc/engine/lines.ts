import type { Canvas_ENGINE } from "./canvas.js";
import type { FillStyle, StrokeStyle } from "./context.js";
import type { Coordinate_ENGINE } from "./coordinate.js";
import { Line_ENGINE } from "./line.js";
import { Position_ENGINE } from "./position.js";
import type { Size_ENGINE } from "./size.js";

export class Lines_ENGINE extends Position_ENGINE {

  lines: Line_ENGINE[] = [];
  canvas: Canvas_ENGINE;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  lineWidth: number;

  constructor(props: {
    leftUp: Coordinate_ENGINE;
    size: Size_ENGINE;
    canvas: Canvas_ENGINE;
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

  addLine(props: {
    leftUp: Size_ENGINE;
    rightDown: Size_ENGINE;
  }) {
    this.lines.push(
      new Line_ENGINE({
        leftUp: this.leftUpPlusSizePercentages({
          percentages: props.leftUp
        }),
        rightDown: this.leftUpPlusSizePercentages({
          percentages: props.rightDown
        }),
        canvas: this.canvas,
        fillStyle: this.fillStyle,
        strokeStyle: this.strokeStyle,
        lineWidth: this.lineWidth,
      })
    );
  }

  drawLines() {
    if (this.lines.length === 0) return;
    this.lines.forEach(line => line.drawLine());
  }
}