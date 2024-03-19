import type { Canvas } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context";
import { Coordinate } from "./coordinate";
import { Position } from "./position";
import { Size } from "./size";

export class Rect extends Position {
  canvas: Canvas;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  lineWidth: number;
  constructor(props: {
    canvas: Canvas;
    initial: Coordinate;
    size: Size;
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
    lineWidth: number;
  }) {
    super(props);
    this.canvas = props.canvas;
    this.fillStyle = props.fillStyle;
    this.strokeStyle = props.strokeStyle;
    this.lineWidth = props.lineWidth;
  }

  drawRect() {
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

    if (this.strokeStyle !== false) {
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