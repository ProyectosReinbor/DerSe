import {
  type Canvas,
  type Coordinate,
  type Plane,
  type Size,
  Image,
} from "./exports.js";

import { Element } from "./elements/element.js";

export class Elements extends Image {
  element: Element;
  constructor(
    initial: Coordinate,
    size: Size,
    canvas: Canvas,
    route: string,
    elementParameters: {
      size: Size;
      plane: Plane;
    }
  ) {
    super(
      initial,
      size,
      canvas,
      route,
    );
    this.element = new Element(
      elementParameters.size,
      elementParameters.plane,
    );
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