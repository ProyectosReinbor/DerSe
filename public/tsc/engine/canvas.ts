import { Camera_ENGINE } from "./camera";
import { Coordinate_ENGINE } from "./coordinate";
import { Images_ENGINE } from "./images";
import { Position_ENGINE } from "./position";
import { Size_ENGINE } from "./size";

export class Canvas_ENGINE extends Camera_ENGINE {
  aPercent: Size_ENGINE = new Size_ENGINE({ width: 0, height: 0 });
  margin: Size_ENGINE = new Size_ENGINE({ width: 0, height: 0 });
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

  constructor(props: {
    leftUp: Coordinate_ENGINE,
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
    return 1000 / this.intervalBetweenFrames;
  }

  set framesPerSecond(value: number) {
    this.intervalBetweenFrames = 1000 / value;
  }

  nextFrame(time: number = 0) {
    const difference = time - this.time;
    if (difference < this.intervalBetweenFrames) {
      requestAnimationFrame(
        (time) => this.nextFrame(time)
      );
      return;
    }
    this.timeBetweenFrames = difference;
    this.time = time;
    this.drawCanvas();
    requestAnimationFrame(
      (time) => this.nextFrame(time)
    );
  }

  async start(
    drawScene: () => void,
    touchstartScene: (touch: Coordinate_ENGINE) => void,
    touchmoveScene: (touch: Coordinate_ENGINE) => void,
    touchendScene: (touch: Coordinate_ENGINE) => void,
  ) {
    await this.images.loadAll();
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
    const screen = new Size_ENGINE({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const ratio = 720 / 1280;
    this.element.width = screen.width;
    this.element.height = screen.height * ratio;

    if (this.element.height > screen.height) {
      const ratio = 1280 / 720;
      this.element.height = screen.height;
      this.element.width = screen.height * ratio;
    }


    this.margin.width = screen.width - this.element.width;
    this.margin.height = screen.height - this.element.height;

    this.element.style.left = `${this.margin.width / 2}px`;
    this.element.style.top = `${this.margin.height / 2}px`;

    this.aPercent.width = this.element.width / 100;
    this.aPercent.height = this.element.height / 100;
  }

  getTouchCoordinate(touch: Touch | null) {
    if (touch === null)
      return false;

    const left = this.margin.width / 2;
    const top = this.margin.height / 2;
    return new Coordinate_ENGINE({
      x: touch.pageX - left,
      y: touch.pageY - top
    });
  }

  touchstartCanvas(event: TouchEvent) {
    event.preventDefault();

    for (let index = 0; index < event.changedTouches.length; index++) {
      const toque = event.changedTouches.item(index);
      const coordinate = this.getTouchCoordinate(toque);
      if (coordinate === false)
        continue;

      this.touchstartScene(coordinate);
    }
  }

  touchmoveCanvas(event: TouchEvent) {
    event.preventDefault();
    for (let index = 0; index < event.changedTouches.length; index++) {
      const toque = event.changedTouches.item(index);
      const coordinate = this.getTouchCoordinate(toque);
      if (coordinate === false)
        continue;

      this.touchmoveScene(coordinate);
    }
  }

  touchendCanvas(event: TouchEvent) {
    event.preventDefault();
    for (let index = 0; index < event.changedTouches.length; index++) {
      const touch = event.changedTouches.item(index);
      const coordinate = this.getTouchCoordinate(touch);
      if (coordinate === false)
        continue;

      this.touchendScene(coordinate);
    }
  }

  positionOnCanvas(props: {
    position: Position_ENGINE;
  }) {
    const positionOnCamera = this.positionOnCamera({
      position: props.position
    });
    if (positionOnCamera === false)
      return false;

    return new Position_ENGINE({
      leftUp: new Coordinate_ENGINE({
        x: this.getWidthInPixels({
          percentage: positionOnCamera.leftUp.x
        }),
        y: this.getHeightInPixels({
          percentage: positionOnCamera.leftUp.y
        }),
      }),
      size: new Size_ENGINE({
        width: this.getWidthInPixels({
          percentage: positionOnCamera.size.width
        }),
        height: this.getHeightInPixels({
          percentage: positionOnCamera.size.height
        })
      })
    });
  }

  getWidthInPercentages(props: {
    pixels: number;
  }) {
    return props.pixels / this.aPercent.width;
  }

  getWidthInPixels(props: {
    percentage: number;
  }) {
    return props.percentage * this.aPercent.width;
  }

  getHeightInPercentages(props: {
    pixels: number;
  }) {
    return props.pixels / this.aPercent.height;
  }

  getHeightInPixels(props: {
    percentage: number;
  }) {
    return props.percentage * this.aPercent.height;
  }
}