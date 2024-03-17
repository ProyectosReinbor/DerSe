

import type { Canvas } from "./canvas.js";
import type { Coordinate } from "./coordinate.js";
import { Element } from "./elements/element.js";
import { Image } from "./image.js";
import type { Size } from "./size.js";

export class Elements extends Image {
  element: Element;
  constructor(
    initial: Coordinate,
    size: Size,
    canvas: Canvas,
    route: string,
    element: Element
  ) {
    super(
      initial,
      size,
      canvas,
      route,
    );
    this.element = element;
  }

  async drawElement() {
    const image = await this.image();

    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(
      image,
      this.element.initial.x,
      this.element.initial.y,
      this.element.size.width,
      this.element.size.height,
      positionOnCanvas.initial.x,
      positionOnCanvas.initial.y,
      positionOnCanvas.size.width,
      positionOnCanvas.size.height
    );
  }
}