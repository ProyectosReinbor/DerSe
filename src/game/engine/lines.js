import { Line } from "./lines/line.js";

export class Lines {
  constructor(
    canvas,
    fillStyle,
    strokeStyle,
    lineWidth,
  ) {
    this.lines = [];
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  addLine(
    initialX,
    initialY,
  ) {
    this.lines.push(
      new Line(
        initialX,
        initialY,
        this.canvas,
      )
    );
  }

  drawLines() {
    this.canvas.context.beginPath();
    this.lines.forEach(line => line.drawLine());

    if (this.strokeStyle !== undefined) {
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.stroke();
    }

    if (this.fillStyle !== undefined) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }

    this.canvas.context.closePath();
  }
}