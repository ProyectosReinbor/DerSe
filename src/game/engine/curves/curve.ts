import { Canvas } from "../canvas.js";
import { Position } from "../position.js";

export class Curve extends Position {

  canvas: Canvas;
  controlPoint: Position;

  constructor(
    initial: {
      x: number;
      y: number;
    },
    end: {
      x: number;
      y: number;
    },
    canvas: Canvas,
    controlPoint: {
      x: number;
      y: number;
    },
  ) {
    const size = {
      width: end.x - initial.x,
      height: end.y - initial.y,
    };
    super(
      initial,
      size,
    );
    this.canvas = canvas;
    this.controlPoint = new Position(
      controlPoint,
      {
        width: 0,
        height: 0,
      }
    );
  }

  drawCurve() {

    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    const controlPointOnCanvas = this.canvas.positionOnCanvas(this.controlPoint);
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