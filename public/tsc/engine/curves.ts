

import type { Canvas } from "./canvas.js";
import type { FillStyle, StrokeStyle } from "./context.js";
import type { Coordinate } from "./coordinate.js";
import { Curve } from "./curve.js";

export class Curves {
  curves: Curve[] = [];
  canvas: Canvas;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  lineWidth: number;
  constructor(props: {
    canvas: Canvas;
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
    lineWidth: number;
  }) {
    this.canvas = props.canvas;
    this.fillStyle = props.fillStyle;
    this.strokeStyle = props.strokeStyle;
    this.lineWidth = props.lineWidth;
  }

  addCurve(
    initial: Coordinate,
    end: Coordinate,
    controlPoint: Coordinate,
  ) {
    this.curves.push(
      new Curve({
        initial,
        end,
        canvas: this.canvas,
        controlPoint,
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