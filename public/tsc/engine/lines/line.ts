import type { Canvas } from "../canvas";
import type { Coordinate } from "../coordinate";
import { Position } from "../position";
import { Size } from "../size";

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