// public/tsc/engine/coordinate.ts
class Coordinate {
  x;
  y;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  equals(coordinate) {
    return this.x === coordinate.x && this.y === coordinate.y;
  }
}

// public/tsc/engine/size.ts
class Size {
  width;
  height;
  constructor(width = 0, height = 0) {
    this.width = width;
    this.height = height;
  }
}

// public/tsc/engine/position.ts
class Position {
  initial;
  size;
  constructor(initial, size2) {
    this.initial = initial;
    this.size = size2;
  }
  get end() {
    return new Coordinate(this.initial.x + this.size.width, this.initial.y + this.size.height);
  }
  insideCoordinate(initial) {
    return this.inside(new Position(initial, new Size));
  }
  inside(position) {
    return this.initial.x <= position.initial.x && this.initial.y <= position.initial.y && this.end.x >= position.end.x && this.end.y >= position.end.y;
  }
}

// public/tsc/engine/camera.ts
class Camera extends Position {
  constructor(initial) {
    super(initial, new Size(100, 100));
  }
  insideCamera(position2) {
    const vision = new Position(new Coordinate(this.initial.x - position2.size.width, this.initial.y - position2.size.height), new Size(this.size.width + position2.size.width * 2, this.size.height + position2.size.height * 2));
    return vision.inside(position2);
  }
  positionOnCamera(position2) {
    const appearsInCamera = this.insideCamera(position2);
    if (appearsInCamera === false)
      return false;
    return new Position(new Coordinate(position2.initial.x - this.initial.x, position2.initial.y - this.initial.y), new Size(position2.size.width, position2.size.height));
  }
  focusPosition(position2) {
    let x = position2.initial.x - this.size.width / 2;
    x += position2.size.width / 2;
    let y = position2.initial.y - this.size.height / 2;
    y += position2.size.height / 2;
    this.initial.x = x;
    this.initial.y = y;
  }
}

// public/tsc/engine/images.ts
class Images {
  images;
  constructor() {
    this.images = {};
  }
  get(route) {
    return new Promise((resolve, reject) => {
      if (this.images[route] !== undefined)
        return resolve(this.images[route]);
      this.images[route] = new Image;
      this.images[route].addEventListener("load", () => resolve(this.images[route]));
      this.images[route].addEventListener("error", (err) => {
        reject(err);
        throw new Error(`image ${route} is not found`);
      });
      this.images[route].src = route;
    });
  }
}

// public/tsc/engine/canvas.ts
class Canvas extends Camera {
  onePercentage = new Size;
  margin = new Size;
  images;
  framesPerSecond;
  intervalBetweenFrames;
  element;
  context;
  time = 0;
  timeBetweenFrames = 0;
  drawScene() {
  }
  touchstartScene(touch) {
  }
  touchmoveScene(touch) {
  }
  touchendScene(touch) {
  }
  constructor(initial, framesPerSecond) {
    super(initial);
    this.images = new Images;
    this.framesPerSecond = framesPerSecond;
    this.intervalBetweenFrames = 1000 / this.framesPerSecond;
    this.element = window.document.querySelector("canvas");
    this.context = this.element.getContext("2d");
    this.aspectRatio();
    window.addEventListener("resize", () => this.aspectRatio());
    this.element.addEventListener("touchstart", (event) => this.touchstartCanvas(event));
    this.element.addEventListener("touchmove", (event) => this.touchmoveCanvas(event));
    this.element.addEventListener("touchend", (event) => this.touchendCanvas(event));
    this.nextFrame();
  }
  nextFrame(time = 0) {
    const difference = time - this.time;
    if (difference < this.intervalBetweenFrames) {
      requestAnimationFrame((time2) => this.nextFrame(time2));
      return;
    }
    this.timeBetweenFrames = difference;
    this.time = time;
    this.drawCanvas();
    requestAnimationFrame((time2) => this.nextFrame(time2));
  }
  start(drawScene, touchstartScene, touchmoveScene, touchendScene) {
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
    const screen = new Size(window.innerWidth, window.innerHeight);
    const ratio = 0.5625;
    this.element.width = screen.width;
    this.element.height = screen.width * ratio;
    if (this.element.height > screen.height) {
      const ratio2 = 1.7777777777777777;
      this.element.height = screen.height;
      this.element.width = screen.height * ratio2;
    }
    this.margin.width = screen.width - this.element.width;
    this.margin.height = screen.height - this.element.height;
    this.element.style.left = `${this.margin.width / 2}px`;
    this.element.style.top = `${this.margin.height / 2}px`;
    this.onePercentage.width = this.element.width / 100;
    this.onePercentage.height = this.element.height / 100;
  }
  getTouchCoordiante(touch) {
    const left = this.margin.width / 2;
    const top = this.margin.height / 2;
    return new Coordinate(touch.pageX - left, touch.pageY - top);
  }
  touchstartCanvas(event) {
    event.preventDefault();
    for (let index = 0;index < event.changedTouches.length; index++) {
      const touch = event.changedTouches[index];
      const coordinate4 = this.getTouchCoordiante(touch);
      this.touchstartScene(coordinate4);
    }
  }
  touchmoveCanvas(event) {
    event.preventDefault();
    for (let index = 0;index < event.changedTouches.length; index++) {
      const touch = event.changedTouches[index];
      const coordinate4 = this.getTouchCoordiante(touch);
      this.touchmoveScene(coordinate4);
    }
  }
  touchendCanvas(event) {
    event.preventDefault();
    for (let index = 0;index < event.changedTouches.length; index++) {
      const touch = event.changedTouches[index];
      const coordinate4 = this.getTouchCoordiante(touch);
      this.touchendScene(coordinate4);
    }
  }
  positionOnCanvas(position3) {
    const positionOnCamera = this.positionOnCamera(position3);
    if (positionOnCamera === false)
      return false;
    return new Position(new Coordinate(this.getWidthPixels(positionOnCamera.initial.x), this.getHeightPixels(positionOnCamera.initial.y)), new Size(this.getWidthPixels(positionOnCamera.size.width), this.getHeightPixels(positionOnCamera.size.height)));
  }
  getWidthPercentage(pixels) {
    return pixels / this.onePercentage.width;
  }
  getWidthPixels(percentage) {
    return percentage * this.onePercentage.width;
  }
  getHeightPercentage(pixels) {
    return pixels / this.onePercentage.height;
  }
  getHeightPixels(percentage) {
    return percentage * this.onePercentage.height;
  }
}

