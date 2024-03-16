import {
  type Canvas,
  type Coordinate,
  type Size,
  Position,
} from "./exports.js";

export class Image extends Position {
  canvas: Canvas;
  route: string;
  constructor(
    initial: Coordinate,
    size: Size,
    canvas: Canvas,
    route: string,
  ) {
    super(initial, size);
    this.canvas = canvas;
    this.route = route;
  }

  async image() {
    return await this.canvas.images.get(this.route);
  }

  async drawImage() {
    const image = await this.image();

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