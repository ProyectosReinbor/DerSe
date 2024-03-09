import { Elements } from "./elements.js";
import { Animation } from "./animations/animation.js";
import { Canvas } from "./canvas.js";

export class Animations extends Elements {

  timerNextFrame: number = 0;
  animation: Animation;

  constructor(
    initial: {
      x: number;
      y: number;
    },
    size: {
      width: number;
      height: number;
    },
    canvas: Canvas,
    route: string,
    element: {
      size: {
        width: number;
        height: number;
      };
      horizontal: number;
      vertical: number;
    },
    animation: {
      frames: number;
      framesPerSecond: number;
    }
  ) {
    super(
      initial,
      size,
      canvas,
      route,
      element,
    );
    this.animation = new Animation(
      animation.frames,
      animation.framesPerSecond
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