import { Coordinate } from "../coordinate.js";

export class Line extends Coordinate {
  constructor(
    initialX,
    initialY,
    canvas,
  ) {
    super(
      initialX,
      initialY,
    );
    this.canvas = canvas;
  }

  drawLine() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    this.canvas.context.lineTo(
      positionOnCanvas.initial.x,
      positionOnCanvas.initial.y
    );
  }
}