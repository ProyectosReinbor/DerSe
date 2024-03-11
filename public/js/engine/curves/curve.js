import { Position } from "../position.js";

export class Curve extends Position {
  constructor(
    initialX,
    initialY,
    endX,
    endY,
    canvas,
    controlPointX,
    controlPointY,
  ) {
    const sizeWidth = endX - initialX;
    const sizeHeight = endY - initialY;
    super(
      initialX,
      initialY,
      sizeWidth,
      sizeHeight,
    );
    this.canvas = canvas;
    this.controlPoint = new Position(
      controlPointX,
      controlPointY,
      0,
      0
    );
  }

  drawCurve() {

    const positionOnCanvas = this.canvas.positionOnCanvas(
      this.initial.x,
      this.initial.y,
      this.size.width,
      this.size.height,
      this.end.x,
      this.end.y
    );
    if (positionOnCanvas === false) return;

    const controlPointOnCanvas = this.canvas.positionOnCanvas(
      this.controlPoint.x,
      this.controlPoint.y,
      this.controlPoint.size.width,
      this.controlPoint.size.height,
      this.controlPoint.end.x,
      this.controlPoint.end.y
    );
    if (controlPointOnCanvas === false) return;


    this.canvas.context.moveTo(
      positionOnCanvas.initial.x,
      positionOnCanvas.initial.y
    );

    this.canvas.context.quadraticCurveTo(
      controlPointOnCanvas.initial.x,
      controlPointOnCanvas.initial.y,
      positionOnCanvas.end.x,
      positionOnCanvas.end.y
    );
  }
}