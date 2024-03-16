

import type { Canvas } from "./canvas.js";
import type { Coordinate } from "./coordinate.js";
import { Curve } from "./curves/curve.js";

export class Curves {
  curves: Curve[];
  canvas: Canvas;
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  constructor(
    canvas: Canvas,
    fillStyle: string = "",
    strokeStyle: string = "",
    lineWidth: number = 0,
  ) {
    this.curves = [];
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  addCurve(
    initial: Coordinate,
    end: Coordinate,
    controlPoint: Coordinate,
  ) {
    this.curves.push(
      new Curve(
        initial,
        end,
        this.canvas,
        controlPoint,
      )
    );
  }

  drawCurves() {
    this.canvas.context.beginPath();
    this.curves.forEach(curve => curve.drawCurve());

    if (this.strokeStyle.length > 0) {
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.stroke();
    }

    if (this.fillStyle.length > 0) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }

    this.canvas.context.closePath();
  }
}