// public/tsc/engine/scene.ts
class Scene {
  canvas;
  draw() {
  }
  touchstart(touch) {
  }
  touchmove(touch) {
  }
  touchend(touch) {
  }
  constructor(canvas) {
    this.canvas = canvas;
  }
  start() {
    this.canvas.start(() => this.draw(), (touch) => this.touchstart(touch), (touch) => this.touchmove(touch), (touch) => this.touchend(touch));
  }
}

// public/tsc/engine/image.ts
class Image2 extends Position {
  canvas;
  route;
  constructor(initial, size4, canvas, route) {
    super(initial, size4);
    this.canvas = canvas;
    this.route = route;
  }
  async image() {
    return await this.canvas.images.get(this.route);
  }
  async drawImage() {
    const image = await this.image();
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;
    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(image, positionOnCanvas.initial.x, positionOnCanvas.initial.y, positionOnCanvas.size.width, positionOnCanvas.size.height);
  }
}

// public/tsc/engine/boxes.ts
class Boxes extends Coordinate {
  boxes = [];
  canvas;
  boxParameters;
  constructor(x, y, canvas, boxParameters) {
    super(x, y);
    this.canvas = canvas;
    this.boxParameters = boxParameters;
  }
  getBoxesOfCoordinate(coordinate5) {
    const boxX = Math.floor(coordinate5.x / this.boxParameters.size.width);
    const boxY = Math.floor(coordinate5.y / this.boxParameters.size.height);
    return new Coordinate(boxX, boxY);
  }
  getCoordinateOfBoxes(boxes) {
    const distanceBoxX = boxes.x * this.boxParameters.size.width;
    const distanceBoxY = boxes.y * this.boxParameters.size.height;
    return new Coordinate(this.x + distanceBoxX, this.y + distanceBoxY);
  }
  boxIndex(boxes) {
    if (this.boxes[boxes.y] === undefined)
      this.boxes[boxes.y] = [];
    const index = this.boxes[boxes.y][boxes.x];
    if (index === undefined)
      return false;
    return index;
  }
  setOccupiedBox(boxes, indices, index) {
    const y = boxes.y + indices.y;
    const x = boxes.x + indices.x;
    if (this.boxes[y] === undefined)
      this.boxes[y] = [];
    this.boxes[y][x] = index;
  }
  setBoxIndex(index, boxes) {
    if (this.boxParameters.occupiedBoxes === true) {
      for (let y = 0;y < this.boxParameters.length.vertical; y++) {
        for (let x = 0;x < this.boxParameters.length.horizontal; x++) {
          this.setOccupiedBox(boxes, new Coordinate(x, y), index);
        }
      }
      return;
    }
    this.boxParameters.occupiedBoxes.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === false)
          return;
        this.setOccupiedBox(boxes, new Coordinate(x, y), index);
      });
    });
  }
}

// public/tsc/engine/imageBoxes.ts
class ImageBoxes extends Boxes {
  images = [];
  constructor(x, y, canvas, boxesParameters) {
    super(x, y, canvas, boxesParameters);
  }
  setImage(boxes2, route) {
    const index = this.boxIndex(boxes2);
    if (index !== false)
      return index;
    const coordinateOfBoxes = this.getCoordinateOfBoxes(boxes2);
    const newImage = new Image2(coordinateOfBoxes, new Size(this.boxParameters.size.width * this.boxParameters.length.horizontal, this.boxParameters.size.height * this.boxParameters.length.vertical), this.canvas, route);
    this.images.push(newImage);
    const newIndex = this.images.length - 1;
    this.setBoxIndex(newIndex, boxes2);
    return newIndex;
  }
  async drawImages() {
    for (const image2 of this.images) {
      await image2.drawImage();
    }
  }
}

