import { Position } from "../position.js";

export class Line extends Position {
  constructor(
    initial,
    canvas,
  ) {
    super(initial);
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