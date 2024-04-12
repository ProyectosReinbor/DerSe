import { Camera_ENGINE } from "./camera";
import { Coordinate_ENGINE } from "./coordinate";
import { Images_ENGINE } from "./images";
import { Position_ENGINE } from "./position";
import { Size_ENGINE } from "./size";

export class Canvas_ENGINE extends Camera_ENGINE {

  private _aPercent: Size_ENGINE = new Size_ENGINE(0, 0);
  private _margin: Size_ENGINE = new Size_ENGINE(0, 0);
  private _framesPerSecond: number;
  private _intervalBetweenFrames: number;
  private _time: number = 0;
  private _element: HTMLCanvasElement;

  private _images: Images_ENGINE = new Images_ENGINE;
  public get images(): Images_ENGINE {
    return this._images;
  }

  private _timeBetweenFrames: number = 0;
  public get timeBetweenFrames(): number {
    return this._timeBetweenFrames;
  }

  private _context: CanvasRenderingContext2D;
  public get context(): CanvasRenderingContext2D {
    return this._context;
  }

  private _drawScene() { }
  private _touchstartScene: (touch: Coordinate_ENGINE) => void = () => { }
  private _touchmoveScene: (touch: Coordinate_ENGINE) => void = () => { };
  private _touchendScene: (touch: Coordinate_ENGINE) => void = () => { };

  private _nextFrame(_time: number) {
    const difference = _time - this._time;
    if (difference < this._intervalBetweenFrames) {
      requestAnimationFrame(
        _time => this._nextFrame(_time)
      );
      return;
    }
    this._timeBetweenFrames = difference;
    this._time = _time;
    this._drawCanvas();
    requestAnimationFrame(
      _time => this._nextFrame(_time)
    );
  }

  private _drawCanvas() {
    this._context.clearRect(
      0,
      0,
      this._element.width,
      this._element.height
    );
    this._drawScene();
  }

  private _aspectRatio() {
    const screenSize = new Size_ENGINE(1280, 720);

    this._element.width = screenSize.width;
    this._element.height = screenSize.height;

    this._aPercent.width = this._element.width / 100;
    this._aPercent.height = this._element.height / 100;
  }

  private _touchCoordinate(_touch: Touch | null) {
    if (_touch === null)
      return false;

    const left = this._margin.width / 2;
    const top = this._margin.height / 2;
    return new Coordinate_ENGINE(
      _touch.pageX - left,
      _touch.pageY - top
    );
  }

  private _touchstartCanvas(
    _event: TouchEvent
  ) {
    _event.preventDefault();

    for (
      let index = 0;
      index < _event.changedTouches.length;
      index++
    ) {
      const touch = _event.changedTouches.item(index);
      const coordinate = this._touchCoordinate(touch);
      if (coordinate === false)
        continue;

      this._touchstartScene(coordinate);
    }
  }

  private _touchmoveCanvas(
    _event: TouchEvent
  ) {
    _event.preventDefault();
    for (
      let index = 0;
      index < _event.changedTouches.length;
      index++
    ) {
      const touch = _event.changedTouches.item(index);
      const coordinate = this._touchCoordinate(touch);
      if (coordinate === false)
        continue;

      this._touchmoveScene(coordinate);
    }
  }

  private _touchendCanvas(event: TouchEvent) {
    event.preventDefault();
    for (
      let index = 0;
      index < event.changedTouches.length;
      index++
    ) {
      const touch = event.changedTouches.item(index);
      const coordinate = this._touchCoordinate(touch);
      if (coordinate === false)
        continue;

      this._touchendScene(coordinate);
    }
  }

  private _widthInPercentages = (
    pixels: number
  ) => pixels / this._aPercent.width;

  private _widthInPixels = (
    percentage: number
  ) => percentage * this._aPercent.width;

  private _heightInPercentages = (
    pixels: number
  ) => pixels / this._aPercent.height;

  private _heightInPixels = (
    percentage: number
  ) => percentage * this._aPercent.height;

  constructor(
    _leftUp: Coordinate_ENGINE,
    _framesPerSecond: number,
  ) {
    super(_leftUp);
    this._framesPerSecond = _framesPerSecond;
    this._intervalBetweenFrames = 1000 / this._framesPerSecond;
    this._element = window.document.getElementById("canvas") as HTMLCanvasElement;
    this._context = this._element.getContext("2d") as CanvasRenderingContext2D;

    this._aspectRatio();
    window.addEventListener(
      "resize",
      () => this._aspectRatio()
    );

    this._element.addEventListener(
      "touchstart",
      (event) => this._touchstartCanvas(event),
    );
    this._element.addEventListener(
      "touchmove",
      (event) => this._touchmoveCanvas(event),
    );
    this._element.addEventListener(
      "touchend",
      (event) => this._touchendCanvas(event)
    );

    this._nextFrame(0);
  }

  public start(
    _drawScene: () => void,
    _touchstartScene: (touch: Coordinate_ENGINE) => void,
    _touchmoveScene: (touch: Coordinate_ENGINE) => void,
    _touchendScene: (touch: Coordinate_ENGINE) => void,
  ): void {
    this._drawScene = _drawScene;
    this._touchstartScene = _touchstartScene;
    this._touchmoveScene = _touchmoveScene;
    this._touchendScene = _touchendScene;
  }

  public positionOnCanvas(
    position: Position_ENGINE,
  ): Position_ENGINE | false {
    const positionOnCamera = this.positionOnCamera(position);
    if (positionOnCamera === false)
      return false;

    return new Position_ENGINE(
      new Coordinate_ENGINE(
        this._widthInPixels(positionOnCamera.leftUp.x),
        this._heightInPixels(positionOnCamera.leftUp.y),
      ),
      new Size_ENGINE(
        this._widthInPixels(positionOnCamera.size.width),
        this._heightInPixels(positionOnCamera.size.height)
      )
    );
  }

  public widthInPercentageHeight(
    percentageHeight: number
  ): number {
    const pixels = this._heightInPixels(percentageHeight);
    return this._widthInPercentages(pixels);
  }
}