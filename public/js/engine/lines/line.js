import { Coordinate } from "../coordinate.js";

export class Line extends Coordinate {
  constructor(
    x,
    y,
    canvas,
  ) {
    super(x, y);
    this.canvas = canvas;
  }

  drawLine() {
    const positionOnCanvas = this.canvas.positionOnCanvas(
      this.x,
      this.y,
      0,
      0,
      this.end.x,
      this.end.y
    );
    if (positionOnCanvas === false) return;

    this.canvas.context.lineTo(
      positionOnCanvas.initial.x,
      positionOnCanvas.initial.y
    );
  }
}