import { Animation } from "./animations/animation.js";
import type { Canvas } from "./canvas.js";
import type { Coordinate } from "./coordinate.js";
import { Elements } from "./elements.js";
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
    elementParameters: {
      size: Size;
      plane: Plane;
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
      elementParameters,
    );
    this.animation = new Animation(animation.frames, animation.framesPerSecond);
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