import { Canvas } from "../canvas.js";
import { Position } from "../position.js";

export class Line extends Position {
  canvas: Canvas;

  constructor(
    initial: {
      x: number;
      y: number;
    },
    size: {
      width: number;
      height: number;
    },
    canvas: Canvas,
  ) {
    super(
      initial,
      size
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