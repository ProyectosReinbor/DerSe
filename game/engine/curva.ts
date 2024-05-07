import type { Coordenadas } from "./coordenadas";
import type { Lienzo } from "./lienzo";
import { Objeto } from "./objeto";

export class Curva extends Objeto {

  lienzo: Lienzo;
  : Coordenadas;

  constructor(
    izquierdaSuperior: Coordenadas,
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

    const positionOnCanvasRightDown = positionOnCanvas.rightDown();

    this.canvas.context.quadraticCurveTo(
      checkPointOnCanvas.leftUp.x,
      checkPointOnCanvas.leftUp.y,
      positionOnCanvasRightDown.x,
      positionOnCanvasRightDown.y
    );
  }
}