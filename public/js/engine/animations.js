import { Elements } from "./elements.js";
import { Animation } from "./animations/animation.js";

export class Animations extends Elements {
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
    animationFrames,
    animationFramesPerSecond,
  ) {
    super(
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
    );
    this.timerNextFrame = 0;
    this.animation = new Animation(
      animationFrames,
      animationFramesPerSecond
    );
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