// public/tsc/engine/plane.ts
class Plane {
  horizontal;
  vertical;
  constructor(horizontal = 0, vertical = 0) {
    this.horizontal = horizontal;
    this.vertical = vertical;
  }
}

// public/tsc/game/castles.ts
class Castles extends ImageBoxes {
  constructor(x, y, canvas, map) {
    super(x, y, canvas, {
      size: new Size(map.boxes.width, map.boxes.height),
      length: new Plane(4, 3),
      occupiedBoxes: true
    });
  }
  setCastle(boxes2, color, state) {
    const route = this.routeCastle(color, state);
    return this.setImage(boxes2, route);
  }
  routeCastle(color, state) {
    let file = state;
    if (state === "ready")
      file = color;
    return `images/factions/knights/buildings/castle/${file}.png`;
  }
  async drawCastles() {
    await this.drawImages();
  }
}

// public/tsc/engine/elements/element.ts
class Element extends Position {
  constructor(size6, plane2) {
    super(new Coordinate, size6);
    this.horizontal = plane2.horizontal;
    this.vertical = plane2.vertical;
  }
  set horizontal(horizontal) {
    this.initial.x = this.size.width * horizontal;
  }
  get horizontal() {
    return this.initial.x / this.size.width;
  }
  set vertical(vertical) {
    this.initial.y = this.size.height * vertical;
  }
  get vertical() {
    return this.initial.y / this.size.height;
  }
  nextFrame(frames) {
    this.horizontal++;
    if (this.horizontal >= frames)
      this.horizontal = 0;
  }
}

// public/tsc/engine/elements.ts
class Elements extends Image2 {
  element;
  constructor(initial, size6, canvas, route, elementParameters) {
    super(initial, size6, canvas, route);
    this.element = new Element(elementParameters.size, elementParameters.plane);
  }
  async drawElement() {
    const image3 = await this.image();
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;
    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(image3, this.element.initial.x, this.element.initial.y, this.element.size.width, this.element.size.height, positionOnCanvas.initial.x, positionOnCanvas.initial.y, positionOnCanvas.size.width, positionOnCanvas.size.height);
  }
}

// public/tsc/engine/elementBoxes.ts
class ElementBoxes extends Boxes {
  groupElements;
  elementsParameters;
  constructor(x, y, canvas, boxParameters, elementsParameters) {
    super(x, y, canvas, boxParameters);
    this.groupElements = [];
    this.elementsParameters = elementsParameters;
  }
  setElements(boxes3, route, elementsParameters) {
    const index = this.boxIndex(boxes3);
    if (index !== false)
      return index;
    const coordinateOfBoxes = this.getCoordinateOfBoxes(boxes3);
    const newElements = new Elements(coordinateOfBoxes, new Size(this.boxParameters.size.width * this.boxParameters.length.horizontal, this.boxParameters.size.height * this.boxParameters.length.vertical), this.canvas, route, {
      size: this.elementsParameters.element.size,
      plane: elementsParameters.element.plane
    });
    this.groupElements.push(newElements);
    const newIndex = this.groupElements.length - 1;
    this.setBoxIndex(newIndex, boxes3);
    return newIndex;
  }
  async drawElements() {
    for (const elements2 of this.groupElements) {
      await elements2.drawElement();
    }
  }
}

