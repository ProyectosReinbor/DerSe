export class Animation {
  frames: number;
  intervalBetweenFrame: number = 0;
  constructor(
    frames: number,
    framesPerSecond: number,
  ) {
    this.frames = frames;
    this.framesPerSecond = framesPerSecond;
  }

  get framesPerSecond() {
    return 1000 / this.intervalBetweenFrame;
  }

  set framesPerSecond(value: number) {
    this.intervalBetweenFrame = 1000 / value;
  }
}