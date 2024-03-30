import type { Canvas_ENGINE } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context";
import type { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import type { Size_ENGINE } from "./size";

export class Circle extends Position_ENGINE {

  canvas: Canvas_ENGINE;
  startingDegrees: number;
  finalDegrees: number;
  counterclockwise: boolean;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  lineWidth: number;

  constructor(props: {
    leftUp: Coordinate_ENGINE,
    size: Size_ENGINE,
    canvas: Canvas_ENGINE,
    startingDegrees: number,
    finalDegrees: number,
    counterclockwise: boolean,
    fillStyle: FillStyle,
    strokeStyle: StrokeStyle,
    lineWidth: number,
  }) {
    super({
      leftUp: props.leftUp,
      size: props.size,
    });
    this.canvas = props.canvas;
    this.startingDegrees = props.startingDegrees;
    this.finalDegrees = props.finalDegrees;
    this.counterclockwise = props.counterclockwise;
    this.fillStyle = props.fillStyle;
    this.strokeStyle = props.strokeStyle;
    this.lineWidth = props.lineWidth;
  }

  get startingRadians() {
    return this.startingDegrees * (Math.PI / 180);
  }

  get finalRadians() {
    return this.finalDegrees * (Math.PI / 180);
  }

  drawCircle() {
    const positionOnCanvas = this.canvas.positionOnCanvas({
      position: this
    });
    if (positionOnCanvas === false)
      return;

    this.canvas.context.beginPath();

    const radiusWidth = positionOnCanvas.size.width / 2;
    const radiusHeight = positionOnCanvas.size.height / 2;

    const radius = Math.min(radiusWidth, radiusHeight);

    this.canvas.context.arc(
      positionOnCanvas.leftUp.x + radiusWidth,
      positionOnCanvas.leftUp.y + radiusHeight,
      radius,
      this.startingRadians,
      this.finalRadians,
      this.counterclockwise,
    );

    if (this.fillStyle !== false) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }

    if (this.strokeStyle !== false) {
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.stroke();
    }

    this.canvas.context.closePath();
  }
}