// public/tsc/game/grounds.ts
class Grounds extends ElementBoxes {
  elementPlanes;
  constructor(x, y, canvas, map, elementPlanes) {
    super(x, y, canvas, {
      size: new Size(map.boxes.width, map.boxes.height),
      length: new Plane(1, 1),
      occupiedBoxes: true
    }, {
      element: {
        size: new Size(64, 64)
      }
    });
    this.elementPlanes = elementPlanes;
  }
  setGround(boxes3, route) {
    this.setElements(boxes3, route, {
      element: {
        plane: new Plane(this.elementPlanes.only.horizontal, this.elementPlanes.only.vertical)
      }
    });
    this.refreshElements();
  }
  refreshElements() {
    this.groupElements.forEach((elements2) => {
      const boxes3 = this.getBoxesOfCoordinate(elements2.initial);
      const element2 = this.getElementsFactoryOfBoxes(boxes3);
      elements2.element.horizontal = element2.horizontal;
      elements2.element.vertical = element2.vertical;
    });
  }
  getElementsFactoryOfBoxes(boxes3) {
    const leftBoxes = new Coordinate(boxes3.x - 1, boxes3.y);
    const rightBoxes = new Coordinate(boxes3.x + 1, boxes3.y);
    const upBoxes = new Coordinate(boxes3.x, boxes3.y - 1);
    const downBoxes = new Coordinate(boxes3.x, boxes3.y + 1);
    const left = this.boxIndex(leftBoxes) !== false;
    const right = this.boxIndex(rightBoxes) !== false;
    const up = this.boxIndex(upBoxes) !== false;
    const down = this.boxIndex(downBoxes) !== false;
    const isLeftUp = !up && down && !left && right;
    if (isLeftUp)
      return this.elementPlanes.leftUp;
    const isUp = !up && down && left && right;
    if (isUp)
      return this.elementPlanes.up;
    const isRightUp = !up && down && left && !right;
    if (isRightUp)
      return this.elementPlanes.rightUp;
    const isLeft = up && down && !left && right;
    if (isLeft)
      return this.elementPlanes.left;
    const isCenter = up && down && left && right;
    if (isCenter)
      return this.elementPlanes.center;
    const isRight = up && down && left && !right;
    if (isRight)
      return this.elementPlanes.right;
    const isLeftDown = up && !down && !left && right;
    if (isLeftDown)
      return this.elementPlanes.leftDown;
    const isDown = up && !down && left && right;
    if (isDown)
      return this.elementPlanes.down;
    const isRightDown = up && !down && left && !right;
    if (isRightDown)
      return this.elementPlanes.rightDown;
    const isHorizontalLeft = !up && !down && !left && right;
    if (isHorizontalLeft)
      return this.elementPlanes.horizontalLeft;
    const isHorizontalCenter = !up && !down && left && right;
    if (isHorizontalCenter)
      return this.elementPlanes.horizontalCenter;
    const isHorizontalRight = !up && !down && left && !right;
    if (isHorizontalRight)
      return this.elementPlanes.horizontalRight;
    const isVerticalUp = !up && down && !left && !right;
    if (isVerticalUp)
      return this.elementPlanes.verticalUp;
    const isVerticalCenter = up && down && !left && !right;
    if (isVerticalCenter)
      return this.elementPlanes.verticalCenter;
    const isVerticalDown = up && !down && !left && !right;
    if (isVerticalDown)
      return this.elementPlanes.verticalDown;
    return this.elementPlanes.only;
  }
  async drawGrounds() {
    await this.drawElements();
  }
}

// public/tsc/game/elevations.ts
class Elevations extends Grounds {
  constructor(x, y, canvas, map) {
    super(x, y, canvas, map, {
      leftUp: new Plane(0, 0),
      up: new Plane(1, 0),
      rightUp: new Plane(2, 0),
      left: new Plane(0, 1),
      center: new Plane(1, 1),
      right: new Plane(2, 1),
      leftDown: new Plane(0, 2),
      down: new Plane(1, 2),
      rightDown: new Plane(2, 2),
      horizontalLeft: new Plane(0, 4),
      horizontalCenter: new Plane(1, 4),
      horizontalRight: new Plane(2, 4),
      verticalUp: new Plane(3, 0),
      verticalCenter: new Plane(3, 1),
      verticalDown: new Plane(3, 2),
      only: new Plane(3, 4)
    });
  }
  setElevation(boxes3) {
    const route = "images/terrain/ground/elevation.png";
    this.setGround(boxes3, route);
  }
  async drawElevations() {
    await this.drawGrounds();
  }
}

// public/tsc/game/flatsYellow.ts
class FlatsYellow extends Grounds {
  constructor(x, y, canvas, map) {
    super(x, y, canvas, map, {
      leftUp: new Plane(5, 0),
      up: new Plane(6, 0),
      rightUp: new Plane(7, 0),
      left: new Plane(5, 1),
      center: new Plane(6, 1),
      right: new Plane(7, 1),
      leftDown: new Plane(5, 2),
      down: new Plane(6, 2),
      rightDown: new Plane(7, 2),
      horizontalLeft: new Plane(5, 3),
      horizontalCenter: new Plane(6, 3),
      horizontalRight: new Plane(7, 3),
      verticalUp: new Plane(8, 0),
      verticalCenter: new Plane(8, 1),
      verticalDown: new Plane(8, 2),
      only: new Plane(8, 3)
    });
  }
  setFlat(boxes3) {
    const route = `images/terrain/ground/flat.png`;
    this.setGround(boxes3, route);
  }
  async drawFlatsYellow() {
    await this.drawGrounds();
  }
}

// public/tsc/engine/animations/animation.ts
class Animation {
  frames;
  framesPerSecond;
  intervalBetweenFrame;
  constructor(frames, framesPerSecond) {
    this.frames = frames;
    this.framesPerSecond = framesPerSecond;
    this.intervalBetweenFrame = 1000 / this.framesPerSecond;
  }
}

// public/tsc/engine/animations.ts
class Animations extends Elements {
  timerNextFrame = 0;
  animation;
  constructor(initial, size8, canvas, route, elementParameters, animation2) {
    super(initial, size8, canvas, route, elementParameters);
    this.animation = new Animation(animation2.frames, animation2.framesPerSecond);
  }
  nextFrame() {
    this.timerNextFrame += this.canvas.timeBetweenFrames;
    if (this.timerNextFrame < this.animation.intervalBetweenFrame)
      return;
    this.timerNextFrame = 0;
    this.element.nextFrame(this.animation.frames);
  }
  async drawAnimation() {
    this.nextFrame();
    await this.drawElement();
  }
}

