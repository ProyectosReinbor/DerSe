export class Animation {
  frames: number;
  intervalBetweenFrame: number = 0;
  constructor(props: {
    frames: number,
    framesPerSecond: number,
  }) {
    this.frames = props.frames;
    this.framesPerSecond = props.framesPerSecond;
  }

  get framesPerSecond() {
    return 1000 / this.intervalBetweenFrame;
  }

  set framesPerSecond(value: number) {
    this.intervalBetweenFrame = 1000 / value;
  }
}