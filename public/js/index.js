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
  notFound = [];
  routes = [];
  images = {};
  imageExists(route) {
    if (this.notFound.includes(route))
      throw new Error(`image ${route} is not found`);
    if (this.images[route] === undefined)
      return false;
    return true;
  }
  getImage(route) {
    if (this.imageExists(route) === false)
      throw new Error(`image ${route} is not found`);
    return this.images[route];
  }
  addRoute(route) {
    if (this.routes.includes(route) === true)
      return;
    this.routes.push(route);
  }
  async loadAll() {
    for (const route of this.routes) {
      await this.load(route);
    }
  }
  load(route) {
    return new Promise((resolve, reject) => {
      if (this.imageExists(route) === true)
        return resolve(this.images[route]);
      const image = new Image;
      image.addEventListener("load", () => {
        this.images[route] = image;
        resolve(this.images[route]);
      });
      image.addEventListener("error", () => this.notFound.push(route));
      image.src = route;
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
  touchstartScene = () => {
  };
  touchmoveScene = () => {
  };
  touchendScene = () => {
  };
  constructor(initial, framesPerSecond) {
    super(initial);
    this.images = new Images;
    this.framesPerSecond = framesPerSecond;
    this.intervalBetweenFrames = 1000 / this.framesPerSecond;
    this.element = window.document.getElementById("canvas");
    this.context = this.element.getContext("2d");
    this.aspectRatio();
    window.addEventListener("resize", () => this.aspectRatio());
    this.element.addEventListener("touchstart", (event) => this.touchstartCanvas(event), {
      passive: false
    });
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
  async start(drawScene, touchstartScene, touchmoveScene, touchendScene) {
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
  getTouchCoordinate(touch) {
    const left = this.margin.width / 2;
    const top = this.margin.height / 2;
    return new Coordinate(touch.pageX - left, touch.pageY - top);
  }
  touchstartCanvas(event) {
    event.preventDefault();
    for (let index = 0;index < event.changedTouches.length; index++) {
      const touch = event.changedTouches[index];
      const coordinate4 = this.getTouchCoordinate(touch);
      this.touchstartScene(coordinate4);
    }
  }
  touchmoveCanvas(event) {
    event.preventDefault();
    for (let index = 0;index < event.changedTouches.length; index++) {
      const touch = event.changedTouches[index];
      const coordinate4 = this.getTouchCoordinate(touch);
      this.touchmoveScene(coordinate4);
    }
  }
  touchendCanvas(event) {
    event.preventDefault();
    for (let index = 0;index < event.changedTouches.length; index++) {
      const touch = event.changedTouches[index];
      const coordinate4 = this.getTouchCoordinate(touch);
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
  touchstart = () => {
  };
  touchmove = () => {
  };
  touchend = () => {
  };
  constructor(canvas) {
    this.canvas = canvas;
  }
  async start() {
    await this.canvas.start(() => this.draw(), (touch) => this.touchstart(touch), (touch) => this.touchmove(touch), (touch) => this.touchend(touch));
  }
}

// public/tsc/engine/rect.ts
class Rect extends Position {
  canvas;
  fillStyle;
  strokeStyle;
  lineWidth;
  constructor(initial, size4, canvas, fillStyle = "", strokeStyle = "", lineWidth = 0) {
    super(initial, size4);
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

// public/tsc/engine/collider.ts
class Collider extends Rect {
  constructor(initial, size4, canvas, fillStyle = "", strokeStyle = "", lineWidth = 0) {
    super(initial, size4, canvas, fillStyle, strokeStyle, lineWidth);
  }
  collision(collider) {
    const insideInitial = this.insideCoordinate(collider.initial);
    if (insideInitial === true)
      return true;
    const insideEnd = this.insideCoordinate(collider.end);
    if (insideEnd === true)
      return true;
    return false;
  }
  drawCollider() {
    this.drawRect();
  }
}

// public/tsc/engine/boxes.ts
class Boxes extends Coordinate {
  indices = [];
  canvas;
  boxDefault;
  constructor(x, y, canvas, boxDefault) {
    super(x, y);
    this.canvas = canvas;
    this.boxDefault = boxDefault;
  }
  collision(collider2) {
    const boxes = this.getBoxesOfCoordinate(collider2.initial);
    const boxesEnd = this.getBoxesOfCoordinate(collider2.end);
    for (let yIndex = boxes.y;yIndex < boxesEnd.y; yIndex++) {
      for (let xIndex = boxes.x;xIndex < boxesEnd.x; xIndex++) {
        const boxes2 = new Coordinate(xIndex, yIndex);
        const index = this.boxIndex(boxes2);
        if (index === false)
          continue;
        const boxCollider = this.getColliderOfBoxes(boxes2);
        if (boxCollider.collision(collider2) === false)
          continue;
        return true;
      }
    }
  }
  getBoxesOfCoordinate(coordinate5) {
    const boxX = Math.floor(coordinate5.x / this.boxDefault.size.width);
    const boxY = Math.floor(coordinate5.y / this.boxDefault.size.height);
    return new Coordinate(boxX, boxY);
  }
  getCoordinateOfBoxes(boxes) {
    const distanceBoxX = boxes.x * this.boxDefault.size.width;
    const distanceBoxY = boxes.y * this.boxDefault.size.height;
    return new Coordinate(this.x + distanceBoxX, this.y + distanceBoxY);
  }
  getColliderOfBoxes(boxes) {
    const initial = this.getCoordinateOfBoxes(boxes);
    return new Collider(initial, this.boxDefault.size, this.canvas);
  }
  boxIndex(boxes) {
    if (this.indices[boxes.y] === undefined)
      this.indices[boxes.y] = [];
    const index = this.indices[boxes.y][boxes.x];
    if (index === undefined)
      return false;
    return index;
  }
  setOccupiedBox(boxes, indices, index) {
    const y = boxes.y + indices.y;
    const x = boxes.x + indices.x;
    if (this.indices[y] === undefined)
      this.indices[y] = [];
    this.indices[y][x] = index;
  }
  setBoxIndex(index, boxes) {
    if (this.boxDefault.occupiedBoxes === true) {
      for (let y = 0;y < this.boxDefault.length.vertical; y++) {
        for (let x = 0;x < this.boxDefault.length.horizontal; x++) {
          this.setOccupiedBox(boxes, new Coordinate(x, y), index);
        }
      }
      return;
    }
    this.boxDefault.occupiedBoxes.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === false)
          return;
        this.setOccupiedBox(boxes, new Coordinate(x, y), index);
      });
    });
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
    this.canvas.images.addRoute(this.route);
  }
  image() {
    return this.canvas.images.getImage(this.route);
  }
  drawImage() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;
    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(this.image(), positionOnCanvas.initial.x, positionOnCanvas.initial.y, positionOnCanvas.size.width, positionOnCanvas.size.height);
  }
}

// public/tsc/engine/imageBoxes.ts
class ImageBoxes extends Boxes {
  images = [];
  constructor(x, y, canvas, boxDefault) {
    super(x, y, canvas, boxDefault);
  }
  setImage(boxes2, imageDefault) {
    const index = this.boxIndex(boxes2);
    if (index !== false)
      return false;
    const coordinateOfBoxes = this.getCoordinateOfBoxes(boxes2);
    const newImage = new Image2(new Coordinate(coordinateOfBoxes.x, coordinateOfBoxes.y), new Size(this.boxDefault.size.width * this.boxDefault.length.horizontal, this.boxDefault.size.height * this.boxDefault.length.vertical), this.canvas, imageDefault.route);
    this.images.push(newImage);
    const newIndex = this.images.length - 1;
    this.setBoxIndex(newIndex, boxes2);
    return newIndex;
  }
  drawImages() {
    this.images.forEach((image2) => image2.drawImage());
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

// public/tsc/game/floor/water.ts
class Water extends ImageBoxes {
  imageDefault;
  constructor(map, canvas) {
    super(map.initial.x, map.initial.y, canvas, {
      size: new Size(map.boxes.width, map.boxes.height),
      length: new Plane(1, 1),
      occupiedBoxes: true
    });
    this.imageDefault = new Image2(new Coordinate, new Size, this.canvas, "images/terrain/water/water.png");
  }
  setWater(boxes2) {
    this.setImage(boxes2, this.imageDefault);
  }
  drawWaters() {
    this.drawImages();
  }
}

// public/tsc/engine/elements.ts
class Elements extends Image2 {
  element;
  constructor(initial, size6, canvas, route, element) {
    super(initial, size6, canvas, route);
    this.element = element;
  }
  drawElement() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;
    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(this.image(), this.element.initial.x, this.element.initial.y, this.element.size.width, this.element.size.height, positionOnCanvas.initial.x, positionOnCanvas.initial.y, positionOnCanvas.size.width, positionOnCanvas.size.height);
  }
}

// public/tsc/engine/animations.ts
class Animations extends Elements {
  timerNextFrame = 0;
  animation;
  constructor(initial, size6, canvas, route, element, animation) {
    super(initial, size6, canvas, route, element);
    this.animation = animation;
  }
  nextFrame() {
    this.timerNextFrame += this.canvas.timeBetweenFrames;
    if (this.timerNextFrame < this.animation.intervalBetweenFrame)
      return;
    this.timerNextFrame = 0;
    this.element.nextFrame(this.animation.frames);
  }
  drawAnimation() {
    this.nextFrame();
    this.drawElement();
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

// public/tsc/engine/animationBoxes.ts
class AnimationBoxes extends Boxes {
  animationGroup = [];
  constructor(x, y, canvas, boxDefault) {
    super(x, y, canvas, boxDefault);
  }
  setAnimations(boxes3, animationsDefault) {
    const index = this.boxIndex(boxes3);
    if (index !== false)
      return false;
    const coordinateOfBoxes = this.getCoordinateOfBoxes(boxes3);
    const newAnimations = new Animations(coordinateOfBoxes, new Size(this.boxDefault.size.width * this.boxDefault.length.horizontal, this.boxDefault.size.height * this.boxDefault.length.vertical), this.canvas, animationsDefault.route, new Element(new Size(animationsDefault.element.size.width, animationsDefault.element.size.height), new Plane(0, animationsDefault.element.vertical)), animationsDefault.animation);
    this.animationGroup.push(newAnimations);
    const newIndex = this.animationGroup.length - 1;
    this.setBoxIndex(newIndex, boxes3);
    return newIndex;
  }
  drawAnimations() {
    this.animationGroup.forEach((animations2) => animations2.drawAnimation());
  }
}

// public/tsc/engine/animations/animation.ts
class Animation {
  frames;
  intervalBetweenFrame = 0;
  constructor(frames, framesPerSecond) {
    this.frames = frames;
    this.framesPerSecond = framesPerSecond;
  }
  get framesPerSecond() {
    return 1000 / this.intervalBetweenFrame;
  }
  set framesPerSecond(value) {
    this.intervalBetweenFrame = 1000 / value;
  }
}

// public/tsc/engine/box.ts
class Box {
  size;
  length;
  occupiedBoxes;
  constructor(size7, length, occupiedBoxes) {
    this.size = size7;
    this.length = length;
    this.occupiedBoxes = occupiedBoxes;
  }
}

// public/tsc/game/floor/foams.ts
class Foams extends AnimationBoxes {
  foamDefault;
  constructor(map, canvas) {
    super(map.initial.x, map.initial.y, canvas, new Box(new Size(map.boxes.width, map.boxes.height), new Plane(3, 3), [
      [true, false, false],
      [false, false, false],
      [false, false, false]
    ]));
    this.foamDefault = new Animations(new Coordinate, new Size, this.canvas, "images/terrain/water/foam.png", new Element(new Size(192, 192), new Plane), new Animation(8, 8));
  }
  setFoam(boxes3) {
    const index = this.setAnimations(boxes3, this.foamDefault);
    if (index === false)
      return false;
    const foam = this.animationGroup[index];
    foam.initial.x -= this.boxDefault.size.width;
    foam.initial.y -= this.boxDefault.size.height;
  }
  drawFoams() {
    this.drawAnimations();
  }
}

// public/tsc/engine/elementBoxes.ts
class ElementBoxes extends Boxes {
  groupElements;
  constructor(x, y, canvas, boxDefault) {
    super(x, y, canvas, boxDefault);
    this.groupElements = [];
  }
  setElements(boxes4, elementsDefault) {
    const index = this.boxIndex(boxes4);
    if (index !== false)
      return index;
    const coordinateOfBoxes = this.getCoordinateOfBoxes(boxes4);
    const newElements = new Elements(coordinateOfBoxes, new Size(this.boxDefault.size.width * this.boxDefault.length.horizontal, this.boxDefault.size.height * this.boxDefault.length.vertical), this.canvas, elementsDefault.route, new Element(new Size(elementsDefault.element.size.width, elementsDefault.element.size.height), new Plane(elementsDefault.element.horizontal, elementsDefault.element.vertical)));
    this.groupElements.push(newElements);
    const newIndex = this.groupElements.length - 1;
    this.setBoxIndex(newIndex, boxes4);
    return newIndex;
  }
  drawElements() {
    this.groupElements.forEach((elements3) => elements3.drawElement());
  }
}

// public/tsc/game/floor/grounds.ts
class Grounds extends ElementBoxes {
  groundsDefault;
  constructor(x, y, canvas, map, groundsDefault) {
    super(x, y, canvas, new Box(new Size(map.boxes.width, map.boxes.height), new Plane(1, 1), true));
    this.groundsDefault = groundsDefault;
  }
  setGround(boxes4) {
    this.setElements(boxes4, this.groundsDefault.only);
    this.refreshElements();
  }
  refreshElements() {
    this.groupElements.forEach((elements3) => {
      const boxes4 = this.getBoxesOfCoordinate(elements3.initial);
      const elementsDefault = this.getElementsFactoryOfBoxes(boxes4);
      elements3.element.horizontal = elementsDefault.element.horizontal;
      elements3.element.vertical = elementsDefault.element.vertical;
    });
  }
  getElementsFactoryOfBoxes(boxes4) {
    const leftBoxes = new Coordinate(boxes4.x - 1, boxes4.y);
    const rightBoxes = new Coordinate(boxes4.x + 1, boxes4.y);
    const upBoxes = new Coordinate(boxes4.x, boxes4.y - 1);
    const downBoxes = new Coordinate(boxes4.x, boxes4.y + 1);
    const left = this.boxIndex(leftBoxes) !== false;
    const right = this.boxIndex(rightBoxes) !== false;
    const up = this.boxIndex(upBoxes) !== false;
    const down = this.boxIndex(downBoxes) !== false;
    const isLeftUp = !up && down && !left && right;
    if (isLeftUp)
      return this.groundsDefault.leftUp;
    const isUp = !up && down && left && right;
    if (isUp)
      return this.groundsDefault.up;
    const isRightUp = !up && down && left && !right;
    if (isRightUp)
      return this.groundsDefault.rightUp;
    const isLeft = up && down && !left && right;
    if (isLeft)
      return this.groundsDefault.left;
    const isCenter = up && down && left && right;
    if (isCenter)
      return this.groundsDefault.center;
    const isRight = up && down && left && !right;
    if (isRight)
      return this.groundsDefault.right;
    const isLeftDown = up && !down && !left && right;
    if (isLeftDown)
      return this.groundsDefault.leftDown;
    const isDown = up && !down && left && right;
    if (isDown)
      return this.groundsDefault.down;
    const isRightDown = up && !down && left && !right;
    if (isRightDown)
      return this.groundsDefault.rightDown;
    const isHorizontalLeft = !up && !down && !left && right;
    if (isHorizontalLeft)
      return this.groundsDefault.horizontalLeft;
    const isHorizontalCenter = !up && !down && left && right;
    if (isHorizontalCenter)
      return this.groundsDefault.horizontalCenter;
    const isHorizontalRight = !up && !down && left && !right;
    if (isHorizontalRight)
      return this.groundsDefault.horizontalRight;
    const isVerticalUp = !up && down && !left && !right;
    if (isVerticalUp)
      return this.groundsDefault.verticalUp;
    const isVerticalCenter = up && down && !left && !right;
    if (isVerticalCenter)
      return this.groundsDefault.verticalCenter;
    const isVerticalDown = up && !down && !left && !right;
    if (isVerticalDown)
      return this.groundsDefault.verticalDown;
    return this.groundsDefault.only;
  }
  drawGrounds() {
    this.drawElements();
  }
}

// public/tsc/game/floor/flatsSand.ts
class FlatsSand extends Grounds {
  constructor(map, canvas) {
    const GroundsDefault = (plane7) => new Elements(new Coordinate, new Size, canvas, "images/terrain/ground/flat.png", new Element(new Size(64, 64), plane7));
    super(map.initial.x, map.initial.y, canvas, map, {
      leftUp: GroundsDefault(new Plane(5, 0)),
      up: GroundsDefault(new Plane(6, 0)),
      rightUp: GroundsDefault(new Plane(7, 0)),
      left: GroundsDefault(new Plane(5, 1)),
      center: GroundsDefault(new Plane(6, 1)),
      right: GroundsDefault(new Plane(7, 1)),
      leftDown: GroundsDefault(new Plane(5, 2)),
      down: GroundsDefault(new Plane(6, 2)),
      rightDown: GroundsDefault(new Plane(7, 2)),
      horizontalLeft: GroundsDefault(new Plane(5, 3)),
      horizontalCenter: GroundsDefault(new Plane(6, 3)),
      horizontalRight: GroundsDefault(new Plane(7, 3)),
      verticalUp: GroundsDefault(new Plane(8, 0)),
      verticalCenter: GroundsDefault(new Plane(8, 1)),
      verticalDown: GroundsDefault(new Plane(8, 2)),
      only: GroundsDefault(new Plane(8, 3))
    });
  }
  setFlatSand(boxes4) {
    this.setGround(boxes4);
  }
  drawFlatsSand() {
    this.drawGrounds();
  }
}

// public/tsc/game/floor/elevations.ts
class Elevations extends Grounds {
  constructor(map, canvas) {
    const GroundsDefault = (plane8) => new Elements(new Coordinate, new Size, canvas, "images/terrain/ground/elevation.png", new Element(new Size(64, 64), plane8));
    super(map.initial.x, map.initial.y, canvas, map, {
      leftUp: GroundsDefault(new Plane(0, 0)),
      up: GroundsDefault(new Plane(1, 0)),
      rightUp: GroundsDefault(new Plane(2, 0)),
      left: GroundsDefault(new Plane(0, 1)),
      center: GroundsDefault(new Plane(1, 1)),
      right: GroundsDefault(new Plane(2, 1)),
      leftDown: GroundsDefault(new Plane(0, 2)),
      down: GroundsDefault(new Plane(1, 2)),
      rightDown: GroundsDefault(new Plane(2, 2)),
      horizontalLeft: GroundsDefault(new Plane(0, 4)),
      horizontalCenter: GroundsDefault(new Plane(1, 4)),
      horizontalRight: GroundsDefault(new Plane(2, 4)),
      verticalUp: GroundsDefault(new Plane(3, 0)),
      verticalCenter: GroundsDefault(new Plane(3, 1)),
      verticalDown: GroundsDefault(new Plane(3, 2)),
      only: GroundsDefault(new Plane(3, 4))
    });
  }
  setElevation(boxes4) {
    this.setGround(boxes4);
  }
  drawElevations() {
    this.drawGrounds();
  }
}

// public/tsc/game/floor/flatsGrass.ts
class FlatsGrass extends Grounds {
  constructor(map, canvas) {
    const GroundsDefault = (plane9) => new Elements(new Coordinate, new Size, canvas, "images/terrain/ground/flat.png", new Element(new Size(64, 64), plane9));
    super(map.initial.x, map.initial.y, canvas, map, {
      leftUp: GroundsDefault(new Plane(0, 0)),
      up: GroundsDefault(new Plane(1, 0)),
      rightUp: GroundsDefault(new Plane(2, 0)),
      left: GroundsDefault(new Plane(0, 1)),
      center: GroundsDefault(new Plane(1, 1)),
      right: GroundsDefault(new Plane(2, 1)),
      leftDown: GroundsDefault(new Plane(0, 2)),
      down: GroundsDefault(new Plane(1, 2)),
      rightDown: GroundsDefault(new Plane(2, 2)),
      horizontalLeft: GroundsDefault(new Plane(0, 3)),
      horizontalCenter: GroundsDefault(new Plane(1, 3)),
      horizontalRight: GroundsDefault(new Plane(2, 3)),
      verticalUp: GroundsDefault(new Plane(3, 0)),
      verticalCenter: GroundsDefault(new Plane(3, 1)),
      verticalDown: GroundsDefault(new Plane(3, 2)),
      only: GroundsDefault(new Plane(3, 3))
    });
  }
  setFlatGrass(boxes4) {
    this.setGround(boxes4);
  }
  drawFlatsGrass() {
    this.drawGrounds();
  }
}

// public/tsc/game/floor/shadows.ts
class Shadows extends ImageBoxes {
  imageDefault;
  constructor(map, canvas) {
    super(map.initial.x, map.initial.y, canvas, {
      size: new Size(map.boxes.width, map.boxes.height),
      length: new Plane(3, 3),
      occupiedBoxes: [
        [true, false, false],
        [false, false, false],
        [false, false, false]
      ]
    });
    this.imageDefault = new Image2(new Coordinate, new Size, this.canvas, "images/terrain/ground/shadows.png");
  }
  setShadow(boxes4) {
    const index = this.setImage(boxes4, this.imageDefault);
    if (index === false)
      return false;
    const shadow = this.images[index];
    shadow.initial.x -= this.boxDefault.size.width;
    shadow.initial.y -= this.boxDefault.size.height;
  }
  drawShadows() {
    this.drawImages();
  }
}

// public/tsc/game/floor/wallElevations.ts
class WallElevations extends ElementBoxes {
  wallElevationsDefault;
  constructor(map, canvas) {
    super(map.initial.x, map.initial.y, canvas, new Box(new Size(map.boxes.width, map.boxes.height), new Plane(1, 1), true));
    const WallElevationsDefault = (plane11) => new Elements(new Coordinate, new Size, canvas, "images/terrain/ground/elevation.png", new Element(new Size(64, 64), plane11));
    this.wallElevationsDefault = {
      left: WallElevationsDefault(new Plane(0, 3)),
      center: WallElevationsDefault(new Plane(1, 3)),
      right: WallElevationsDefault(new Plane(2, 3)),
      vertical: WallElevationsDefault(new Plane(3, 3)),
      horizontalLeft: WallElevationsDefault(new Plane(0, 5)),
      horizontalCenter: WallElevationsDefault(new Plane(1, 5)),
      horizontalRight: WallElevationsDefault(new Plane(2, 5)),
      only: WallElevationsDefault(new Plane(3, 5))
    };
  }
  getElementFromBox(boxes4) {
    const leftBoxes = new Coordinate(boxes4.x - 1, boxes4.y);
    const rightBoxes = new Coordinate(boxes4.x + 1, boxes4.y);
    const left = this.boxIndex(leftBoxes) !== false;
    const right = this.boxIndex(rightBoxes) !== false;
    const isLeft = !left && right;
    if (isLeft)
      return this.wallElevationsDefault.left;
    const isCenter = left && right;
    if (isCenter)
      return this.wallElevationsDefault.center;
    const isRight = left && !right;
    if (isRight)
      return this.wallElevationsDefault.right;
    const isVertical = !left && !right;
    if (isVertical)
      return this.wallElevationsDefault.only;
    throw new Error("invalid element");
  }
  refreshElements() {
    this.groupElements.forEach((elements7) => {
      const boxes4 = this.getBoxesOfCoordinate(elements7.initial);
      const elementsDefault = this.getElementFromBox(boxes4);
      elements7.element.horizontal = elementsDefault.element.horizontal;
      elements7.element.vertical = elementsDefault.element.vertical;
    });
  }
  setWallElevations(boxes4) {
    const elementsDefault = this.getElementFromBox(boxes4);
    this.setElements(boxes4, elementsDefault);
    this.refreshElements();
  }
  drawWallElevations() {
    this.drawElements();
  }
}

// public/tsc/game/floor/stairsElevations.ts
class StairsElevations extends ElementBoxes {
  stairsElevationsDefault;
  constructor(map, canvas) {
    super(map.initial.x, map.initial.y, canvas, new Box(new Size(map.boxes.width, map.boxes.height), new Plane(1, 1), true));
    const StairsElevationsDefault = (plane12) => new Elements(new Coordinate, new Size, canvas, "images/terrain/ground/elevation.png", new Element(new Size(64, 64), plane12));
    this.stairsElevationsDefault = {
      left: StairsElevationsDefault(new Plane(0, 7)),
      center: StairsElevationsDefault(new Plane(1, 7)),
      right: StairsElevationsDefault(new Plane(2, 7)),
      only: StairsElevationsDefault(new Plane(3, 7))
    };
  }
  getElementFromBox(boxes4) {
    const leftBoxes = new Coordinate(boxes4.x - 1, boxes4.y);
    const rightBoxes = new Coordinate(boxes4.x + 1, boxes4.y);
    const left = this.boxIndex(leftBoxes) !== false;
    const right = this.boxIndex(rightBoxes) !== false;
    const isLeft = !left && right;
    if (isLeft)
      return this.stairsElevationsDefault.left;
    const isCenter = left && right;
    if (isCenter)
      return this.stairsElevationsDefault.center;
    const isRight = left && !right;
    if (isRight)
      return this.stairsElevationsDefault.right;
    const isOnly = !left && !right;
    if (isOnly)
      return this.stairsElevationsDefault.only;
    throw new Error("invalid element");
  }
  refreshElements() {
    this.groupElements.forEach((elements8) => {
      const boxes4 = this.getBoxesOfCoordinate(elements8.initial);
      const elementsDefault = this.getElementFromBox(boxes4);
      elements8.element.horizontal = elementsDefault.element.horizontal;
      elements8.element.vertical = elementsDefault.element.vertical;
    });
  }
  setStairsElevations(boxes4) {
    const elementsDefault = this.getElementFromBox(boxes4);
    this.setElements(boxes4, elementsDefault);
    this.refreshElements();
  }
  drawStairsElevations() {
    this.drawElements();
  }
}

// public/tsc/game/floor/flatElevations.ts
class FlatElevations extends ElementBoxes {
  flatElevationsDefault;
  constructor(map, canvas) {
    super(map.initial.x, map.initial.y, canvas, new Box(new Size(map.boxes.width, map.boxes.height), new Plane(1, 1), true));
    const FlatElevationsDefault = (plane13) => new Elements(new Coordinate, new Size, canvas, "images/terrain/ground/flat.png", new Element(new Size(64, 64), plane13));
    this.flatElevationsDefault = {
      grass: FlatElevationsDefault(new Plane(4, 0)),
      sand: FlatElevationsDefault(new Plane(9, 0))
    };
  }
  setFlatElevation(boxes4, plane13) {
    const elementsDefault = this.flatElevationsDefault[plane13];
    this.setElements(boxes4, elementsDefault);
  }
  drawFlatElevations() {
    this.drawElements();
  }
}

// public/tsc/game/floor/castles.ts
class Castles extends ImageBoxes {
  castlesDefault;
  constructor(map, canvas) {
    super(map.initial.x, map.initial.y, canvas, new Box(new Size(map.boxes.width, map.boxes.height), new Plane(4, 3), true));
    const CastlesDefault = (state, color = "blue") => {
      let file = state;
      if (state === "ready")
        file = color;
      return new Image2(new Coordinate, new Size, this.canvas, `images/factions/knights/buildings/castle/${file}.png`);
    };
    this.castlesDefault = {
      ready: {
        blue: CastlesDefault("ready", "blue"),
        purple: CastlesDefault("ready", "purple"),
        red: CastlesDefault("ready", "red"),
        yellow: CastlesDefault("ready", "yellow")
      },
      construction: CastlesDefault("construction"),
      destroyed: CastlesDefault("destroyed")
    };
  }
  setCastle(boxes4, state, color) {
    let imageDefault = this.castlesDefault.ready[color];
    if (state !== "ready") {
      imageDefault = this.castlesDefault[state];
    }
    return this.setImage(boxes4, imageDefault);
  }
  drawCastles() {
    this.drawImages();
  }
}

// public/tsc/game/floor/trees.ts
class Trees extends AnimationBoxes {
  treesDefault;
  constructor(map, canvas) {
    super(map.initial.x, map.initial.y, canvas, new Box(new Size(map.boxes.width, map.boxes.height), new Plane(3, 3), [
      [true, false, false],
      [true, false, false],
      [false, false, false]
    ]));
    const TreesDefault = (plane15, animation3) => new Animations(new Coordinate, new Size, canvas, "images/resources/tree.png", new Element(new Size(192, 192), plane15), animation3);
    this.treesDefault = {
      motion: TreesDefault(new Plane, new Animation(4, 4)),
      attacked: TreesDefault(new Plane(0, 1), new Animation(2, 2)),
      felled: TreesDefault(new Plane(0, 2), new Animation(1, 1))
    };
  }
  setTrees(boxes4, animation3) {
    const animations4 = this.treesDefault[animation3];
    this.setAnimations(boxes4, animations4);
  }
  drawTrees() {
    this.drawAnimations();
  }
}

// public/tsc/game/floor.ts
class Floor {
  canvas;
  map;
  water;
  foams;
  flatsSand;
  elevations;
  flatsGrass;
  shadows;
  wallElevations;
  stairsElevation;
  flatElevations;
  castles;
  trees;
  constructor(canvas, map) {
    this.canvas = canvas;
    this.map = map;
    this.water = new Water(this.map, this.canvas);
    this.foams = new Foams(this.map, this.canvas);
    this.flatsSand = new FlatsSand(this.map, this.canvas);
    this.elevations = new Elevations(this.map, this.canvas);
    this.flatsGrass = new FlatsGrass(this.map, this.canvas);
    this.shadows = new Shadows(this.map, this.canvas);
    this.wallElevations = new WallElevations(this.map, this.canvas);
    this.stairsElevation = new StairsElevations(this.map, this.canvas);
    this.flatElevations = new FlatElevations(this.map, this.canvas);
    this.castles = new Castles(this.map, this.canvas);
    this.trees = new Trees(this.map, this.canvas);
  }
  insideFloor(collider2) {
    const flatSandInside = this.flatsSand.collision(collider2);
    const elevationInside = this.elevations.collision(collider2);
    const stairElevationInside = this.stairsElevation.collision(collider2);
    return flatSandInside === true || elevationInside === true || stairElevationInside === true;
  }
  collision(collider2, nextCollider) {
    const flatSandInside = this.flatsSand.collision(collider2);
    const elevationInside = this.elevations.collision(collider2);
    const wallElevationInside = this.wallElevations.collision(collider2);
    const stairElevationInside = this.stairsElevation.collision(collider2);
    const nextFlatSandInside = this.flatsSand.collision(nextCollider);
    const nextElevationInside = this.elevations.collision(nextCollider);
    const nextWallElevationInside = this.wallElevations.collision(nextCollider);
    const nextStairElevationInside = this.stairsElevation.collision(nextCollider);
    if (flatSandInside === true) {
      if (nextFlatSandInside === true)
        return false;
      if (nextElevationInside === true)
        return true;
      if (nextWallElevationInside === true)
        return true;
      if (nextStairElevationInside === true)
        return false;
      return true;
    }
    if (elevationInside === true) {
      if (nextFlatSandInside === true)
        return true;
      if (nextElevationInside === true)
        return false;
      if (nextWallElevationInside === true)
        return true;
      if (nextStairElevationInside === true)
        return false;
      return true;
    }
    if (wallElevationInside === true)
      throw new Error("inside wall elevation");
    if (stairElevationInside === true) {
      if (nextFlatSandInside === true)
        return false;
      if (nextElevationInside === true)
        return false;
      if (nextWallElevationInside === true)
        return true;
      if (nextStairElevationInside === true)
        return false;
      return true;
    }
    throw new Error("no exits collision");
  }
  setFloor(floor) {
    floor.forEach((row, y) => {
      row.forEach((box8, x) => {
        const boxes4 = new Coordinate(x, y);
        if (box8.water === true)
          this.water.setWater(boxes4);
        if (box8.foam !== false) {
          this.foams.setFoam(boxes4);
          if (box8.foam.flatSand === true)
            this.flatsSand.setFlatSand(boxes4);
        }
        if (box8.elevation !== false) {
          if (box8.elevation.shadow === true)
            this.shadows.setShadow(boxes4);
          if (box8.elevation.flatGrass === true)
            this.flatsGrass.setFlatGrass(boxes4);
          this.elevations.setElevation(boxes4);
        }
        if (box8.wallElevation !== false) {
          if (box8.wallElevation.shadow === true)
            this.shadows.setShadow(boxes4);
          this.wallElevations.setWallElevations(boxes4);
          if (box8.wallElevation.flatElevation !== false)
            this.flatElevations.setFlatElevation(boxes4, box8.wallElevation.flatElevation);
        }
        if (box8.stairElevation !== false) {
          if (box8.stairElevation.shadow === true)
            this.shadows.setShadow(boxes4);
          this.stairsElevation.setStairsElevations(boxes4);
          if (box8.stairElevation.flatElevation !== false)
            this.flatElevations.setFlatElevation(boxes4, box8.stairElevation.flatElevation);
        }
        if (box8.castle !== false) {
          this.castles.setCastle(boxes4, box8.castle.state, box8.castle.color);
        }
        if (box8.trees !== false) {
          this.trees.setTrees(boxes4, box8.trees.animation);
        }
      });
    });
  }
  drawFloor() {
    this.water.drawWaters();
    this.foams.drawFoams();
    this.flatsSand.drawFlatsSand();
    this.shadows.drawShadows();
    this.stairsElevation.drawStairsElevations();
    this.elevations.drawElevations();
    this.flatsGrass.drawFlatsGrass();
    this.wallElevations.drawWallElevations();
    this.flatElevations.drawFlatElevations();
    this.castles.drawCastles();
    this.trees.drawTrees();
  }
}

// public/tsc/game/mapMatrix.ts
var BoxFalse = () => ({
  water: false,
  foam: false,
  elevation: false,
  wallElevation: false,
  stairElevation: false,
  castle: false,
  trees: false
});
var BoxFloor1 = (x, y) => {
  const box8 = BoxFalse();
  if (x >= 6 && x <= 14 && y >= 1 && y <= 6) {
    box8.elevation = {
      shadow: y >= 3,
      flatGrass: true
    };
  }
  if (x >= 6 && x <= 10 && y === 7) {
    box8.elevation = {
      shadow: true,
      flatGrass: true
    };
  }
  if (x >= 14 && x <= 14 && y === 7) {
    box8.elevation = {
      shadow: true,
      flatGrass: true
    };
  }
  if (y === 7 && x >= 11 && x <= 13)
    box8.stairElevation = {
      shadow: true,
      flatElevation: x === 9 ? "grass" : false
    };
  if (y === 8 && x >= 6 && x <= 10) {
    const flatElevationRandom = Math.round(Math.random());
    box8.wallElevation = {
      shadow: true,
      flatElevation: flatElevationRandom === 0 ? "grass" : false
    };
  }
  if (y === 8 && x === 14) {
    const flatElevationRandom = Math.round(Math.random());
    box8.wallElevation = {
      shadow: true,
      flatElevation: flatElevationRandom === 0 ? "grass" : false
    };
  }
  if (y === 3 && x === 14) {
    box8.trees = {
      animation: "felled"
    };
  }
  return box8;
};
var BoxFloor0 = (x, y) => {
  const box8 = BoxFalse();
  box8.water = true;
  if (y >= 3 && y <= 19 && x >= 1 && x <= 19)
    box8.foam = {
      flatSand: true
    };
  if (x >= 2 && x <= 17 && y >= 2 && y <= 13)
    box8.elevation = {
      shadow: y >= 3,
      flatGrass: true
    };
  if (x >= 2 && x <= 10 && y === 14)
    box8.elevation = {
      shadow: true,
      flatGrass: true
    };
  if (x >= 14 && x <= 17 && y === 14)
    box8.elevation = {
      shadow: true,
      flatGrass: true
    };
  if (y === 14 && x >= 11 && x <= 13)
    box8.stairElevation = {
      shadow: true,
      flatElevation: x === 11 ? "sand" : false
    };
  else if (y === 15 && x >= 9 && x <= 11)
    box8.foam = {
      flatSand: true
    };
  if (y === 15 && x >= 2 && x <= 10) {
    const flatElevationRandom = Math.round(Math.random());
    box8.wallElevation = {
      shadow: true,
      flatElevation: flatElevationRandom === 0 ? "sand" : false
    };
  }
  if (y === 15 && x >= 14 && x <= 17) {
    const flatElevationRandom = Math.round(Math.random());
    box8.wallElevation = {
      shadow: true,
      flatElevation: flatElevationRandom === 0 ? "sand" : false
    };
  }
  return box8;
};
var FloorLength = new Plane(21, 21);
var MapMatrix = () => {
  const floor0 = [];
  const floor1 = [];
  for (let y = 0;y < FloorLength.vertical; y++) {
    floor0[y] = [];
    floor1[y] = [];
    for (let x = 0;x < FloorLength.horizontal; x++) {
      floor0[y][x] = BoxFloor0(x, y);
      floor1[y][x] = BoxFloor1(x, y);
    }
  }
  return [
    floor0,
    floor1
  ];
};

// public/tsc/game/map.ts
class Map extends Position {
  matrix = MapMatrix();
  boxes;
  floors;
  constructor(canvas) {
    super(new Coordinate, new Size(100, 100));
    this.boxes = new Size(this.size.width / FloorLength.horizontal, this.size.height / FloorLength.vertical);
    this.floors = [
      new Floor(canvas, this),
      new Floor(canvas, this)
    ];
    this.floors.forEach((floor2, index) => {
      floor2.setFloor(this.matrix[index]);
    });
  }
  collision(collider2, nextCollider) {
    for (let index = this.floors.length - 1;index >= 0; index--) {
      const floor2 = this.floors[index];
      if (floor2.insideFloor(collider2) === false)
        continue;
      console.log("inside floor");
      if (floor2.collision(collider2, nextCollider) === true)
        return true;
    }
    return false;
    throw new Error("no floor");
  }
  drawMap() {
    this.floors.forEach((floor2) => floor2.drawFloor());
  }
}

// public/tsc/engine/character.ts
class Character extends Animations {
  speed;
  address;
  collider;
  constructor(initial, size21, canvas, route, element11, animation3, speed, collider3) {
    super(initial, size21, canvas, route, element11, animation3);
    this.speed = speed;
    this.address = new Coordinate;
    this.collider = collider3;
  }
  nextCollider() {
    if (this.address.equals(new Coordinate))
      return false;
    const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
    const speedX = this.speed.x * secondsBetweenFrames;
    const speedY = this.speed.y * secondsBetweenFrames;
    const distanceX = speedX * this.address.x;
    const distanceY = speedY * this.address.y;
    const newX = this.initial.x + distanceX;
    const newY = this.initial.y + distanceY;
    return new Collider(new Coordinate(newX, newY), new Size(this.collider.size.width, this.collider.size.height), this.canvas);
  }
  drawCharacter() {
    this.drawAnimation();
  }
}

// public/tsc/engine/text.ts
class Text extends Position {
  canvas;
  value;
  fillStyle;
  strokeStyle;
  dungeonFont;
  constructor(initial, size21, canvas, value = "", fillStyle = "", strokeStyle = "", dungeonFont = false) {
    super(initial, size21);
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
  constructor(size22, canvas, photoRoute, nickname) {
    super(new Coordinate, size22, canvas, "#416177", "#fff", 0.5);
    this.photo = new Image2(new Coordinate, new Size(this.size.width * 0.3, this.size.height), this.canvas, photoRoute);
    this.name = new Text(new Coordinate, new Size(this.size.width * 0.7, 9), this.canvas, nickname, "#fff");
  }
  drawUserBar(initial) {
    this.initial.x = initial.x;
    this.initial.y = initial.y - this.size.height;
    this.photo.initial.x = this.initial.x;
    this.photo.initial.y = this.initial.y;
    this.name.initial.x = this.initial.x + this.photo.size.width;
    this.name.initial.y = this.initial.y;
    this.drawRect();
    this.photo.drawImage();
    this.name.drawText();
  }
}

// public/tsc/game/pawn.ts
class Pawn extends Character {
  map;
  nickname;
  userBar;
  constructor(initial, map, canvas, color, nickname, userBar2) {
    super(initial, new Size(map.boxes.width * 3, map.boxes.height * 3), canvas, `images/factions/knights/troops/pawn/${color}.png`, new Element(new Size(192, 192), new Plane(6, 6)), new Animation(6, 6), new Coordinate(2, 2), new Collider(new Coordinate, new Size(64, 64), canvas));
    this.map = map;
    this.nickname = nickname;
    this.userBar = new UserBar(new Size(map.boxes.width, map.boxes.height / 2), canvas, userBar2.photoRoute, this.nickname);
  }
  drawPawn() {
    this.drawCharacter();
    this.userBar.drawUserBar(new Coordinate(this.initial.x + this.map.boxes.width, this.initial.y + this.map.boxes.height));
  }
}

// public/tsc/game/sheep.ts
class Sheep extends Character {
  state = "move";
  sheepDefault;
  jumpTimer = 0;
  map;
  constructor(initial, map, canvas) {
    const SheepDefault = (plane18, animation5) => {
      return new Character(new Coordinate, new Size, canvas, "images/resources/sheep.png", new Element(new Size(128, 128), plane18), animation5, new Coordinate(2, 2), new Collider(new Coordinate, new Size(64, 64), canvas));
    };
    super(initial, new Size(map.boxes.width * 3, map.boxes.height * 3), canvas, "images/resources/sheep.png", new Element(new Size(128, 128), new Plane), new Animation(8, 8), new Coordinate(2, 2), new Collider(new Coordinate, new Size(64, 64), canvas));
    this.map = map;
    this.sheepDefault = {
      move: SheepDefault(new Plane, new Animation(8, 8)),
      jump: SheepDefault(new Plane(0, 1), new Animation(6, 6))
    };
    this.state = "move";
    this.address.x = -1;
  }
  moveSheep() {
    const nextCollider = this.nextCollider();
    if (nextCollider === false)
      return false;
    const collision = this.map.collision(this.collider, nextCollider);
    if (collision === true)
      return false;
    this.initial.x = nextCollider.initial.x;
    this.initial.y = nextCollider.initial.y;
    return true;
  }
  jumpSheep() {
    if (this.state !== "jump")
      return;
    const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
    this.jumpTimer += secondsBetweenFrames;
    const seconds = this.animation.frames / this.animation.framesPerSecond;
    if (this.jumpTimer >= seconds) {
      this.state = "move";
      this.jumpTimer = 0;
      return;
    }
  }
  refreshState() {
    let stateDefault = this.sheepDefault[this.state];
    if (this.element.vertical === stateDefault.element.vertical)
      return;
    this.element.vertical = stateDefault.element.vertical;
    this.element.horizontal = stateDefault.element.horizontal;
    this.animation.frames = stateDefault.animation.frames;
    this.animation.framesPerSecond = stateDefault.animation.framesPerSecond;
  }
  drawSheep() {
    this.refreshState();
    this.moveSheep();
    this.jumpSheep();
    this.drawCharacter();
  }
}

// public/tsc/game/game.ts
class Game extends Scene {
  map;
  pawns = [];
  sheepGroup = [];
  constructor(canvas) {
    super(canvas);
    this.map = new Map(this.canvas);
    this.sheepGroup = [
      new Sheep(new Coordinate(10, 10), this.map, this.canvas)
    ];
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
    console.log(chat);
  }
  draw() {
    this.map.drawMap();
    this.pawns.forEach((pawn2) => pawn2.drawPawn());
    this.sheepGroup.forEach((sheep2) => sheep2.drawSheep());
  }
}

// public/tsc/index.ts
window.addEventListener("load", () => {
  const canvas2 = new Canvas(new Coordinate, 24);
  const game2 = new Game(canvas2);
  game2.start();
});
