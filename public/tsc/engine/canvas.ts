import { Camera_ENGINE } from "./camera";
import { Coordinate_ENGINE } from "./coordinate";
import { Images_ENGINE } from "./images";
import { Position_ENGINE } from "./position";
import { Size_ENGINE } from "./size";

export class Canvas_ENGINE extends Camera_ENGINE {

  private _aPercent: Size_ENGINE = new Size_ENGINE(0, 0);
  private _margin: Size_ENGINE = new Size_ENGINE(0, 0);
  private _images: Images_ENGINE = new Images_ENGINE;
  private _framesPerSecond: number;
  private _intervalBetweenFrames: number;
  private _time: number = 0;
  private _timeBetweenFrames: number = 0;
  private _element: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  drawScene() { }
  touchstartScene: (touch: Coordinate_ENGINE) => void = () => { }
  touchmoveScene: (touch: Coordinate_ENGINE) => void = () => { };
  touchendScene: (touch: Coordinate_ENGINE) => void = () => { };

  constructor(
    _leftUp: Coordinate_ENGINE,
    _framesPerSecond: number,
  ) {
    super(_leftUp);
    this._framesPerSecond = _framesPerSecond;
    this._intervalBetweenFrames = 1000 / this._framesPerSecond;
    this._element = window.document.getElementById("canvas") as HTMLCanvasElement;
    this._context = this._element.getContext("2d") as CanvasRenderingContext2D;

    this.aspectRatio();
    window.addEventListener(
      "resize",
      () => this.aspectRatio()
    );

    this._element.addEventListener(
      "touchstart",
      (event) => this.touchstartCanvas(event),
    );
    this._element.addEventListener(
      "touchmove",
      (event) => this.touchmoveCanvas(event),
    );
    this._element.addEventListener(
      "touchend",
      (event) => this.touchendCanvas(event)
    );

    this.nextFrame(0);
  }

  nextFrame(time: number) {
    const difference = time - this._time;
    if (difference < this._intervalBetweenFrames) {
      requestAnimationFrame(
        time => this.nextFrame(time)
      );
      return;
    }
    this._timeBetweenFrames = difference;
    this._time = time;
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
    this._context.clearRect(
      0,
      0,
      this._element.width,
      this._element.height
    );
    this.drawScene();
  }

  aspectRatio() {
    const screenSize = new Size_ENGINE(1280, 720);

    this._element.width = screenSize.width;
    this._element.height = screenSize.height;

    this._aPercent.width = this._element.width / 100;
    this._aPercent.height = this._element.height / 100;
  }

  getTouchCoordinate(touch: Touch | null) {
    if (touch === null)
      return false;

    const left = this._margin.width / 2;
    const top = this._margin.height / 2;
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
    return pixels / this._aPercent.width;
  }

  widthInPixels(percentage: number) {
    return percentage * this._aPercent.width;
  }

  heightInPercentages(pixels: number) {
    return pixels / this._aPercent.height;
  }

  heightInPixels(percentage: number) {
    return percentage * this._aPercent.height;
  }
}