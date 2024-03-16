import { Camera } from "./camera.js";
import { Coordinate } from "./coordinate.js";
import { Images } from "./images.js";
import { Position } from "./position.js";
import { Size } from "./size.js";

export class Canvas extends Camera {
  onePercentage: Size = new Size;
  margin: Size = new Size;
  images: Images;
  framesPerSecond: number;
  intervalBetweenFrames: number;
  element: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  time: number = 0;
  timeBetweenFrames: number = 0;
  drawScene() { }
  touchstartScene: (touch: Coordinate) => void = () => { }
  touchmoveScene: (touch: Coordinate) => void = () => { };
  touchendScene: (touch: Coordinate) => void = () => { };
  constructor(
    initial: Coordinate,
    framesPerSecond: number,
  ) {
    super(initial);
    this.images = new Images();
    this.framesPerSecond = framesPerSecond;
    this.intervalBetweenFrames = 1000 / this.framesPerSecond;
    this.element = window.document.getElementById("canvas") as HTMLCanvasElement;
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

  nextFrame(time: number = 0) {
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
    touchstartScene: (touch: Coordinate) => void,
    touchmoveScene: (touch: Coordinate) => void,
    touchendScene: (touch: Coordinate) => void,
  ) {
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

  aspectRatio() {
    const screen = new Size(
      window.innerWidth,
      window.innerHeight
    );

    const ratio = 720 / 1280;
    this.element.width = screen.width;
    this.element.height = screen.width * ratio;

    if (this.element.height > screen.height) {
      const ratio = 1280 / 720;
      this.element.height = screen.height;
      this.element.width = screen.height * ratio;
    }

    this.margin.width = screen.width - this.element.width;
    this.margin.height = screen.height - this.element.height;

    this.element.style.left = `${this.margin.width / 2}px`;
    this.element.style.top = `${this.margin.height / 2}px`;

    this.onePercentage.width = this.element.width / 100;
    this.onePercentage.height = this.element.height / 100;
  }

  getTouchCoordiante(touch: Touch) {
    const left = this.margin.width / 2;
    const top = this.margin.height / 2;
    return new Coordinate(
      touch.pageX - left,
      touch.pageY - top
    );
  }

  touchstartCanvas(event: TouchEvent) {
    event.preventDefault();
    for (let index = 0; index < event.changedTouches.length; index++) {
      const touch = event.changedTouches[index];
      const coordinate = this.getTouchCoordiante(touch);
      this.touchstartScene(coordinate);
    }
  }

  touchmoveCanvas(event: TouchEvent) {
    event.preventDefault();
    for (let index = 0; index < event.changedTouches.length; index++) {
      const touch = event.changedTouches[index];
      const coordinate = this.getTouchCoordiante(touch);
      this.touchmoveScene(coordinate);
    }
  }

  touchendCanvas(event: TouchEvent) {
    event.preventDefault();
    for (let index = 0; index < event.changedTouches.length; index++) {
      const touch = event.changedTouches[index];
      const coordinate = this.getTouchCoordiante(touch);
      this.touchendScene(coordinate);
    }
  }


  positionOnCanvas(position: Position) {
    const positionOnCamera = this.positionOnCamera(position);
    if (positionOnCamera === false) return false;
    return new Position(
      new Coordinate(
        this.getWidthPixels(positionOnCamera.initial.x),
        this.getHeightPixels(positionOnCamera.initial.y),
      ),
      new Size(
        this.getWidthPixels(positionOnCamera.size.width),
        this.getHeightPixels(positionOnCamera.size.height)
      )
    );
  }

  getWidthPercentage(pixels: number) {
    return pixels / this.onePercentage.width;
  }

  getWidthPixels(percentage: number) {
    return percentage * this.onePercentage.width;
  }

  getHeightPercentage(pixels: number) {
    return pixels / this.onePercentage.height;
  }

  getHeightPixels(percentage: number) {
    return percentage * this.onePercentage.height;
  }
}