// public/tsc/engine/animationBoxes.ts
class AnimationBoxes extends Boxes {
  animationGroup = [];
  animationsParameters;
  constructor(x, y, canvas, boxesParameters, animationsParameters) {
    super(x, y, canvas, boxesParameters);
    this.animationsParameters = animationsParameters;
  }
  setAnimations(boxes4, route, plane6) {
    const index = this.boxIndex(boxes4);
    if (index !== false)
      return index;
    const coordinateOfBoxes = this.getCoordinateOfBoxes(boxes4);
    const newAnimations = new Animations(coordinateOfBoxes, new Size(this.boxParameters.size.width * this.boxParameters.length.horizontal, this.boxParameters.size.height * this.boxParameters.length.vertical), this.canvas, route, {
      size: this.animationsParameters.element.size,
      plane: new Plane(0, plane6.vertical)
    }, this.animationsParameters.animation);
    this.animationGroup.push(newAnimations);
    const newIndex = this.animationGroup.length - 1;
    this.setBoxIndex(newIndex, boxes4);
    return newIndex;
  }
  async drawAnimations() {
    for (const animations2 of this.animationGroup) {
      await animations2.drawAnimation();
    }
  }
}

// public/tsc/game/foams.ts
class Foams extends AnimationBoxes {
  constructor(x, y, canvas, map) {
    super(x, y, canvas, {
      size: new Size(map.boxes.width, map.boxes.height),
      length: new Plane(3, 3),
      occupiedBoxes: [
        [true, false, false],
        [false, false, false],
        [false, false, false]
      ]
    }, {
      element: {
        size: new Size(192, 192)
      },
      animation: {
        frames: 8,
        framesPerSecond: 8
      }
    });
  }
  setFoam(boxes4) {
    const route = `images/terrain/water/foam.png`;
    const index = this.setAnimations(boxes4, route, new Plane);
    const foam = this.animationGroup[index];
    foam.initial.x -= this.boxParameters.size.width;
    foam.initial.y -= this.boxParameters.size.height;
  }
  async drawFoams() {
    await this.drawAnimations();
  }
}

// public/tsc/game/water.ts
class Water extends ImageBoxes {
  constructor(x, y, canvas, map) {
    super(x, y, canvas, {
      size: new Size(map.boxes.width, map.boxes.height),
      length: new Plane(1, 1),
      occupiedBoxes: true
    });
  }
  setWater(boxes4) {
    const route = "images/terrain/water/water.png";
    this.setImage(boxes4, route);
  }
  async drawWaters() {
    await this.drawImages();
  }
}

// public/tsc/game/mapMatrix.ts
var MapMatrixLength = new Plane(20, 20);
var MapMatrix = () => {
  const matrix = [];
  for (let y = 0;y < MapMatrixLength.vertical; y++) {
    matrix.push([]);
    for (let x = 0;x < MapMatrixLength.horizontal; x++) {
      const box = {
        water: false,
        foam: false,
        elevation: false,
        wallElevation: false,
        stairElevation: false,
        castle: false
      };
      box.water = true;
      if (y > 0 && y < 19 && x > 0 && x < 19)
        box.foam = {
          flatSand: true
        };
      if (x > 3 && x < 16) {
        if (y > 0 && y < 18)
          box.elevation = {
            shadow: true,
            flatGrass: true
          };
        if (y === 18)
          box.wallElevation = {
            shadow: true,
            flatElevation: "sand"
          };
      }
      if (y === 4 && x === 8)
        box.castle = {
          color: "blue",
          state: "ready"
        };
      matrix[y].push(box);
    }
  }
  return matrix;
};

