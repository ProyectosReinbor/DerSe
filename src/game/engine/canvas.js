import { Camera } from "./camera.js";
import { Images } from "./images.js";
import { Position } from "./position.js";

export class Canvas extends Camera {

  images: Images;

  timeBetweenFrames: number = 0;
  time: number = 0;
  framesPerSecond: number;
  intervalBetweenFrames: number;

  element: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  onePercentOfWidth: number = 0;
  onePercentOfHeight: number = 0;
  marginWidth: number = 0;
  marginHeight: number = 0;

  constructor(
    framesPerSecond: number,
    initial: {
      x: number,
      y: number,
    }
  ) {
    super(initial);
    this.images = new Images();
    this.framesPerSecond = framesPerSecond;
    this.intervalBetweenFrames = 1000 / this.framesPerSecond;
    this.element = document.querySelector("canvas") as HTMLCanvasElement;
    this.context = this.element.getContext("2d") as CanvasRenderingContext2D;

    this.aspectRatio();
    window.addEventListener(
      "resize",
      () => this.aspectRatio()
    );

    this.element.addEventListener(
      "touchstart",
      (event) => this.touchstartCanvas(event)
    );
    this.element.addEventListener(
      "touchmove",
      (event) => this.touchmoveCanvas(event)
    );
    this.element.addEventListener(
      "touchend",
      (event) => this.touchendCanvas(event)
    );

    this.nextFrame();
  }

  nextFrame(time: number = 0): void {
    const difference = time - this.time;
    if (difference < this.intervalBetweenFrames) {
      requestAnimationFrame((time) => this.nextFrame(time));
      return;
    }
    this.timeBetweenFrames = difference;
    this.time = time;
    this.drawCanvas();
    requestAnimationFrame((time) => this.nextFrame(time));
  }

  start(
    drawScene: () => void,
    touchstartScene: (touch: Position) => void,
    touchmoveScene: (touch: Position) => void,
    touchendScene: (touch: Position) => void,
  ): void {
    this.drawScene = drawScene;
    this.touchstartScene = touchstartScene;
    this.touchmoveScene = touchmoveScene;
    this.touchendScene = touchendScene;
  }

  drawCanvas() {
    this.context.clearRect(
      0, 0,
      this.element.width,
      this.element.height
    );
    this.drawScene();
  }

  getTouchCoordiante(touch: Touch): Position {
    const left = this.marginWidth / 2;
    const top = this.marginHeight / 2;
    return new Position(
      {
        x: touch.pageX - left,
        y: touch.pageY - top
      },
      {
        width: 0,
        height: 0
      }
    );
  }

  touchstartCanvas(
    event: TouchEvent,
  ) {
    event.preventDefault();
    for (const touch of event.changedTouches) {
      const coordiante = this.getTouchCoordiante(touch);
      this.touchstartScene(coordiante);
    }
  }

  touchmoveCanvas(
    event: TouchEvent,
  ) {
    event.preventDefault();
    for (const touch of event.changedTouches) {
      const coordiante = this.getTouchCoordiante(touch);
      this.touchmoveScene(coordiante);
    }
  }

  touchendCanvas(
    event: TouchEvent,
  ) {
    event.preventDefault();
    for (const touch of event.changedTouches) {
      const coordiante = this.getTouchCoordiante(touch);
      this.touchendScene(coordiante);
    }
  }

  drawScene(): void { }
  touchstartScene(touch: Position): void { }
  touchmoveScene(touch: Position): void { }
  touchendScene(touch: Position): void { }

  aspectRatio() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const ratio = 720 / 1280;
    this.element.width = width;
    this.element.height = width * ratio;

    if (this.element.height > height) {
      const ratio = 1280 / 720;
      this.element.height = height;
      this.element.width = height * ratio;
    }

    this.marginWidth = width - this.element.width;
    this.marginHeight = height - this.element.height;

    this.element.style.left = `${this.marginWidth / 2}px`;
    this.element.style.top = `${this.marginHeight / 2}px`;

    this.onePercentOfWidth = this.element.width / 100;
    this.onePercentOfHeight = this.element.height / 100;
  }

  positionOnCanvas(position: Position): Position | false {
    const positionOnCamera = this.positionOnCamera(position);
    if (positionOnCamera === false) return false;
    return new Position(
      {
        x: this.getWidthPixels(positionOnCamera.initial.x),
        y: this.getHeightPixels(positionOnCamera.initial.y)
      },
      {
        width: this.getWidthPixels(positionOnCamera.size.width),
        height: this.getHeightPixels(positionOnCamera.size.height)
      }
    );
  }

  getWidthPercentage(pixels: number) {
    return pixels / this.onePercentOfWidth;
  }

  getWidthPixels(percentage: number) {
    return percentage * this.onePercentOfWidth;
  }

  getHeightPercentage(pixels: number) {
    return pixels / this.onePercentOfHeight;
  }

  getHeightPixels(percentage: number) {
    return percentage * this.onePercentOfHeight;
  }
}