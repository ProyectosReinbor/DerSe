

import type { Canvas } from "./canvas.js";
import type { Coordinate } from "./coordinate.js";
import { Element } from "./element.js";
import { Image } from "./image.js";
import type { Size } from "./size.js";

export class Elements extends Image {
  element: Element;
  constructor(props: {
    initial: Coordinate,
    size: Size,
    canvas: Canvas,
    route: string,
    element: Element
  }) {
    super(props);
    this.element = props.element;
  }

  drawElement() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(
      this.image,
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