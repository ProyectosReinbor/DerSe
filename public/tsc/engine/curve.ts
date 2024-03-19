import { Canvas } from "./canvas";
import { Coordinate } from "./coordinate";
import { Position } from "./position";
import { Size } from "./size";

export class Curve extends Position {
  canvas: Canvas;
  controlPoint: Coordinate;
  constructor(props: {
    initial: Coordinate,
    end: Coordinate,
    canvas: Canvas,
    controlPoint: Coordinate,
  }) {
    const size = new Size({
      width: props.end.x - props.initial.x,
      height: props.end.y - props.initial.y
    });
    super({
      initial: props.initial,
      size,
    });
    this.canvas = props.canvas;
    this.controlPoint = props.controlPoint;
  }

  drawCurve() {

    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    const controlPointOnCanvas = this.canvas.positionOnCanvas(new Position({
      initial: this.controlPoint,
      size: new Size({ width: 0, height: 0 })
    }));
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