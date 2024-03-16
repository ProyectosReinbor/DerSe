import type { Canvas } from "./canvas";
import type { Coordinate } from "./coordinate";
import { Line } from "./lines/line.js";

export class Lines {
  lines: Line[];
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
    this.lines = [];
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  addLine(initial: Coordinate) {
    this.lines.push(
      new Line(
        initial,
        this.canvas,
      )
    );
  }

  drawLines() {
    if (this.lines.length === 0) return;
    this.canvas.context.beginPath();
    this.lines.forEach(line => line.drawLine());

    if (this.strokeStyle.length > 0) {
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.stroke();
    }

    if (this.fillStyle.length > 0) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }

    this.canvas.context.closePath();
  }
}