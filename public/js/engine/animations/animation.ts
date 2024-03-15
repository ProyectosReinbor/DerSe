export class Animation {
  frames: number;
  framesPerSecond: number;
  intervalBetweenFrame: number;
  constructor(
    frames: number,
    framesPerSecond: number,
  ) {
    this.frames = frames;
    this.framesPerSecond = framesPerSecond;
    this.intervalBetweenFrame = 1000 / this.framesPerSecond;
  }
}