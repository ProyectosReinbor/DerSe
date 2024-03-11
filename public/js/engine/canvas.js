import { Camera } from "./camera.js";
import { Coordinate } from "./coordinate.js";
import { Images } from "./images.js";
import { Position } from "./position.js";

export class Canvas extends Camera {
  constructor(
    framesPerSecond,
    initialX,
    initialY,
  ) {
    super(initialX, initialY);
    this.onePercentOfWidth = 0;
    this.onePercentOfHeight = 0;
    this.marginWidth = 0;
    this.marginHeight = 0;

    this.images = new Images();
    this.framesPerSecond = framesPerSecond;
    this.intervalBetweenFrames = 1000 / this.framesPerSecond;
    this.element = document.querySelector("canvas");
    this.context = this.element.getContext("2d");

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

  nextFrame(time = 0) {
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
    drawScene,
    touchstartScene,
    touchmoveScene,
    touchendScene,
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

  getTouchCoordiante(pageX, pageY) {
    const left = this.marginWidth / 2;
    const top = this.marginHeight / 2;
    return new Coordinate(
      pageX - left,
      pageY - top
    );
  }

  touchstartCanvas(event) {
    event.preventDefault();
    for (const { pageX, pageY } of event.changedTouches) {
      const touch = this.getTouchCoordiante(pageX, pageY);
      this.touchstartScene(touch.x, touch.y);
    }
  }

  touchmoveCanvas(event) {
    event.preventDefault();
    for (const { pageX, pageY } of event.changedTouches) {
      const touch = this.getTouchCoordiante(pageX, pageY);
      this.touchmoveScene(touch.x, touch.y);
    }
  }

  touchendCanvas(event) {
    event.preventDefault();
    for (const { pageX, pageY } of event.changedTouches) {
      const touch = this.getTouchCoordiante(pageX, pageY);
      this.touchendScene(touch.x, touch.y);
    }
  }

  drawScene() { }
  touchstartScene() { }
  touchmoveScene() { }
  touchendScene() { }


  positionOnCanvas(
    initialX,
    initialY,
    sizeWidth,
    sizeHeight,
    endX,
    endY
  ) {
    const positionOnCamera = this.positionOnCamera(
      initialX,
      initialY,
      sizeWidth,
      sizeHeight,
      endX,
      endY
    );
    if (positionOnCamera === false) return false;
    return new Position(
      this.getWidthPixels(positionOnCamera.initial.x),
      this.getHeightPixels(positionOnCamera.initial.y),
      this.getWidthPixels(positionOnCamera.size.width),
      this.getHeightPixels(positionOnCamera.size.height)
    );
  }

  getWidthPercentage(pixels) {
    return pixels / this.onePercentOfWidth;
  }

  getWidthPixels(percentage) {
    return percentage * this.onePercentOfWidth;
  }

  getHeightPercentage(pixels) {
    return pixels / this.onePercentOfHeight;
  }

  getHeightPixels(percentage) {
    return percentage * this.onePercentOfHeight;
  }
}