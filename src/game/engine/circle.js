import { Canvas } from "./canvas.js";
import { Position } from "./position.js";

export class Circle extends Position {

  canvas: Canvas;
  startingDegrees: number;
  finalDegrees: number;
  counterclockwise: boolean;
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;

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
    startingDegrees: number,
    finalDegrees: number,
    counterclockwise: boolean,
    fillStyle: string,
    strokeStyle: string,
    lineWidth: number
  ) {
    super(
      initial,
      size
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
    if (this.fillStyle === "" && this.strokeStyle === "") return;
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

    if (this.fillStyle !== "") {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }

    if (this.strokeStyle !== "" && this.lineWidth !== 0) {
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.stroke();
    }

    this.canvas.context.closePath();
  }
}