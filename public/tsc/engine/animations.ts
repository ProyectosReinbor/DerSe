import { Animation } from "./animation.js";
import type { Canvas } from "./canvas.js";
import type { Coordinate } from "./coordinate.js";
import { Elements } from "./elements.js";
import type { Element } from "./element.js";
import type { Size } from "./size.js";
import type { ImageRoute } from "./image.js";

export class Animations extends Elements {
  timerNextFrame: number = 0;
  animation: Animation;
  constructor(props: {
    initial: Coordinate,
    size: Size,
    canvas: Canvas,
    route: ImageRoute,
    element: Element,
    animation: Animation
  }) {
    super(props);
    this.animation = props.animation;
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