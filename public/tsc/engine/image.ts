import type { Canvas_ENGINE } from "./canvas";
import { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import type { Size_ENGINE } from "./size";

export type ImagePath = `images/${string}.png` | false;

export class Image_ENGINE extends Position_ENGINE {

  canvas: Canvas_ENGINE;
  route: ImagePath = false;

  constructor(
    leftUp: Coordinate_ENGINE,
    size: Size_ENGINE,
    canvas: Canvas_ENGINE,
    route: ImagePath,
  ) {
    super(
      leftUp,
      size
    );
    this.canvas = canvas;
    this.setImage(route);
  }

  setImage(route: ImagePath) {
    this.route = route;
    this.canvas.images.addRoute(this.route);
  }

  getImage(): HTMLImageElement | false {
    return this.canvas.images.getImage(this.route);
  }

  drawImage() {
    const image = this.getImage();
    if (image === false)
      return;

    const positionOnTheCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnTheCanvas === false)
      return;

    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(
      image,
      positionOnTheCanvas.leftUp.x,
      positionOnTheCanvas.leftUp.y,
      positionOnTheCanvas.size.width,
      positionOnTheCanvas.size.height
    );
  }
}