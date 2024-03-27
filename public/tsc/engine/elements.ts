

import type { Canvas_ENGINE } from "./canvas.js";
import type { Coordinate_ENGINE } from "./coordinate.js";
import { Element_ENGINE } from "./element.js";
import { Image_ENGINE, type ImagePath } from "./image.js";
import type { Size_ENGINE } from "./size.js";

export class Elements_ENGINE extends Image_ENGINE {

  element: Element_ENGINE;

  constructor(props: {
    leftUp: Coordinate_ENGINE,
    size: Size_ENGINE,
    canvas: Canvas_ENGINE,
    route: ImagePath,
    element: Element_ENGINE
  }) {
    super(props);
    this.element = props.element;
  }

  drawElement() {
    const image = this.image;
    if (image === false)
      return;

    const positionOnCanvas = this.canvas.positionOnCanvas({
      position: this
    });
    if (positionOnCanvas === false)
      return;

    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(
      image,
      this.element.leftUp.x,
      this.element.leftUp.y,
      this.element.size.width,
      this.element.size.height,
      positionOnCanvas.leftUp.x,
      positionOnCanvas.leftUp.y,
      positionOnCanvas.size.width,
      positionOnCanvas.size.height
    );
  }
}