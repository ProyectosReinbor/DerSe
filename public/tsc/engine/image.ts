import type { Canvas_ENGINE } from "./canvas";
import { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import type { Size_ENGINE } from "./size";

export type ImagePath = `images/${string}.png` | false;

export class Image_ENGINE extends Position_ENGINE {

  canvas: Canvas_ENGINE;
  route: ImagePath;
  reflected: boolean;

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
    this.route = route;
    this.canvas.images.addRoute(this.route);
    this.reflected = true;
  }

  set image(route: ImagePath) {
    this.route = route;
  }

  get image(): HTMLImageElement | false {
    return this.canvas.images.getImage(this.route);
  }

  drawImage() {
    const image = this.image;
    if (image === false)
      return;

    const positionOnTheCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnTheCanvas === false)
      return;

    if (this.reflected === true) {
      this.canvas.context.scale(-1, 1);
    }

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