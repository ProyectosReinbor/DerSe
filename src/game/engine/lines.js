import { Line } from "./lines/line.js";

export class Lines {
  constructor(
    canvas,
    fillStyle = false,
    strokeStyle = false,
    lineWidth = false,
    lines = false,
  ) {
    this.lines = [];
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
    if (lines !== false) {
      lines.forEach((initial, index) => {
        this.setLine(
          index,
          initial,
        );
      });
    }
  }

  setLine(
    index,
    initial,
  ) {
    this.lines[index] = new Line(
      initial,
      this.canvas,
    );
  }

  drawLines() {
    if (this.fillStyle === false && this.strokeStyle === false)
      throw new Error("fillStyle and strokeStyle are both false");

    this.canvas.context.beginPath();
    this.lines.forEach(line => line.drawLine());

    if (this.strokeStyle !== false && this.lineWidth !== false) {
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.stroke();
    }

    if (this.fillStyle !== false) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }

    this.canvas.context.closePath();
  }
}