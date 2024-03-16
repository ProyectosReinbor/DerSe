import {
  type Canvas,
  type Coordinate,
  Position,
  type Size
} from "./exports.js";

export class Rect extends Position {
  canvas: Canvas;
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  constructor(
    initial: Coordinate,
    size: Size,
    canvas: Canvas,
    fillStyle: string = "",
    strokeStyle: string = "",
    lineWidth: number = 0,
  ) {
    super(initial, size);
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  drawRect() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    if (this.fillStyle.length > 0) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fillRect(
        positionOnCanvas.initial.x,
        positionOnCanvas.initial.y,
        positionOnCanvas.size.width,
        positionOnCanvas.size.height
      );
    }

    if (this.strokeStyle.length > 0) {
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