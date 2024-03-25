import type { Canvas_ENGINE } from "./canvas";
import type { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import { Size_ENGINE } from "./size";

export class Curve_ENGINE extends Position_ENGINE {

  canvas: Canvas_ENGINE;
  checkPoint: Coordinate_ENGINE;

  constructor(props: {
    leftUp: Coordinate_ENGINE,
    rightDown: Coordinate_ENGINE,
    canvas: Canvas_ENGINE,
    checkPoint: Coordinate_ENGINE,
  }) {
    const size = new Size_ENGINE({
      width: props.rightDown.x - props.leftUp.x,
      height: props.rightDown.y - props.leftUp.y
    });
    super({
      leftUp: props.leftUp,
      size,
    });
    this.canvas = props.canvas;
    this.checkPoint = props.checkPoint;
  }

  drawCurve() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;

    const checkPointOnCanvas = this.canvas.positionOnCanvas(new Position_ENGINE({
      leftUp: this.checkPoint,
      size: new Size_ENGINE({ width: 0, height: 0 })
    }));
    if (checkPointOnCanvas === false) return;

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