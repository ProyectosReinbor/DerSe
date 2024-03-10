import { Position } from "./position.js";

export class Image extends Position {
  constructor(
    initial,
    size,
    canvas,
    route,
  ) {
    super(
      initial,
      size
    );
    this.canvas = canvas;
    this.route = route;
  }

  async image() {
    return await this.canvas.images.get(this.route);
  }

  async drawImage() {
    const image = await this.image();
    if (image === false) return;
    if (image.width === 0) return;

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