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

  constructor(
    leftUp: Coordinate_ENGINE,
    rightDown: Coordinate_ENGINE,
    canvas: Canvas_ENGINE,
    fillStyle: FillStyle,
    strokeStyle: StrokeStyle,
    lineWidth: number,
  ) {
    const size = new Size_ENGINE(
      rightDown.x - leftUp.x,
      rightDown.y - leftUp.y
    );
    super(
      leftUp,
      size
    );
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  setPosition(
    leftUp: Coordinate_ENGINE,
    rightDown: Coordinate_ENGINE,
  ) {
    const size = new Size_ENGINE(
      rightDown.x - leftUp.x,
      rightDown.y - leftUp.y
    );
    this.leftUp = leftUp;
    this.size = size;
  }

  drawLine() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;

    this.canvas.context.beginPath();

    this.canvas.context.lineTo(
      positionOnCanvas.leftUp.x,
      positionOnCanvas.leftUp.y
    );

    const positionOnCanvasRightDown = positionOnCanvas.rightDown();

    this.canvas.context.lineTo(
      positionOnCanvasRightDown.x,
      positionOnCanvasRightDown.y
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