import { Camera } from "./camera";
import { Coordinate } from "./coordinate";
import { Images } from "./images";
import { Position } from "./position";
import { Size } from "./size";

export class Canvas extends Camera {
  onePercentage: Size = new Size({ width: 0, height: 0 });
  margin: Size = new Size({ width: 0, height: 0 });
  images: Images = new Images();
  intervalBetweenFrame: number = 0;
  element: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  time: number = 0;
  timeBetweenFrames: number = 0;
  drawScene() { }
  touchstartScene: (touch: Coordinate) => void = () => { }
  touchmoveScene: (touch: Coordinate) => void = () => { };
  touchendScene: (touch: Coordinate) => void = () => { };
  constructor(props: {
    initial: Coordinate,
    framesPerSecond: number,
  }) {
    super(props);
    this.framesPerSecond = props.framesPerSecond;
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

    this.nextFrame();
  }

  get framesPerSecond(): number {
    return 1000 / this.intervalBetweenFrame;
  }

  set framesPerSecond(value: number) {
    this.intervalBetweenFrame = 1000 / value;
  }

  nextFrame(time: number = 0) {
    const difference = time - this.time;
    if (difference < this.intervalBetweenFrame) {
      requestAnimationFrame((time) => this.nextFrame(time));
      return;
    }
    this.timeBetweenFrames = difference;
    this.time = time;
    this.drawCanvas();
    requestAnimationFrame((time) => this.nextFrame(time));
  }

  async start(
    drawScene: () => void,
    touchstartScene: (touch: Coordinate) => void,
    touchmoveScene: (touch: Coordinate) => void,
    touchendScene: (touch: Coordinate) => void,
  ) {
    await this.images.loadAll();
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
    const screen = new Size({
      width: window.innerWidth,
      height: window.innerHeight
    });

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

  getTouchCoordinate(touch: Touch | null) {
    if (touch === null) return false;
    const left = this.margin.width / 2;
    const top = this.margin.height / 2;
    return new Coordinate({
      x: touch.pageX - left,
      y: touch.pageY - top
    });
  }

  touchstartCanvas(event: TouchEvent) {
    event.preventDefault();

    for (let index = 0; index < event.changedTouches.length; index++) {
      const touch = event.changedTouches.item(index);
      const coordinate = this.getTouchCoordinate(touch);
      if (coordinate === false) continue;
      this.touchstartScene(coordinate);
    }
  }

  touchmoveCanvas(event: TouchEvent) {
    event.preventDefault();
    for (let index = 0; index < event.changedTouches.length; index++) {
      const touch = event.changedTouches.item(index);
      const coordinate = this.getTouchCoordinate(touch);
      if (coordinate === false) continue;
      this.touchmoveScene(coordinate);
    }
  }

  touchendCanvas(event: TouchEvent) {
    event.preventDefault();
    for (let index = 0; index < event.changedTouches.length; index++) {
      const touch = event.changedTouches.item(index);
      const coordinate = this.getTouchCoordinate(touch);
      if (coordinate === false) continue;
      this.touchendScene(coordinate);
    }
  }


  positionOnCanvas(position: Position) {
    const positionOnCamera = this.positionOnCamera(position);
    if (positionOnCamera === false) return false;
    return new Position({
      initial: new Coordinate({
        x: this.getWidthPixels(positionOnCamera.initial.x),
        y: this.getHeightPixels(positionOnCamera.initial.y),
      }),
      size: new Size({
        width: this.getWidthPixels(positionOnCamera.size.width),
        height: this.getHeightPixels(positionOnCamera.size.height)
      })
    });
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