import { Animation } from "./animation.js";
import { Elements } from "./elements.js";
import type { Element } from "./element.js";
import type { Coordinate_ENGINE } from "./coordinate.js";
import type { Size_ENGINE } from "./size.js";
import type { Canvas_ENGINE } from "./canvas.js";
import type { ImagePath } from "./image.js";

export class Animations extends Elements {

  timerNextFrame: number = 0;
  animation: Animation;

  constructor(props: {
    initial: Coordinate_ENGINE,
    size: Size_ENGINE,
    canvas: Canvas_ENGINE,
    route: ImagePath,
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