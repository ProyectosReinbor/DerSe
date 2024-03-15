import type { Canvas } from "../canvas.js";
import { Coordinate } from "../coordinate.js";
import { Position } from "../position.js";
import { Size } from "../size.js";

export class Curve extends Position {
  canvas: Canvas;
  controlPoint: Coordinate;
  constructor(
    initial: Coordinate,
    end: Coordinate,
    canvas: Canvas,
    controlPoint: Coordinate,
  ) {
    const size = new Size(
      end.x - initial.x,
      end.y - initial.y
    );
    super(
      initial,
      size,
    );
    this.canvas = canvas;
    this.controlPoint = controlPoint;
  }

  drawCurve() {

    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    const controlPointOnCanvas = this.canvas.positionOnCanvas(new Position(
      this.controlPoint,
      new Size
    ));
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