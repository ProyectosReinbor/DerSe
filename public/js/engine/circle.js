import { Position } from "./position.js";

export class Circle extends Position {
  constructor(
    initialX,
    initialY,
    sizeWidth,
    sizeHeight,
    canvas,
    startingDegrees,
    finalDegrees,
    counterclockwise,
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
    const positionOnCanvas = this.canvas.positionOnCanvas(
      this.initial.x,
      this.initial.y,
      this.size.width,
      this.size.height,
      this.end.x,
      this.end.y
    );
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

    if (this.fillStyle !== undefined) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }

    if (this.strokeStyle !== undefined) {
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.stroke();
    }

    this.canvas.context.closePath();
  }
}