// public/tsc/game/wallElevations.ts
class WallElevations extends ElementBoxes {
  elementPlanes;
  elevations;
  constructor(x, y, canvas, map, elevations) {
    super(x, y, canvas, {
      size: new Size(map.boxes.width, map.boxes.height),
      length: new Plane(1, 1),
      occupiedBoxes: true
    }, {
      element: {
        size: new Size(64, 64)
      }
    });
    this.elementPlanes = {
      left: new Plane(0, 3),
      center: new Plane(1, 3),
      right: new Plane(2, 3),
      vertical: new Plane(3, 3),
      horizontalLeft: new Plane(0, 5),
      horizontalCenter: new Plane(1, 5),
      horizontalRight: new Plane(2, 5),
      only: new Plane(3, 5)
    };
    this.elevations = elevations;
  }
  getElementFromBox(boxes4) {
    const leftUpBoxes = new Coordinate(boxes4.x - 1, boxes4.y - 1);
    const leftDoubleUpBoxes = new Coordinate(boxes4.x - 1, boxes4.y - 2);
    const upBoxes = new Coordinate(boxes4.x, boxes4.y - 1);
    const doubleUpBoxes = new Coordinate(boxes4.x, boxes4.y - 2);
    const rightUpBoxes = new Coordinate(boxes4.x + 1, boxes4.y - 1);
    const rightDoubleUpBoxes = new Coordinate(boxes4.x + 1, boxes4.y - 2);
    const center = this.elevations.boxIndex(boxes4) !== false;
    const leftUp = this.elevations.boxIndex(leftUpBoxes) !== false;
    const leftDoubleUp = this.elevations.boxIndex(leftDoubleUpBoxes) !== false;
    const up = this.elevations.boxIndex(upBoxes) !== false;
    const doubleUp = this.elevations.boxIndex(doubleUpBoxes) !== false;
    const rightUp = this.elevations.boxIndex(rightUpBoxes) !== false;
    const rightDoubleUp = this.elevations.boxIndex(rightDoubleUpBoxes) !== false;
    const isLeft = !center && !leftUp && !leftDoubleUp && up && doubleUp && rightUp && rightDoubleUp;
    if (isLeft)
      return this.elementPlanes.left;
    const isCenter = !center && leftUp && leftDoubleUp && up && doubleUp && rightUp && rightDoubleUp;
    if (isCenter)
      return this.elementPlanes.center;
    const isRight = !center && leftUp && leftDoubleUp && up && doubleUp && !rightUp && !rightDoubleUp;
    if (isRight)
      return this.elementPlanes.right;
    const isVertical = !center && !leftUp && !leftDoubleUp && up && doubleUp && !rightUp && !rightDoubleUp;
    if (isVertical)
      return this.elementPlanes.vertical;
    const isHorizontalLeft = !center && !leftUp && up && rightUp;
    if (isHorizontalLeft)
      return this.elementPlanes.horizontalLeft;
    const isHorizontalCenter = !center && leftUp && up && rightUp;
    if (isHorizontalCenter)
      return this.elementPlanes.horizontalCenter;
    const isHorizontalRight = !center && leftUp && up && !rightUp;
    if (isHorizontalRight)
      return this.elementPlanes.horizontalRight;
    const isOnly = !center && !leftUp && up && !rightUp;
    if (isOnly)
      return this.elementPlanes.only;
    throw new Error("invalid element");
  }
  refreshElements() {
    this.groupElements.forEach((elements3, index) => {
      const boxes4 = this.getBoxesOfCoordinate(elements3.initial);
      const element2 = this.getElementFromBox(boxes4);
      elements3.element.horizontal = element2.horizontal;
      elements3.element.vertical = element2.vertical;
    });
  }
  setWallElevations(boxes4) {
    const element2 = this.getElementFromBox(boxes4);
    const route = "images/terrain/ground/elevation.png";
    this.setElements(boxes4, route, {
      element: {
        plane: element2
      }
    });
    this.refreshElements();
  }
  async drawWallElevations() {
    await this.drawElements();
  }
}

// public/tsc/game/stairsElevations.ts
class StairsElevations extends ElementBoxes {
  elementPlanes;
  elevations;
  constructor(x, y, canvas, map, elevations) {
    super(x, y, canvas, {
      size: new Size(map.boxes.width, map.boxes.height),
      length: new Plane(1, 1),
      occupiedBoxes: true
    }, {
      element: {
        size: new Size(64, 64)
      }
    });
    this.elementPlanes = {
      left: new Plane(0, 7),
      center: new Plane(1, 7),
      right: new Plane(2, 7),
      only: new Plane(3, 7)
    };
    this.elevations = elevations;
  }
  getElementFromBox(boxes4) {
    const leftUpBoxes = new Coordinate(boxes4.x - 1, boxes4.y - 1);
    const upBoxes = new Coordinate(boxes4.x, boxes4.y - 1);
    const rightUpBoxes = new Coordinate(boxes4.x + 1, boxes4.y - 1);
    const center = this.elevations.boxIndex(boxes4) !== false;
    const leftUp = this.elevations.boxIndex(leftUpBoxes) !== false;
    const up = this.elevations.boxIndex(upBoxes) !== false;
    const rightUp = this.elevations.boxIndex(rightUpBoxes) !== false;
    const isLeft = !center && !leftUp && up && rightUp;
    if (isLeft)
      return this.elementPlanes.left;
    const isCenter = !center && leftUp && up && rightUp;
    if (isCenter)
      return this.elementPlanes.center;
    const isRight = !center && leftUp && up && !rightUp;
    if (isRight)
      return this.elementPlanes.right;
    const isOnly = !center && !leftUp && up && !rightUp;
    if (isOnly)
      return this.elementPlanes.only;
    throw new Error("invalid element");
  }
  setStairsElevations(boxes4) {
    const element2 = this.getElementFromBox(boxes4);
    const route = `images/terrain/ground/elevation.png`;
    this.setElements(boxes4, route, {
      element: {
        plane: element2
      }
    });
  }
  async drawStairsElevations() {
    await this.drawElements();
  }
}

