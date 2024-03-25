

import type { Canvas_ENGINE } from "./canvas.js";
import type { FillStyle, StrokeStyle } from "./context.js";
import type { Coordinate_ENGINE } from "./coordinate.js";
import { Curve_ENGINE } from "./curve.js";

export class Curves_ENGINE {
  curves: Curve_ENGINE[] = [];
  canvas: Canvas_ENGINE;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  lineWidth: number;
  constructor(props: {
    canvas: Canvas_ENGINE;
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
    lineWidth: number;
  }) {
    this.canvas = props.canvas;
    this.fillStyle = props.fillStyle;
    this.strokeStyle = props.strokeStyle;
    this.lineWidth = props.lineWidth;
  }

  addCurve(props: {
    leftUp: Coordinate_ENGINE,
    rightDown: Coordinate_ENGINE,
    checkPoint: Coordinate_ENGINE,
  }) {
    this.curves.push(
      new Curve_ENGINE({
        leftUp: props.leftUp,
        rightDown: props.rightDown,
        canvas: this.canvas,
        checkPoint: props.checkPoint,
      })
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