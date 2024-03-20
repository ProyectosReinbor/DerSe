import type { Canvas } from "./canvas";
import type { Coordinate } from "./coordinate";
import { Position } from "./position";
import type { Size } from "./size";

export type ImageRoute = `images/${string}.png` | false;

export class Image extends Position {
  canvas: Canvas;
  route: ImageRoute;
  constructor(props: {
    initial: Coordinate,
    size: Size,
    canvas: Canvas,
    route: ImageRoute,
  }) {
    super(props);
    this.canvas = props.canvas;
    this.route = props.route;
    this.canvas.images.addRoute(this.route);
  }

  set image(route: ImageRoute) {
    this.route = route;
  }

  get image(): HTMLImageElement | false {
    return this.canvas.images.getImage(this.route);
  }

  drawImage() {
    const image = this.image;
    if (image === false) return;

    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(
      image,
      positionOnCanvas.initial.x,
      positionOnCanvas.initial.y,
      positionOnCanvas.size.width,
      positionOnCanvas.size.height
    );
  }
}