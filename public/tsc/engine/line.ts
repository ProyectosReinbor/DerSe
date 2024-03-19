import type { Canvas } from "./canvas";
import type { Coordinate } from "./coordinate";
import { Position } from "./position";
import { Size } from "./size";

export class Line extends Position {
  canvas: Canvas;
  constructor(props: {
    initial: Coordinate;
    canvas: Canvas;
  }) {
    super({
      initial: props.initial,
      size: new Size({
        width: 0,
        height: 0,
      })
    });
    this.canvas = props.canvas;
  }

  drawLine() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    this.canvas.context.lineTo(
      positionOnCanvas.initial.x,
      positionOnCanvas.initial.y
    );
  }
}