import type { Canvas } from "./canvas";
import type { Coordinate } from "./coordinate";
import { Position } from "./position";
import type { Size } from "./size";

export class Circle extends Position {
  canvas: Canvas;
  startingDegrees: number;
  finalDegrees: number;
  counterclockwise: boolean;
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  constructor(
    initial: Coordinate,
    size: Size,
    canvas: Canvas,
    startingDegrees: number = 0,
    finalDegrees: number = 360,
    counterclockwise: boolean = false,
    fillStyle: string = "",
    strokeStyle: string = "",
    lineWidth: number = 0,
  ) {
    super(
      initial,
      size,
    );
    this.canvas = canvas;
    this.startingDegrees = startingDegrees;
    this.finalDegrees = finalDegrees;
    this.counterclockwise = counterclockwise;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  get startingRadians() {
    return this.startingDegrees * (Math.PI / 180);
  }

  get finalRadians() {
    return this.finalDegrees * (Math.PI / 180);
  }

  drawCircle() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    this.canvas.context.beginPath();

    const radiusWidth = positionOnCanvas.size.width / 2;
    const radiusHeight = positionOnCanvas.size.height / 2;

    const radius = Math.min(radiusWidth, radiusHeight);

    this.canvas.context.arc(
      positionOnCanvas.initial.x + radiusWidth,
      positionOnCanvas.initial.y + radiusHeight,
      radius,
      this.startingRadians,
      this.finalRadians,
      this.counterclockwise,
    );

    if (this.fillStyle.length > 0) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }

    if (this.strokeStyle.length > 0) {
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.stroke();
    }

    this.canvas.context.closePath();
  }
}