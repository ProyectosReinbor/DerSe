import { Element } from "./elements/element.js";
import { Image } from "./image.js";

export class Elements extends Image {
  constructor(
    initialX,
    initialY,
    sizeWidth,
    sizeHeight,
    canvas,
    route,
    elementSizeWidth,
    elementSizeHeight,
    elementHorizontal,
    elementVertical,
  ) {
    super(
      initialX,
      initialY,
      sizeWidth,
      sizeHeight,
      canvas,
      route,
    );
    this.element = new Element(
      elementSizeWidth,
      elementSizeHeight,
      elementHorizontal,
      elementVertical,
    );
  }

  async drawElement() {
    const image = await this.image();

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