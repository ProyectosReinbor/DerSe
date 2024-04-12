import { Camera_ENGINE } from "./camera";
import { Coordinate_ENGINE } from "./coordinate";
import { Images_ENGINE } from "./images";
import { Position_ENGINE } from "./position";
import type { Scene_ENGINE } from "./scene";
import { Size_ENGINE } from "./size";
import { TouchEvents } from "./touchEvents";

export class Canvas_ENGINE extends Camera_ENGINE {

  private _touchEvents: TouchEvents;
  public get touchEvents(): TouchEvents {
    return this._touchEvents;
  }

  private _aPercent: Size_ENGINE = new Size_ENGINE(0, 0);
  private _framesPerSecond: number;
  private _intervalBetweenFrames: number;
  private _time: number = 0;

  private _margin: Size_ENGINE = new Size_ENGINE(0, 0);
  public get margin(): Size_ENGINE {
    return this._margin;
  }

  private _element: HTMLCanvasElement;
  public get element(): HTMLCanvasElement {
    return this._element;
  }

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

  private _scene: Scene_ENGINE | false = false;

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
    if (this._scene === false)
      return;

    this._scene.draw();
  }

  private _aspectRatio() {
    const screenSize = new Size_ENGINE(1280, 720);

    this._element.width = screenSize.width;
    this._element.height = screenSize.height;

    this._aPercent.width = this._element.width / 100;
    this._aPercent.height = this._element.height / 100;
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
    this._touchEvents = new TouchEvents(this);

    this._aspectRatio();
    window.addEventListener(
      "resize",
      () => this._aspectRatio()
    );

    this._nextFrame(0);
  }

  public start(
    _scene: Scene_ENGINE,
  ): void {
    this._scene = _scene;
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

  public heightInPercentageWidth(
    percentageWidth: number
  ): number {
    const pixels = this._widthInPixels(percentageWidth);
    return this._heightInPercentages(pixels);
  }
}