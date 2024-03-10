import { Position } from "./position.js";

export class Rect extends Position {
  constructor(
    initial,
    size,
    canvas,
    fillStyle = false,
    strokeStyle = false,
    lineWidth = false,
  ) {
    super(initial, size);
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  drawRect() {
    if (this.fillStyle === false && this.strokeStyle === false) return;

    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    if (this.fillStyle !== false) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fillRect(
        positionOnCanvas.initial.x,
        positionOnCanvas.initial.y,
        positionOnCanvas.size.width,
        positionOnCanvas.size.height
      );
    }

    if (this.strokeStyle !== false && this.lineWidth !== false) {
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.strokeRect(
        positionOnCanvas.initial.x,
        positionOnCanvas.initial.y,
        positionOnCanvas.size.width,
        positionOnCanvas.size.height
      );
    }
  }
}