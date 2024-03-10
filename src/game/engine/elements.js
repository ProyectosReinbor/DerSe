import { Canvas } from "./canvas.js";
import { Element } from "./elements/element.js";
import { Image } from "./image.js";

export class Elements extends Image {

  element: Element;

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
    element: {
      size: {
        width: number;
        height: number;
      }
      horizontal: number;
      vertical: number;
    }
  ) {
    super(
      initial,
      size,
      canvas,
      route,
    );
    this.element = new Element(
      element.size,
      element.horizontal,
      element.vertical,
    );
  }

  async drawElement() {
    const image = await this.image();
    if (image === false) return;
    if (image.width === 0) return;

    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(
      image,
      this.element.x,
      this.element.y,
      this.element.size.width,
      this.element.size.height,
      positionOnCanvas.initial.x,
      positionOnCanvas.initial.y,
      positionOnCanvas.size.width,
      positionOnCanvas.size.height
    );
  }
}