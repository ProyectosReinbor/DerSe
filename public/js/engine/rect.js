import { Position } from "./position.js";

export class Rect extends Position {
  constructor(
    initialX,
    initialY,
    sizeWidth,
    sizeHeight,
    canvas,
    fillStyle,
    strokeStyle,
    lineWidth,
  ) {
    super(
      initialX,
      initialY,
      sizeWidth,
      sizeHeight
    );
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  drawRect() {
    const positionOnCanvas = this.canvas.positionOnCanvas(
      this.initial.x,
      this.initial.y,
      this.size.width,
      this.size.height,
      this.end.x,
      this.end.y
    );
    if (positionOnCanvas === false) return;

    if (this.fillStyle !== undefined) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fillRect(
        positionOnCanvas.initial.x,
        positionOnCanvas.initial.y,
        positionOnCanvas.size.width,
        positionOnCanvas.size.height
      );
    }

    if (this.strokeStyle !== undefined) {
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