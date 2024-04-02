import { Camera_ENGINE } from "./camera";
import { Coordinate_ENGINE } from "./coordinate";
import { Images_ENGINE } from "./images";
import { Position_ENGINE } from "./position";
import { Size_ENGINE } from "./size";

export class Canvas_ENGINE extends Camera_ENGINE {
  aPercent: Size_ENGINE = new Size_ENGINE(0, 0);
  margin: Size_ENGINE = new Size_ENGINE(0, 0);
  images: Images_ENGINE = new Images_ENGINE;
  intervalBetweenFrames: number = 0;
  time: number = 0;
  timeBetweenFrames: number = 0;
  element: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  drawScene() { }
  touchstartScene: (toque: Coordinate_ENGINE) => void = () => { }
  touchmoveScene: (toque: Coordinate_ENGINE) => void = () => { };
  touchendScene: (toque: Coordinate_ENGINE) => void = () => { };

  constructor(
    leftUp: Coordinate_ENGINE,
    framesPerSecond: number,
  ) {
    super(leftUp);
    this.setFramesPerSecond(framesPerSecond);
    this.element = window.document.getElementById("canvas") as HTMLCanvasElement;
    this.context = this.element.getContext("2d") as CanvasRenderingContext2D;

    this.aspectRatio();
    window.addEventListener(
      "resize",
      () => this.aspectRatio()
    );

    this.element.addEventListener(
      "touchstart",
      (event) => this.touchstartCanvas(event),
    );
    this.element.addEventListener(
      "touchmove",
      (event) => this.touchmoveCanvas(event),
    );
    this.element.addEventListener(
      "touchend",
      (event) => this.touchendCanvas(event)
    );

    this.nextFrame(0);
  }

  getFramesPerSecond(): number {
    return 1000 / this.intervalBetweenFrames;
  }

  setFramesPerSecond(value: number) {
    this.intervalBetweenFrames = 1000 / value;
  }

  nextFrame(time: number) {
    const difference = time - this.time;
    if (difference < this.intervalBetweenFrames) {
      requestAnimationFrame(
        time => this.nextFrame(time)
      );
      return;
    }
    this.timeBetweenFrames = difference;
    this.time = time;
    this.drawCanvas();
    requestAnimationFrame(
      time => this.nextFrame(time)
    );
  }

  async start(
    drawScene: () => void,
    touchstartScene: (touch: Coordinate_ENGINE) => void,
    touchmoveScene: (touch: Coordinate_ENGINE) => void,
    touchendScene: (touch: Coordinate_ENGINE) => void,
  ) {
    this.drawScene = drawScene;
    this.touchstartScene = touchstartScene;
    this.touchmoveScene = touchmoveScene;
    this.touchendScene = touchendScene;
  }

  drawCanvas() {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
    this.drawScene();
  }

  aspectRatio() {
    const screenSize = new Size_ENGINE(1280, 720);

    this.element.width = screenSize.width;
    this.element.height = screenSize.height;

    this.aPercent.width = this.element.width / 100;
    this.aPercent.height = this.element.height / 100;
  }

  getTouchCoordinate(touch: Touch | null) {
    if (touch === null)
      return false;

    const left = this.margin.width / 2;
    const top = this.margin.height / 2;
    return new Coordinate_ENGINE(
      touch.pageX - left,
      touch.pageY - top
    );
  }

  touchstartCanvas(
    event: TouchEvent
  ) {
    event.preventDefault();

    for (
      let index = 0;
      index < event.changedTouches.length;
      index++
    ) {
      const touch = event.changedTouches.item(index);
      const coordinate = this.getTouchCoordinate(touch);
      if (coordinate === false)
        continue;

      this.touchstartScene(coordinate);
    }
  }

  touchmoveCanvas(event: TouchEvent) {
    event.preventDefault();
    for (
      let index = 0;
      index < event.changedTouches.length;
      index++
    ) {
      const touch = event.changedTouches.item(index);
      const coordinate = this.getTouchCoordinate(touch);
      if (coordinate === false)
        continue;

      this.touchmoveScene(coordinate);
    }
  }

  touchendCanvas(event: TouchEvent) {
    event.preventDefault();
    for (
      let index = 0;
      index < event.changedTouches.length;
      index++
    ) {
      const touch = event.changedTouches.item(index);
      const coordinate = this.getTouchCoordinate(touch);
      if (coordinate === false)
        continue;

      this.touchendScene(coordinate);
    }
  }

  positionOnCanvas(
    position: Position_ENGINE,
  ) {
    const positionOnCamera = this.positionOnCamera(position);
    if (positionOnCamera === false)
      return false;

    return new Position_ENGINE(
      new Coordinate_ENGINE(
        this.widthInPixels(
          positionOnCamera.leftUp.x
        ),
        this.heightInPixels(
          positionOnCamera.leftUp.y
        ),
      ),
      new Size_ENGINE(
        this.widthInPixels(
          positionOnCamera.size.width,
        ),
        this.heightInPixels(
          positionOnCamera.size.height
        )
      )
    );
  }

  widthInPercentageHeight(percentageHeight: number) {
    const pixels = this.heightInPixels(percentageHeight);
    return this.widthInPercentages(pixels);
  }

  widthInPercentages(pixels: number) {
    return pixels / this.aPercent.width;
  }

  widthInPixels(percentage: number) {
    return percentage * this.aPercent.width;
  }

  heightInPercentages(pixels: number) {
    return pixels / this.aPercent.height;
  }

  heightInPixels(percentage: number) {
    return percentage * this.aPercent.height;
  }
}