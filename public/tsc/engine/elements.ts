

import type { Canvas_ENGINE } from "./canvas.js";
import type { Coordinate_ENGINE } from "./coordinate.js";
import { Element } from "./element.js";
import { Image_ENGINE, type ImagePath } from "./image.js";
import type { Size_ENGINE } from "./size.js";

export class Elements extends Image_ENGINE {
  element: Element;
  constructor(props: {
    leftUp: Coordinate_ENGINE,
    size: Size_ENGINE,
    canvas: Canvas_ENGINE,
    route: ImagePath,
    element: Element
  }) {
    super(props);
    this.element = props.element;
  }

  drawElement() {
    const image = this.image;
    if (image === false) return;

    const positionOnTheCanvas = this.canvas.positionOnTheCanvas(this);
    if (positionOnTheCanvas === false) return;

    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(
      image,
      this.element.leftUp.x,
      this.element.leftUp.y,
      this.element.size.width,
      this.element.size.height,
      positionOnTheCanvas.leftUp.x,
      positionOnTheCanvas.leftUp.y,
      positionOnTheCanvas.size.width,
      positionOnTheCanvas.size.height
    );
  }
}