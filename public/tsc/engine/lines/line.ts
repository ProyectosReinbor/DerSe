import {
  type Canvas,
  type Coordinate,
  Position,
  Size
} from "../exports.js";

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