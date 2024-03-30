import type { Canvas_ENGINE } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context";
import type { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import { Size_ENGINE } from "./size";

export class Line_ENGINE extends Position_ENGINE {
  canvas: Canvas_ENGINE;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  lineWidth: number;

  constructor(props: {
    canvas: Canvas_ENGINE;
    leftUp: Coordinate_ENGINE;
    rightDown: Coordinate_ENGINE;
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
    lineWidth: number;
  }) {
    const size = new Size_ENGINE({
      width: props.rightDown.x - props.leftUp.x,
      height: props.rightDown.y - props.leftUp.y
    });
    super({
      leftUp: props.leftUp,
      size
    });
    this.canvas = props.canvas;
    this.fillStyle = props.fillStyle;
    this.strokeStyle = props.strokeStyle;
    this.lineWidth = props.lineWidth;
  }

  drawLine() {
    const positionOnCanvas = this.canvas.positionOnCanvas({
      position: this
    });
    if (positionOnCanvas === false)
      return;

    this.canvas.context.beginPath();

    this.canvas.context.lineTo(
      positionOnCanvas.leftUp.x,
      positionOnCanvas.leftUp.y
    );

    this.canvas.context.lineTo(
      positionOnCanvas.rightDown.x,
      positionOnCanvas.rightDown.y
    );

    if (this.strokeStyle !== false) {
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.stroke();
    }

    if (this.fillStyle !== false) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }

    this.canvas.context.closePath();
  }
}