export class Animation {
  constructor(
    frames,
    framesPerSecond,
  ) {
    this.frames = frames;
    this.framesPerSecond = framesPerSecond;
    this.intervalBetweenFrame = 1000 / this.framesPerSecond;
  }
}