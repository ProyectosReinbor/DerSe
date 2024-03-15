import type { Canvas } from "../canvas.js";
import type { Coordinate } from "../coordinate.js";
import { Position } from "../position.js";
import { Size } from "../size.js";

export class Line extends Position {
  canvas: Canvas;
  constructor(
    initial: Coordinate,
    canvas: Canvas,
  ) {
    super(initial, new Size);
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