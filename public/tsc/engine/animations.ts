import { Animation } from "./animations/animation.js";
import type { Canvas } from "./canvas.js";
import type { Coordinate } from "./coordinate.js";
import { Elements } from "./elements.js";
import type { Element } from "./elements/element.js";
import type { Plane } from "./plane.js";
import type { Size } from "./size.js";

export class Animations extends Elements {
  timerNextFrame: number = 0;
  animation: Animation;
  constructor(
    initial: Coordinate,
    size: Size,
    canvas: Canvas,
    route: string,
    element: Element,
    animation: Animation
  ) {
    super(
      initial,
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

  async drawAnimation() {
    this.nextFrame();
    await this.drawElement();
  }
}