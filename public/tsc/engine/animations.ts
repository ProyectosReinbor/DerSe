import { Animation_ENGINE } from "./animation.js";
import { Elements_ENGINE } from "./elements.js";
import type { Element_ENGINE } from "./element.js";
import type { Coordinate_ENGINE } from "./coordinate.js";
import type { Size_ENGINE } from "./size.js";
import type { Canvas_ENGINE } from "./canvas.js";
import type { ImagePath } from "./image.js";

export class Animations_ENGINE extends Elements_ENGINE {

  timerNextFrame: number = 0;
  animation: Animation_ENGINE;

  constructor(
    leftUp: Coordinate_ENGINE,
    size: Size_ENGINE,
    canvas: Canvas_ENGINE,
    route: ImagePath,
    element: Element_ENGINE,
    animation: Animation_ENGINE
  ) {
    super(
      leftUp,
      size,
      canvas,
      route,
      element,
    );
    this.animation = animation;
  }

  nextFrame() {
    this.timerNextFrame += this.canvas.timeBetweenFrames;
    if (this.timerNextFrame < this.animation.intervalBetweenFrame) return;
    this.timerNextFrame = 0;
    this.element.nextFrame(this.animation.frames);
  }

  drawAnimation() {
    this.nextFrame();
    this.drawElement();
  }
}