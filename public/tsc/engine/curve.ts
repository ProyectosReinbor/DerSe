import type { Canvas_ENGINE } from "./canvas";
import type { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import { Size_ENGINE } from "./size";

export class Curve_ENGINE extends Position_ENGINE {

  canvas: Canvas_ENGINE;
  checkPoint: Coordinate_ENGINE;

  constructor(
    leftUp: Coordinate_ENGINE,
    rightDown: Coordinate_ENGINE,
    canvas: Canvas_ENGINE,
    checkPoint: Coordinate_ENGINE,
  ) {
    const size = new Size_ENGINE(
      rightDown.x - leftUp.x,
      rightDown.y - leftUp.y
    );
    super(
      leftUp,
      size,
    );
    this.canvas = canvas;
    this.checkPoint = checkPoint;
  }

  drawCurve() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;

    const checkPointOnCanvas = this.canvas.positionOnCanvas(
      new Position_ENGINE(
        this.checkPoint,
        new Size_ENGINE(0, 0)
      )
    );
    if (checkPointOnCanvas === false)
      return;

    this.canvas.context.moveTo(
      positionOnCanvas.leftUp.x,
      positionOnCanvas.leftUp.y
    );

    this.canvas.context.quadraticCurveTo(
      checkPointOnCanvas.leftUp.x,
      checkPointOnCanvas.leftUp.y,
      positionOnCanvas.rightDown.x,
      positionOnCanvas.rightDown.y
    );
  }
}