import type { Canvas } from "./canvas";
import type { Coordinate } from "./coordinate";
import { Position } from "./position";
import type { Size } from "./size";

export class Image extends Position {
  canvas: Canvas;
  route: string;
  constructor(props: {
    initial: Coordinate,
    size: Size,
    canvas: Canvas,
    route: string,
  }) {
    super(props);
    this.canvas = props.canvas;
    this.route = props.route;
    this.canvas.images.addRoute(this.route);
  }

  set image(route: string) {
    this.route = route;
  }

  get image(): HTMLImageElement {
    return this.canvas.images.getImage(this.route);
  }

  drawImage() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(
      this.image,
      positionOnCanvas.initial.x,
      positionOnCanvas.initial.y,
      positionOnCanvas.size.width,
      positionOnCanvas.size.height
    );
  }
}