// public/tsc/game/shadows.ts
class Shadows extends ImageBoxes {
  constructor(x, y, canvas, map) {
    super(x, y, canvas, {
      size: new Size(map.boxes.width, map.boxes.height),
      length: new Plane(3, 3),
      occupiedBoxes: [
        [true, false, false],
        [false, false, false],
        [false, false, false]
      ]
    });
  }
  setShadow(boxes4) {
    const route = "images/terrain/ground/shadows.png";
    const index = this.setImage(boxes4, route);
    const shadow = this.images[index];
    shadow.initial.x -= this.boxParameters.size.width;
    shadow.initial.y -= this.boxParameters.size.height;
  }
  async drawShadows() {
    await this.drawImages();
  }
}

// public/tsc/game/flatElevations.ts
class FlatElevations extends ElementBoxes {
  elementPlanes;
  constructor(x, y, canvas, map) {
    super(x, y, canvas, {
      size: new Size(map.boxes.width, map.boxes.height),
      length: new Plane(1, 1),
      occupiedBoxes: true
    }, {
      element: {
        size: new Size(64, 64)
      }
    });
    this.elementPlanes = {
      grass: new Plane(4, 0),
      sand: new Plane(9, 0)
    };
  }
  setFlatElevation(boxes4, plane13) {
    const element2 = this.elementPlanes[plane13];
    const route = `images/terrain/ground/flat.png`;
    this.setElements(boxes4, route, {
      element: {
        plane: element2
      }
    });
  }
  async drawStainsForWalls() {
    await this.drawElements();
  }
}

// public/tsc/game/map.ts
class Map extends Position {
  matrix = MapMatrix();
  boxes;
  water;
  foams;
  flatsYellow;
  shadows;
  elevations;
  wallElevations;
  flatElevations;
  stairsElevation;
  castles;
  constructor(canvas) {
    super(new Coordinate, new Size(100, 100));
    this.boxes = new Size(this.size.width / MapMatrixLength.horizontal, this.size.height / MapMatrixLength.vertical);
    this.water = new Water(this.initial.x, this.initial.y, canvas, this);
    this.foams = new Foams(this.initial.x, this.initial.y, canvas, this);
    this.flatsYellow = new FlatsYellow(this.initial.x, this.initial.y, canvas, this);
    this.shadows = new Shadows(this.initial.x, this.initial.y, canvas, this);
    this.elevations = new Elevations(this.initial.x, this.initial.y, canvas, this);
    this.wallElevations = new WallElevations(this.initial.x, this.initial.y, canvas, this, this.elevations);
    this.flatElevations = new FlatElevations(this.initial.x, this.initial.y, canvas, this);
    this.stairsElevation = new StairsElevations(this.initial.x, this.initial.y, canvas, this, this.elevations);
    this.castles = new Castles(this.initial.x, this.initial.y, canvas, this);
    this.matrix.forEach((row, y) => {
      row.forEach((box, x) => {
        const boxes4 = new Coordinate(x, y);
        if (box.water === true)
          this.water.setWater(boxes4);
        if (box.foam !== false) {
          this.foams.setFoam(boxes4);
          if (box.foam.flatSand === true)
            this.flatsYellow.setFlat(boxes4);
        }
        if (box.elevation !== false) {
          if (box.elevation.shadow === true)
            this.shadows.setShadow(boxes4);
          this.elevations.setElevation(boxes4);
        }
        if (box.wallElevation !== false) {
          if (box.wallElevation.shadow === true)
            this.shadows.setShadow(boxes4);
          this.wallElevations.setWallElevations(boxes4);
          if (box.wallElevation.flatElevation !== false)
            this.flatElevations.setFlatElevation(boxes4, box.wallElevation.flatElevation);
        }
        if (box.stairElevation !== false) {
          if (box.stairElevation.shadow === true)
            this.shadows.setShadow(boxes4);
          this.stairsElevation.setStairsElevations(boxes4);
        }
        if (box.castle !== false) {
          this.castles.setCastle(boxes4, box.castle.color, box.castle.state);
        }
      });
    });
  }
  async drawMap() {
    await this.water.drawWaters();
    await this.foams.drawFoams();
    await this.flatsYellow.drawFlatsYellow();
    await this.shadows.drawShadows();
    await this.elevations.drawElevations();
    await this.stairsElevation.drawStairsElevations();
    await this.wallElevations.drawWallElevations();
    await this.castles.drawCastles();
  }
}

// public/tsc/engine/character.ts
class Character extends Animations {
  speed;
  address;
  constructor(initial, size16, canvas, route, elementParameters, animation2, speed) {
    super(initial, size16, canvas, route, elementParameters, animation2);
    this.speed = speed;
    this.address = new Coordinate;
  }
  move() {
    if (this.address.equals(new Coordinate))
      return false;
    const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
    const speedX = this.speed.x * secondsBetweenFrames;
    const speedY = this.speed.y * secondsBetweenFrames;
    const distanceX = speedX * this.address.x;
    const distanceY = speedY * this.address.y;
    const newX = this.initial.x + distanceX;
    const newY = this.initial.y + distanceY;
    this.initial.x = newX;
    this.initial.y = newY;
    return true;
  }
  async drawCharacter() {
    this.move();
    await this.drawAnimation();
  }
}

