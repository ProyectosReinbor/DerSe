
import { Curve_ENGINE } from "./curve.js";

export class Curves_ENGINE {

  curves: Curve_ENGINE[] = [];
  canvas: Canvas_ENGINE;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  lineWidth: number;

  constructor(
    canvas: Canvas_ENGINE,
    fillStyle: FillStyle,
    strokeStyle: StrokeStyle,
    lineWidth: number,
  ) {
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  addCurve(
    leftUp: Coordinate_ENGINE,
    rightDown: Coordinate_ENGINE,
    checkPoint: Coordinate_ENGINE,
  ) {
    this.curves.push(
      new Curve_ENGINE(
        leftUp,
        rightDown,
        this.canvas,
        checkPoint,
      )
    );
  }

  drawCurves() {
    this.canvas.context.beginPath();
    this.curves.forEach(curve => curve.drawCurve());

    if (this.strokeStyle !== false) {
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.stroke();
    }

    if (this.fillStyle !== false) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }

    this.canvas.context.closePath();
  }
}