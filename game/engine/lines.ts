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

  constructor(
    leftUp: Coordinate_ENGINE,
    size: Size_ENGINE,
    canvas: Canvas_ENGINE,
    fillStyle: FillStyle,
    strokeStyle: StrokeStyle,
    lineWidth: number,
  ) {
    super(
      leftUp,
      size
    );
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  addLine(
    leftUp: Size_ENGINE,
    rightDown: Size_ENGINE,
  ) {
    this.lines.push(
      new Line_ENGINE(
        this.leftUpPlusSizePercentages(leftUp),
        this.leftUpPlusSizePercentages(rightDown),
        this.canvas,
        this.fillStyle,
        this.strokeStyle,
        this.lineWidth,
      )
    );
  }

  drawLines() {
    if (this.lines.length === 0) return;
    this.lines.forEach(line => line.drawLine());
  }
}