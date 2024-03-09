import { Canvas } from "./canvas.js";
import { Position } from "./position.js";

export class Rect extends Position {

  canvas: Canvas;
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;

  constructor(
    initial: {
      x: number,
      y: number
    },
    size: {
      width: number,
      height: number
    },
    canvas: Canvas,
    fillStyle: string,
    strokeStyle: string,
    lineWidth: number,
  ) {
    super(
      {
        x: initial.x,
        y: initial.y,
      },
      {
        width: size.width,
        height: size.height,
      }
    );
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  drawRect() {
    if (this.fillStyle === "" && this.strokeStyle === "") return;

    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    if (this.fillStyle !== "") {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fillRect(
        positionOnCanvas.initial.x,
        positionOnCanvas.initial.y,
        positionOnCanvas.size.width,
        positionOnCanvas.size.height
      );
    }

    if (this.strokeStyle !== "" && this.lineWidth > 0) {
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