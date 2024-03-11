import { Curve } from "./curves/curve.js";

export class Curves {
  constructor(
    canvas,
    fillStyle,
    strokeStyle,
    lineWidth,
  ) {
    this.curves = [];
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  addCurve(
    initialX,
    initialY,
    endX,
    endY,
    controlPointX,
    controlPointY,
  ) {
    this.curves.push(
      new Curve(
        initialX,
        initialY,
        endX,
        endY,
        this.canvas,
        controlPointX,
        controlPointY,
      )
    );
  }

  drawCurves() {
    this.canvas.context.beginPath();
    this.curves.forEach(curve => curve.drawCurve());

    if (this.strokeStyle !== undefined) {
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.stroke();
    }

    if (this.fillStyle !== undefined) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }

    this.canvas.context.closePath();
  }
}