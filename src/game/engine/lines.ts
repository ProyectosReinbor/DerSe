import { Canvas } from "./canvas.js";
import { Line } from "./lines/line.js";

export class Lines {

  canvas: Canvas;
  lines: Line[] = [];
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;

  constructor(
    canvas: Canvas,
    lines: {
      x: number,
      y: number,
    }[],
    fillStyle: string,
    strokeStyle: string,
    lineWidth: number,
  ) {
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;

    lines.forEach((line, index) => {
      this.setLine(
        index,
        line,
      );
    });
  }

  setLine(
    index: number,
    initial: {
      x: number;
      y: number;
    }
  ) {
    this.lines[index] = new Line(
      initial,
      {
        width: 0,
        height: 0,
      },
      this.canvas,
    );
  }

  drawLines() {
    if (this.fillStyle === "" && this.strokeStyle === "") return;

    this.canvas.context.beginPath();
    this.lines.forEach(line => line.drawLine());

    if (this.strokeStyle !== "" && this.lineWidth > 0) {
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.stroke();
    }

    if (this.fillStyle !== "") {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }

    this.canvas.context.closePath();
  }
}