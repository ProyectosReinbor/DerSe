import { Position } from "./position.js";

export class Image extends Position {
  constructor(
    initialX,
    initialY,
    sizeWidth,
    sizeHeight,
    canvas,
    route,
  ) {
    super(
      initialX,
      initialY,
      sizeWidth,
      sizeHeight
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

    const positionOnCanvas = this.canvas.positionOnCanvas(
      this.initial.x,
      this.initial.y,
      this.size.width,
      this.size.height,
      this.end.x,
      this.end.y
    );
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