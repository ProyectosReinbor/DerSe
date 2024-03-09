import { Canvas } from "./canvas.js";
import { Curve } from "./curves/curve.js";

export class Curves {

  canvas: Canvas;
  curves: Curve[] = [];
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;

  constructor(
    canvas: Canvas,
    curves: {
      initial: {
        x: number;
        y: number;
      }
      end: {
        x: number;
        y: number;
      };
      controlPoint: {
        x: number;
        y: number;
      };
    }[],
    fillStyle: string,
    strokeStyle: string,
    lineWidth: number,
  ) {
    this.canvas = canvas;
    curves.forEach((curve, index) => {
      this.curves[index] = new Curve(
        curve.initial,
        curve.end,
        canvas,
        curve.controlPoint,
      );
    });

    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  drawCurves() {
    if (this.strokeStyle === "" && this.fillStyle === "") return;

    this.canvas.context.beginPath();
    this.curves.forEach(curve => curve.drawCurve());

    if (this.strokeStyle !== "" && this.lineWidth !== 0) {
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.stroke();
    }

    if (this.fillStyle !== "") {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }

    this.canvas.context.closePath();
  }
}