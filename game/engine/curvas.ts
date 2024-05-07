
import { CurveENGINE } from "./curve.js";

export class CurvesENGINE {

  curves: CurveENGINE[] = [];
  canvas: CanvasENGINE;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  lineWidth: number;

  constructor(
    canvas: CanvasENGINE,
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
    leftUp: CoordinateENGINE,
    rightDown: CoordinateENGINE,
    checkPoint: CoordinateENGINE,
  ) {
    this.curves.push(
      new CurveENGINE(
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