// public/tsc/engine/rect.ts
class Rect extends Position {
  canvas;
  fillStyle;
  strokeStyle;
  lineWidth;
  constructor(initial, size16, canvas, fillStyle = "", strokeStyle = "", lineWidth = 0) {
    super(initial, size16);
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }
  drawRect() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;
    if (this.fillStyle.length > 0) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fillRect(positionOnCanvas.initial.x, positionOnCanvas.initial.y, positionOnCanvas.size.width, positionOnCanvas.size.height);
    }
    if (this.strokeStyle.length > 0) {
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.strokeRect(positionOnCanvas.initial.x, positionOnCanvas.initial.y, positionOnCanvas.size.width, positionOnCanvas.size.height);
    }
  }
}

// public/tsc/engine/text.ts
class Text extends Position {
  canvas;
  value;
  fillStyle;
  strokeStyle;
  dungeonFont;
  constructor(initial, size16, canvas, value = "", fillStyle = "", strokeStyle = "", dungeonFont = false) {
    super(initial, size16);
    this.canvas = canvas;
    this.value = value;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.dungeonFont = dungeonFont;
  }
  get font() {
    let font = `${this.size.height}px`;
    if (this.dungeonFont === true)
      font.concat(" Dungeon,");
    return font.concat("sans - serif, arial");
  }
  drawText() {
    if (this.value.length === 0)
      return;
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;
    this.canvas.context.font = this.font;
    this.canvas.context.textAlign = "left";
    this.canvas.context.textBaseline = "top";
    positionOnCanvas.size.width = this.canvas.context.measureText(this.value).width;
    positionOnCanvas.initial.x += this.size.width / 2;
    positionOnCanvas.initial.x -= positionOnCanvas.size.width / 2;
    if (this.fillStyle.length > 0) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fillText(this.value, positionOnCanvas.initial.x, positionOnCanvas.initial.y);
    }
    if (this.strokeStyle.length > 0) {
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.strokeText(this.value, positionOnCanvas.initial.x, positionOnCanvas.initial.y);
    }
  }
}

// public/tsc/game/userBar.ts
class UserBar extends Rect {
  photo;
  name;
  constructor(size17, canvas, photoRoute, nickname) {
    super(new Coordinate, size17, canvas, "#416177", "#fff", 0.5);
    this.photo = new Image2(new Coordinate, new Size(this.size.width * 0.3, this.size.height), this.canvas, photoRoute);
    this.name = new Text(new Coordinate, new Size(this.size.width * 0.7, 9), this.canvas, nickname, "#fff");
  }
  async drawUserBar(initial) {
    this.initial.x = initial.x;
    this.initial.y = initial.y - this.size.height;
    this.photo.initial.x = this.initial.x;
    this.photo.initial.y = this.initial.y;
    this.name.initial.x = this.initial.x + this.photo.size.width;
    this.name.initial.y = this.initial.y;
    this.drawRect();
    await this.photo.drawImage();
    this.name.drawText();
  }
}

// public/tsc/game/pawn.ts
class Pawn extends Character {
  map;
  nickname;
  userBar;
  constructor(initial, map, canvas, color, nickname, userBar2) {
    super(initial, new Size(map.boxes.width * 3, map.boxes.height * 3), canvas, `images/factions/knights/troops/pawn/${color}.png`, {
      size: new Size(192, 192),
      plane: new Plane(6, 6)
    }, {
      frames: 6,
      framesPerSecond: 6
    }, new Coordinate(2, 2));
    this.map = map;
    this.nickname = nickname;
    this.userBar = new UserBar(new Size(map.boxes.width, map.boxes.height / 2), canvas, userBar2.photoRoute, this.nickname);
  }
  async drawPawn() {
    await this.drawCharacter();
    await this.userBar.drawUserBar(new Coordinate(this.initial.x + this.map.boxes.width, this.initial.y + this.map.boxes.height));
  }
}

// public/tsc/game/game.ts
class Game extends Scene {
  map;
  pawns = [];
  constructor(canvas) {
    super(canvas);
    this.map = new Map(this.canvas);
  }
  tiktokGift(gift) {
    const exist = this.pawns.some((pawn2) => pawn2.nickname === gift.nickname);
    if (exist === true)
      return;
    this.pawns.push(new Pawn(new Coordinate(Math.floor(Math.random() * this.map.size.width), Math.floor(Math.random() * this.map.size.height)), this.map, this.canvas, "blue", gift.nickname, {
      photoRoute: gift.profilePictureUrl
    }));
  }
  tiktokChat(chat) {
  }
  async draw() {
    await this.map.drawMap();
    for (const pawn2 of this.pawns) {
      await pawn2.drawPawn();
    }
  }
}

// public/tsc/index.ts
globalThis.addEventListener("load", () => {
  const canvas2 = new Canvas(new Coordinate, 24);
  const game2 = new Game(canvas2);
  game2.start();
});
