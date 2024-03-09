import { Canvas } from "./canvas.js";
import { Images } from "./images.js";
import { Position } from "./position.js";

export class Image extends Position {

  route: string;
  canvas: Canvas;

  constructor(
    initial: {
      x: number;
      y: number;
    },
    size: {
      width: number;
      height: number;
    },
    canvas: Canvas,
    route: string,
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