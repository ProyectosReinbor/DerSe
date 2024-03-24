// public/tsc/engine/coordinate.ts
class Coordinate {
  x;
  y;
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
  }
  equals(coordinate) {
    return this.x === coordinate.x && this.y === coordinate.y;
  }
}

// public/tsc/engine/size.ts
class Size {
  width;
  height;
  constructor(props) {
    this.width = props.width;
    this.height = props.height;
  }
  get aPercent() {
    return new Size({
      width: this.width / 100,
      height: this.height / 100
    });
  }
  percentage(percentage) {
    return new Size({
      width: this.aPercent.width * percentage.width,
      height: this.aPercent.height * percentage.height
    });
  }
}

// public/tsc/engine/position.ts
class Position {
  initial;
  size;
  constructor(props) {
    this.initial = props.initial;
    this.size = props.size;
  }
  get end() {
    return new Coordinate({
      x: this.initial.x + this.size.width,
      y: this.initial.y + this.size.height
    });
  }
  endPercentage(percentage) {
    const size2 = this.size.percentage(percentage);
    return new Coordinate({
      x: this.initial.x + size2.width,
      y: this.initial.y + size2.height
    });
  }
  insideCoordinate(initial) {
    return this.inside(new Position({
      initial,
      size: new Size({
        width: 0,
        height: 0
      })
    }));
  }
  inside(position) {
    return this.initial.x <= position.initial.x && this.initial.y <= position.initial.y && this.end.x >= position.end.x && this.end.y >= position.end.y;
  }
  collision(position) {
    const coordinateLeftUp = new Coordinate({
      x: position.initial.x,
      y: position.initial.y
    });
    const coordinateRightUp = new Coordinate({
      x: position.end.x,
      y: position.initial.y
    });
    const coordinateLeftDown = new Coordinate({
      x: position.initial.x,
      y: position.end.y
    });
    const coordinateRightDown = new Coordinate({
      x: position.end.x,
      y: position.end.y
    });
    if (this.insideCoordinate(coordinateLeftUp) === true)
      return true;
    if (this.insideCoordinate(coordinateRightUp) === true)
      return true;
    if (this.insideCoordinate(coordinateLeftDown) === true)
      return true;
    if (this.insideCoordinate(coordinateRightDown) === true)
      return true;
    return false;
  }
}

// public/tsc/engine/camera.ts
class Camera extends Position {
  constructor(props) {
    super({
      initial: props.initial,
      size: new Size({ width: 100, height: 100 })
    });
  }
  insideCamera(position2) {
    const vision = new Position({
      initial: new Coordinate({
        x: this.initial.x - position2.size.width,
        y: this.initial.y - position2.size.height
      }),
      size: new Size({
        width: this.size.width + position2.size.width * 2,
        height: this.size.height + position2.size.height * 2
      })
    });
    return vision.inside(position2);
  }
  positionOnCamera(position2) {
    const appearsInCamera = this.insideCamera(position2);
    if (appearsInCamera === false)
      return false;
    return new Position({
      initial: new Coordinate({
        x: position2.initial.x - this.initial.x,
        y: position2.initial.y - this.initial.y
      }),
      size: new Size({
        width: position2.size.width,
        height: position2.size.height
      })
    });
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
    if (route === false)
      return false;
    if (this.notFound.includes(route))
      throw new Error(`image ${route} is not found`);
    return this.images[route];
  }
  getImage(route) {
    const image = this.imageExists(route);
    if (image === undefined)
      throw new Error(`image ${route} is not found`);
    return image;
  }
  addRoute(route) {
    if (route === false)
      return;
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
    return new Promise((resolve) => {
      if (route === false)
        return resolve(false);
      const imageExists = this.imageExists(route);
      if (imageExists !== undefined)
        return resolve(imageExists);
      const image = new Image;
      image.addEventListener("load", () => {
        this.images[route] = image;
        resolve(image);
      });
      image.addEventListener("error", () => this.notFound.push(route));
      image.src = route;
    });
  }
}

// public/tsc/engine/canvas.ts
class Canvas extends Camera {
  onePercentage = new Size({ width: 0, height: 0 });
  margin = new Size({ width: 0, height: 0 });
  images = new Images;
  intervalBetweenFrame = 0;
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
  constructor(props) {
    super(props);
    this.framesPerSecond = props.framesPerSecond;
    this.element = window.document.getElementById("canvas");
    this.context = this.element.getContext("2d");
    this.aspectRatio();
    window.addEventListener("resize", () => this.aspectRatio());
    this.element.addEventListener("touchstart", (event) => this.touchstartCanvas(event));
    this.element.addEventListener("touchmove", (event) => this.touchmoveCanvas(event));
    this.element.addEventListener("touchend", (event) => this.touchendCanvas(event));
    this.nextFrame();
  }
  get framesPerSecond() {
    return 1000 / this.intervalBetweenFrame;
  }
  set framesPerSecond(value) {
    this.intervalBetweenFrame = 1000 / value;
  }
  nextFrame(time = 0) {
    const difference = time - this.time;
    if (difference < this.intervalBetweenFrame) {
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
    const screen = new Size({
      width: window.innerWidth,
      height: window.innerHeight
    });
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
    if (touch === null)
      return false;
    const left = this.margin.width / 2;
    const top = this.margin.height / 2;
    return new Coordinate({
      x: touch.pageX - left,
      y: touch.pageY - top
    });
  }
  touchstartCanvas(event) {
    event.preventDefault();
    for (let index = 0;index < event.changedTouches.length; index++) {
      const touch = event.changedTouches.item(index);
      const coordinate4 = this.getTouchCoordinate(touch);
      if (coordinate4 === false)
        continue;
      this.touchstartScene(coordinate4);
    }
  }
  touchmoveCanvas(event) {
    event.preventDefault();
    for (let index = 0;index < event.changedTouches.length; index++) {
      const touch = event.changedTouches.item(index);
      const coordinate4 = this.getTouchCoordinate(touch);
      if (coordinate4 === false)
        continue;
      this.touchmoveScene(coordinate4);
    }
  }
  touchendCanvas(event) {
    event.preventDefault();
    for (let index = 0;index < event.changedTouches.length; index++) {
      const touch = event.changedTouches.item(index);
      const coordinate4 = this.getTouchCoordinate(touch);
      if (coordinate4 === false)
        continue;
      this.touchendScene(coordinate4);
    }
  }
  positionOnCanvas(position3) {
    const positionOnCamera = this.positionOnCamera(position3);
    if (positionOnCamera === false)
      return false;
    return new Position({
      initial: new Coordinate({
        x: this.getWidthPixels(positionOnCamera.initial.x),
        y: this.getHeightPixels(positionOnCamera.initial.y)
      }),
      size: new Size({
        width: this.getWidthPixels(positionOnCamera.size.width),
        height: this.getHeightPixels(positionOnCamera.size.height)
      })
    });
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
  draw = () => {
  };
  touchstart = () => {
  };
  touchmove = () => {
  };
  touchend = () => {
  };
  constructor(props) {
    this.canvas = props.canvas;
  }
  async start() {
    await this.canvas.start(() => this.draw(), (touch) => this.touchstart(touch), (touch) => this.touchmove(touch), (touch) => this.touchend(touch));
  }
}

// public/tsc/engine/plane.ts
class Plane {
  horizontal;
  vertical;
  constructor(props) {
    this.horizontal = props.horizontal;
    this.vertical = props.vertical;
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
var GetBoxFloors = [
  (indicesBox) => {
    const box = BoxFalse();
    box.water = true;
    if (indicesBox.y >= 3 && indicesBox.y <= 19 && indicesBox.x >= 1 && indicesBox.x <= 19)
      box.foam = {
        flatSand: true
      };
    if (indicesBox.y === 14 && indicesBox.x >= 11 && indicesBox.x <= 13)
      box.stairElevation = {
        shadow: true,
        flatElevation: indicesBox.x === 11 ? "sand" : false
      };
    return box;
  },
  (indicesBox) => {
    const box = BoxFalse();
    if (indicesBox.x >= 2 && indicesBox.x <= 17 && indicesBox.y >= 2 && indicesBox.y <= 13)
      box.elevation = {
        floor: 1,
        shadow: indicesBox.y >= 3,
        flatGrass: true
      };
    if (indicesBox.x >= 2 && indicesBox.x <= 10 && indicesBox.y === 14)
      box.elevation = {
        floor: 1,
        shadow: true,
        flatGrass: true
      };
    if (indicesBox.x >= 14 && indicesBox.x <= 17 && indicesBox.y === 14)
      box.elevation = {
        floor: 1,
        shadow: true,
        flatGrass: true
      };
    if (indicesBox.y === 15 && indicesBox.x >= 2 && indicesBox.x <= 10) {
      const flatElevationRandom = Math.round(Math.random());
      box.wallElevation = {
        shadow: true,
        flatElevation: flatElevationRandom === 0 ? "sand" : false
      };
    }
    if (indicesBox.y === 15 && indicesBox.x >= 14 && indicesBox.x <= 17) {
      const flatElevationRandom = Math.round(Math.random());
      box.wallElevation = {
        shadow: true,
        flatElevation: flatElevationRandom === 0 ? "sand" : false
      };
    }
    if (indicesBox.y === 7 && indicesBox.x >= 11 && indicesBox.x <= 13) {
      box.stairElevation = {
        shadow: true,
        flatElevation: indicesBox.x === 9 ? "grass" : false
      };
    }
    if (indicesBox.y === 3 && indicesBox.x === 14) {
      box.trees = {
        animation: "felled"
      };
    }
    return box;
  },
  (indicesBox) => {
    const box = BoxFalse();
    if (indicesBox.x >= 6 && indicesBox.x <= 14 && indicesBox.y >= 1 && indicesBox.y <= 6) {
      box.elevation = {
        floor: 2,
        shadow: indicesBox.y >= 3,
        flatGrass: true
      };
    }
    if (indicesBox.x >= 6 && indicesBox.x <= 10 && indicesBox.y === 7) {
      box.elevation = {
        floor: 2,
        shadow: true,
        flatGrass: true
      };
    }
    if (indicesBox.x >= 14 && indicesBox.x <= 14 && indicesBox.y === 7) {
      box.elevation = {
        floor: 2,
        shadow: true,
        flatGrass: true
      };
    }
    if (indicesBox.y === 8 && indicesBox.x >= 6 && indicesBox.x <= 10) {
      const flatElevationRandom = Math.round(Math.random());
      box.wallElevation = {
        shadow: true,
        flatElevation: flatElevationRandom === 0 ? "grass" : false
      };
    }
    if (indicesBox.y === 8 && indicesBox.x === 14) {
      const flatElevationRandom = Math.round(Math.random());
      box.wallElevation = {
        shadow: true,
        flatElevation: flatElevationRandom === 0 ? "grass" : false
      };
    }
    return box;
  }
];
var MapLength = new Plane({ horizontal: 21, vertical: 21 });
var GetMapMatrix = () => {
  const map = [];
  for (let floor = 0;floor < GetBoxFloors.length; floor++) {
    map[floor] = [];
    const floorMatrix = map[floor];
    if (floorMatrix === undefined)
      continue;
    const indicesBox = new Coordinate({ x: 0, y: 0 });
    for (indicesBox.y = 0;indicesBox.y < MapLength.vertical; indicesBox.y++) {
      floorMatrix[indicesBox.y] = [];
      const row = floorMatrix[indicesBox.y];
      if (row === undefined)
        continue;
      for (indicesBox.x = 0;indicesBox.x < MapLength.horizontal; indicesBox.x++) {
        const getBoxFloor = GetBoxFloors[floor];
        if (getBoxFloor === undefined)
          continue;
        row[indicesBox.x] = getBoxFloor(indicesBox);
      }
    }
  }
  return map;
};

// public/tsc/engine/box.ts
class Box extends Position {
  referenceIndex;
  constructor(props) {
    super(props);
    this.referenceIndex = props.referenceIndex;
  }
}

// public/tsc/engine/boxes.ts
class Boxes extends Coordinate {
  boxes = [];
  references = [];
  canvas;
  size;
  length;
  occupied;
  constructor(props) {
    super(props);
    this.canvas = props.canvas;
    this.size = props.size;
    this.length = props.length;
    this.occupied = props.occupied;
  }
  collision(character) {
    const size5 = new Size({
      width: this.size.width * character.address.x,
      height: this.size.height * character.address.y
    });
    const initial = new Coordinate({
      x: character.initial.x + size5.width,
      y: character.initial.y + size5.height
    });
    const end = new Coordinate({
      x: character.end.x + size5.width,
      y: character.end.y + size5.height
    });
    const indicesBoxInitial = this.indicesBox(initial);
    const indicesBoxEnd = this.indicesBox(end);
    const indicesBox = new Coordinate({ x: 0, y: 0 });
    for (indicesBox.y = indicesBoxInitial.y;indicesBox.y <= indicesBoxEnd.y; indicesBox.y++) {
      for (indicesBox.x = indicesBoxInitial.x;indicesBox.x <= indicesBoxEnd.x; indicesBox.x++) {
        const box2 = this.getBox(indicesBox);
        if (box2 === undefined)
          continue;
        if (box2.collision(character) === false)
          continue;
        return box2;
      }
    }
    return false;
  }
  getPosition(indicesBox) {
    return new Position({
      initial: new Coordinate({
        x: indicesBox.x * this.size.width,
        y: indicesBox.y * this.size.height
      }),
      size: new Size({
        width: this.size.width * this.length.horizontal,
        height: this.size.height * this.length.vertical
      })
    });
  }
  getBox(indicesBox) {
    const boxesRow = this.boxes[indicesBox.y];
    if (boxesRow === undefined)
      return;
    const box2 = boxesRow[indicesBox.x];
    return box2;
  }
  indicesBox(coordinate6) {
    const boxX = Math.floor(coordinate6.x / this.size.width);
    const boxY = Math.floor(coordinate6.y / this.size.height);
    return new Coordinate({ x: boxX, y: boxY });
  }
  boxesIndices(indicesBox, box2) {
    let row = this.boxes[indicesBox.y];
    if (row === undefined)
      row = [];
    row[indicesBox.x] = box2;
    this.boxes[indicesBox.y] = row;
  }
  setBox(indicesBox, referenceIndex) {
    const size5 = new Size({
      width: this.size.width,
      height: this.size.height
    });
    const distanceX = indicesBox.x * size5.width;
    const distanceY = indicesBox.y * size5.height;
    const box2 = new Box({
      initial: new Coordinate({
        x: this.x + distanceX,
        y: this.y + distanceY
      }),
      size: size5,
      referenceIndex
    });
    this.boxesIndices(indicesBox, box2);
  }
  occupiedBoxes(indicesBoxInitial, indicesOccupied, referenceIndex) {
    const indicesBox = new Coordinate({
      x: indicesBoxInitial.x + indicesOccupied.y,
      y: indicesBoxInitial.y + indicesOccupied.x
    });
    let boxesRow = this.boxes[indicesBox.y];
    if (boxesRow === undefined)
      boxesRow = [];
    let box2 = this.getBox(indicesBox);
    if (box2 !== undefined)
      return;
    this.setBox(indicesBox, referenceIndex);
  }
  referencePush(indicesBox) {
    const position5 = this.getPosition(indicesBox);
    const referenceIndex = this.referencesPush(indicesBox, position5);
    if (referenceIndex === undefined)
      return;
    return this.references[referenceIndex];
  }
  referencesPush(indicesBoxInitial, reference) {
    const box2 = this.getBox(indicesBoxInitial);
    if (box2 !== undefined)
      return;
    const referenceIndex = this.references.push(reference) - 1;
    if (this.occupied === true) {
      for (let y = 0;y < this.length.vertical; y++) {
        for (let x = 0;x < this.length.horizontal; x++) {
          this.occupiedBoxes(indicesBoxInitial, new Coordinate({ x, y }), referenceIndex);
        }
      }
    } else {
      this.occupied.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value === false)
            return;
          this.occupiedBoxes(indicesBoxInitial, new Coordinate({ x, y }), referenceIndex);
        });
      });
    }
    return referenceIndex;
  }
}

// public/tsc/engine/image.ts
class Image2 extends Position {
  canvas;
  route;
  constructor(props) {
    super(props);
    this.canvas = props.canvas;
    this.route = props.route;
    this.canvas.images.addRoute(this.route);
  }
  set image(route) {
    this.route = route;
  }
  get image() {
    return this.canvas.images.getImage(this.route);
  }
  drawImage() {
    const image = this.image;
    if (image === false)
      return;
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;
    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(image, positionOnCanvas.initial.x, positionOnCanvas.initial.y, positionOnCanvas.size.width, positionOnCanvas.size.height);
  }
}

// public/tsc/engine/imageBoxes.ts
class ImageBoxes extends Boxes {
  references = [];
  route;
  constructor(props) {
    super(props);
    this.route = props.route;
  }
  referencePush(indicesBox) {
    const position6 = this.getPosition(indicesBox);
    const newReference = new Image2({
      initial: position6.initial,
      size: position6.size,
      canvas: this.canvas,
      route: this.route
    });
    const indexReference = this.referencesPush(indicesBox, newReference);
    if (indexReference === undefined)
      return;
    return this.references[indexReference];
  }
  drawImages() {
    this.references.forEach((image2) => image2.drawImage());
  }
}

// public/tsc/game/map/castle.ts
class Castle extends Image2 {
  state = "construction";
  color = "blue";
  constructor(props) {
    super({
      initial: props.initial,
      size: props.size,
      canvas: props.canvas,
      route: false
    });
    this.imageCastle(props.state, props.color);
  }
  imageCastle(newState, newColor) {
    this.state = newState;
    this.color = newColor;
    let file = this.state;
    if (this.state === "ready")
      file = this.color;
    this.image = `images/factions/knights/buildings/castle/${file}.png`;
  }
}

// public/tsc/game/map/castles.ts
class Castles extends ImageBoxes {
  references = [];
  constructor(props) {
    super({
      x: props.map.initial.x,
      y: props.map.initial.y,
      canvas: props.canvas,
      size: new Size({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane({ horizontal: 4, vertical: 3 }),
      occupied: true,
      route: false
    });
  }
  referencePush() {
    return;
  }
  castlePush(indicesBox, state, color) {
    const position6 = this.getPosition(indicesBox);
    const newReference = new Castle({
      initial: position6.initial,
      size: position6.size,
      canvas: this.canvas,
      state,
      color
    });
    const indexReference = this.referencesPush(indicesBox, newReference);
    if (indexReference === undefined)
      return;
    return this.references[indexReference];
  }
  drawCastles() {
    this.drawImages();
  }
}

// public/tsc/engine/element.ts
class Element extends Position {
  constructor(props) {
    super({
      initial: new Coordinate({ x: 0, y: 0 }),
      size: props.size
    });
    this.setIndices(props.indices);
  }
  setIndices(newIndices) {
    this.initial.x = this.size.width * newIndices.horizontal;
    this.initial.y = this.size.height * newIndices.vertical;
  }
  getIndices() {
    return new Plane({
      horizontal: this.initial.x / this.size.width,
      vertical: this.initial.y / this.size.height
    });
  }
  nextFrame(frames) {
    this.setIndices(new Plane({
      horizontal: this.getIndices().horizontal + 1,
      vertical: this.getIndices().vertical
    }));
    if (this.getIndices().horizontal >= frames)
      this.setIndices(new Plane({
        horizontal: 0,
        vertical: this.getIndices().vertical
      }));
  }
}

// public/tsc/engine/elements.ts
class Elements extends Image2 {
  element;
  constructor(props) {
    super(props);
    this.element = props.element;
  }
  drawElement() {
    const image4 = this.image;
    if (image4 === false)
      return;
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;
    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(image4, this.element.initial.x, this.element.initial.y, this.element.size.width, this.element.size.height, positionOnCanvas.initial.x, positionOnCanvas.initial.y, positionOnCanvas.size.width, positionOnCanvas.size.height);
  }
}

// public/tsc/engine/elementBoxes.ts
class ElementBoxes extends ImageBoxes {
  references = [];
  element;
  constructor(props) {
    super(props);
    this.route = props.route;
    this.element = props.element;
  }
  referencePush(indicesBox) {
    const position7 = this.getPosition(indicesBox);
    const newElements = new Elements({
      initial: position7.initial,
      size: position7.size,
      canvas: this.canvas,
      route: this.route,
      element: new Element({
        size: new Size({
          width: this.element.size.width,
          height: this.element.size.height
        }),
        indices: new Plane({
          horizontal: this.element.getIndices().horizontal,
          vertical: this.element.getIndices().vertical
        })
      })
    });
    const indexReference = this.referencesPush(indicesBox, newElements);
    if (indexReference === undefined)
      return;
    return this.references[indexReference];
  }
  drawElements() {
    this.references.forEach((elements2) => elements2.drawElement());
  }
}

// public/tsc/game/map/grounds.ts
class Grounds extends ElementBoxes {
  references = [];
  elementIndices;
  constructor(props) {
    super({
      x: props.map.initial.x,
      y: props.map.initial.y,
      canvas: props.canvas,
      size: new Size({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane({
        horizontal: 1,
        vertical: 1
      }),
      occupied: true,
      route: props.route,
      element: new Element({
        size: new Size({ width: 64, height: 64 }),
        indices: props.elementIndices.only
      })
    });
    this.elementIndices = props.elementIndices;
  }
  refreshElements() {
    this.references.forEach((elements2) => {
      const indicesBox = this.indicesBox(elements2.initial);
      const groundPosition = this.groundPosition(indicesBox);
      const indices = this.elementIndices[groundPosition];
      elements2.element.setIndices(new Plane({
        horizontal: indices.horizontal,
        vertical: indices.vertical
      }));
    });
  }
  pushGround(indicesBox) {
    const ground = this.referencePush(indicesBox);
    this.refreshElements();
    return ground;
  }
  groundPosition(indicesBox) {
    const leftBoxes = new Coordinate({
      x: indicesBox.x - 1,
      y: indicesBox.y
    });
    const rightBoxes = new Coordinate({
      x: indicesBox.x + 1,
      y: indicesBox.y
    });
    const upBoxes = new Coordinate({
      x: indicesBox.x,
      y: indicesBox.y - 1
    });
    const downBoxes = new Coordinate({
      x: indicesBox.x,
      y: indicesBox.y + 1
    });
    const left = this.getBox(leftBoxes) !== undefined;
    const right = this.getBox(rightBoxes) !== undefined;
    const up = this.getBox(upBoxes) !== undefined;
    const down = this.getBox(downBoxes) !== undefined;
    const isLeftUp = !up && down && !left && right;
    if (isLeftUp)
      return "leftUp";
    const isUp = !up && down && left && right;
    if (isUp)
      return "up";
    const isRightUp = !up && down && left && !right;
    if (isRightUp)
      return "rightUp";
    const isLeft = up && down && !left && right;
    if (isLeft)
      return "left";
    const isCenter = up && down && left && right;
    if (isCenter)
      return "center";
    const isRight = up && down && left && !right;
    if (isRight)
      return "right";
    const isLeftDown = up && !down && !left && right;
    if (isLeftDown)
      return "leftDown";
    const isDown = up && !down && left && right;
    if (isDown)
      return "down";
    const isRightDown = up && !down && left && !right;
    if (isRightDown)
      return "rightDown";
    const isHorizontalLeft = !up && !down && !left && right;
    if (isHorizontalLeft)
      return "horizontalLeft";
    const isHorizontalCenter = !up && !down && left && right;
    if (isHorizontalCenter)
      return "horizontalCenter";
    const isHorizontalRight = !up && !down && left && !right;
    if (isHorizontalRight)
      return "horizontalRight";
    const isVerticalUp = !up && down && !left && !right;
    if (isVerticalUp)
      return "verticalUp";
    const isVerticalCenter = up && down && !left && !right;
    if (isVerticalCenter)
      return "verticalCenter";
    const isVerticalDown = up && !down && !left && !right;
    if (isVerticalDown)
      return "verticalDown";
    return "only";
  }
  drawGrounds() {
    this.drawElements();
  }
}

// public/tsc/game/map/elevations.ts
class Elevations extends Grounds {
  constructor(props) {
    super({
      canvas: props.canvas,
      map: props.map,
      route: "images/terrain/ground/elevation.png",
      elementIndices: {
        leftUp: new Plane({ horizontal: 0, vertical: 0 }),
        up: new Plane({ horizontal: 1, vertical: 0 }),
        rightUp: new Plane({ horizontal: 2, vertical: 0 }),
        left: new Plane({ horizontal: 0, vertical: 1 }),
        center: new Plane({ horizontal: 1, vertical: 1 }),
        right: new Plane({ horizontal: 2, vertical: 1 }),
        leftDown: new Plane({ horizontal: 0, vertical: 2 }),
        down: new Plane({ horizontal: 1, vertical: 2 }),
        rightDown: new Plane({ horizontal: 2, vertical: 2 }),
        horizontalLeft: new Plane({ horizontal: 0, vertical: 4 }),
        horizontalCenter: new Plane({ horizontal: 1, vertical: 4 }),
        horizontalRight: new Plane({ horizontal: 2, vertical: 4 }),
        verticalUp: new Plane({ horizontal: 3, vertical: 0 }),
        verticalCenter: new Plane({ horizontal: 3, vertical: 1 }),
        verticalDown: new Plane({ horizontal: 3, vertical: 2 }),
        only: new Plane({ horizontal: 3, vertical: 4 })
      }
    });
  }
  pushElevation(indicesBox) {
    this.pushGround(indicesBox);
  }
  drawElevations() {
    this.drawGrounds();
  }
}

// public/tsc/game/map/flatElevations.ts
class FlatElevations extends ElementBoxes {
  elementIndices;
  constructor(props) {
    super({
      x: props.map.initial.x,
      y: props.map.initial.y,
      canvas: props.canvas,
      size: new Size({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane({
        horizontal: 1,
        vertical: 1
      }),
      occupied: true,
      route: "images/terrain/ground/flat.png",
      element: new Element({
        size: new Size({ width: 64, height: 64 }),
        indices: new Plane({ horizontal: 0, vertical: 0 })
      })
    });
    this.elementIndices = {
      grass: new Plane({ horizontal: 4, vertical: 0 }),
      sand: new Plane({ horizontal: 9, vertical: 0 })
    };
  }
  setFlatElevation(indicesBox, state) {
    const indices = this.elementIndices[state];
    this.element.setIndices(new Plane({
      horizontal: indices.horizontal,
      vertical: indices.vertical
    }));
    return this.referencePush(indicesBox);
  }
  drawFlatElevations() {
    this.drawElements();
  }
}

// public/tsc/game/map/flatsGrass.ts
class FlatsGrass extends Grounds {
  constructor(props) {
    super({
      canvas: props.canvas,
      map: props.map,
      route: "images/terrain/ground/flat.png",
      elementIndices: {
        leftUp: new Plane({ horizontal: 0, vertical: 0 }),
        up: new Plane({ horizontal: 1, vertical: 0 }),
        rightUp: new Plane({ horizontal: 2, vertical: 0 }),
        left: new Plane({ horizontal: 0, vertical: 1 }),
        center: new Plane({ horizontal: 1, vertical: 1 }),
        right: new Plane({ horizontal: 2, vertical: 1 }),
        leftDown: new Plane({ horizontal: 0, vertical: 2 }),
        down: new Plane({ horizontal: 1, vertical: 2 }),
        rightDown: new Plane({ horizontal: 2, vertical: 2 }),
        horizontalLeft: new Plane({ horizontal: 0, vertical: 3 }),
        horizontalCenter: new Plane({ horizontal: 1, vertical: 3 }),
        horizontalRight: new Plane({ horizontal: 2, vertical: 3 }),
        verticalUp: new Plane({ horizontal: 3, vertical: 0 }),
        verticalCenter: new Plane({ horizontal: 3, vertical: 1 }),
        verticalDown: new Plane({ horizontal: 3, vertical: 2 }),
        only: new Plane({ horizontal: 3, vertical: 3 })
      }
    });
  }
  pushFlatGrass(indicesBox) {
    return this.pushGround(indicesBox);
  }
  drawFlatsGrass() {
    this.drawGrounds();
  }
}

// public/tsc/game/map/shadows.ts
class Shadows extends ImageBoxes {
  constructor(props) {
    super({
      x: props.map.initial.x,
      y: props.map.initial.y,
      canvas: props.canvas,
      size: new Size({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane({
        horizontal: 3,
        vertical: 3
      }),
      occupied: [
        [true, false, false],
        [false, false, false],
        [false, false, false]
      ],
      route: "images/terrain/ground/shadows.png"
    });
  }
  pushShadow(indicesBox) {
    const shadow = this.referencePush(indicesBox);
    if (shadow === undefined)
      return;
    shadow.initial.x -= this.size.width;
    shadow.initial.y -= this.size.height;
    return shadow;
  }
  drawShadows() {
    this.drawImages();
  }
}

// public/tsc/game/map/stairsElevations.ts
class StairsElevations extends ElementBoxes {
  elementIndices;
  constructor(props) {
    super({
      x: props.map.initial.x,
      y: props.map.initial.y,
      canvas: props.canvas,
      size: new Size({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane({
        horizontal: 1,
        vertical: 1
      }),
      occupied: true,
      route: "images/terrain/ground/elevation.png",
      element: new Element({
        size: new Size({ width: 64, height: 64 }),
        indices: new Plane({ horizontal: 0, vertical: 0 })
      })
    });
    this.elementIndices = {
      left: new Plane({ horizontal: 0, vertical: 7 }),
      center: new Plane({ horizontal: 1, vertical: 7 }),
      right: new Plane({ horizontal: 2, vertical: 7 }),
      only: new Plane({ horizontal: 3, vertical: 7 })
    };
  }
  positionStairElevation(indicesBox) {
    const leftIndicesBox = new Coordinate({
      x: indicesBox.x - 1,
      y: indicesBox.y
    });
    const rightIndicesBox = new Coordinate({
      x: indicesBox.x + 1,
      y: indicesBox.y
    });
    const left = this.indicesBox(leftIndicesBox) !== undefined;
    const right = this.indicesBox(rightIndicesBox) !== undefined;
    const isLeft = !left && right;
    if (isLeft)
      return "left";
    const isCenter = left && right;
    if (isCenter)
      return "center";
    const isRight = left && !right;
    if (isRight)
      return "right";
    const isOnly = !left && !right;
    if (isOnly)
      return "only";
    throw new Error("invalid element");
  }
  refreshElements() {
    this.references.forEach((elements2) => {
      const indicesBox = this.indicesBox(elements2.initial);
      const position7 = this.positionStairElevation(indicesBox);
      const indices = this.elementIndices[position7];
      elements2.element.setIndices(new Plane({
        horizontal: indices.horizontal,
        vertical: indices.vertical
      }));
    });
  }
  setStairsElevations(indicesBox) {
    const stairElevation = this.referencePush(indicesBox);
    if (stairElevation === undefined)
      return;
    this.refreshElements();
    return stairElevation;
  }
  drawStairsElevations() {
    this.drawElements();
  }
}

// public/tsc/engine/animation.ts
class Animation {
  frames;
  intervalBetweenFrame = 0;
  constructor(props) {
    this.frames = props.frames;
    this.framesPerSecond = props.framesPerSecond;
  }
  get framesPerSecond() {
    return 1000 / this.intervalBetweenFrame;
  }
  set framesPerSecond(value) {
    this.intervalBetweenFrame = 1000 / value;
  }
}

// public/tsc/engine/animations.ts
class Animations extends Elements {
  timerNextFrame = 0;
  animation;
  constructor(props) {
    super(props);
    this.animation = props.animation;
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

// public/tsc/engine/animationBoxes.ts
class AnimationBoxes extends ElementBoxes {
  references = [];
  animation;
  constructor(props) {
    super(props);
    this.animation = props.animation;
  }
  referencePush(indicesBox) {
    const position7 = this.getPosition(indicesBox);
    const newAnimations = new Animations({
      initial: position7.initial,
      size: position7.size,
      canvas: this.canvas,
      route: this.route,
      element: new Element({
        size: new Size({
          width: this.element.size.width,
          height: this.element.size.height
        }),
        indices: new Plane({
          horizontal: 0,
          vertical: this.element.getIndices().vertical
        })
      }),
      animation: new Animation({
        frames: this.animation.frames,
        framesPerSecond: this.animation.framesPerSecond
      })
    });
    const indexReference = this.referencesPush(indicesBox, newAnimations);
    if (indexReference === undefined)
      return;
    return this.references[indexReference];
  }
  drawAnimations() {
    this.references.forEach((animations2) => animations2.drawAnimation());
  }
}

// public/tsc/game/map/trees.ts
class Trees extends AnimationBoxes {
  states;
  constructor(props) {
    super({
      x: props.map.initial.x,
      y: props.map.initial.y,
      canvas: props.canvas,
      size: new Size({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane({
        horizontal: 3,
        vertical: 3
      }),
      occupied: [
        [true, false, false],
        [true, false, false],
        [false, false, false]
      ],
      route: "images/resources/tree.png",
      element: new Element({
        size: new Size({ width: 192, height: 192 }),
        indices: new Plane({ horizontal: 0, vertical: 0 })
      }),
      animation: new Animation({ frames: 4, framesPerSecond: 4 })
    });
    this.states = {
      motion: {
        animation: new Animation({
          frames: 4,
          framesPerSecond: 4
        }),
        element: {
          indices: new Plane({ horizontal: 0, vertical: 0 })
        }
      },
      attacked: {
        animation: new Animation({
          frames: 2,
          framesPerSecond: 2
        }),
        element: {
          indices: new Plane({ horizontal: 0, vertical: 1 })
        }
      },
      felled: {
        animation: new Animation({
          frames: 1,
          framesPerSecond: 1
        }),
        element: {
          indices: new Plane({ horizontal: 0, vertical: 2 })
        }
      }
    };
  }
  pushTree(indicesBox, state) {
    const tree = this.states[state];
    const animations2 = this.referencePush(indicesBox);
    if (animations2 === undefined)
      return;
    animations2.element.setIndices(new Plane({
      horizontal: tree.element.indices.horizontal,
      vertical: tree.element.indices.vertical
    }));
    animations2.animation = new Animation({
      frames: tree.animation.frames,
      framesPerSecond: tree.animation.framesPerSecond
    });
    return animations2;
  }
  drawTrees() {
    this.drawAnimations();
  }
}

// public/tsc/game/map/wallElevations.ts
class WallElevations extends ElementBoxes {
  elementIndices;
  constructor(props) {
    super({
      x: props.map.initial.x,
      y: props.map.initial.y,
      canvas: props.canvas,
      size: new Size({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane({
        horizontal: 1,
        vertical: 1
      }),
      occupied: true,
      route: "images/terrain/ground/elevation.png",
      element: new Element({
        size: new Size({ width: 64, height: 64 }),
        indices: new Plane({ horizontal: 0, vertical: 0 })
      })
    });
    this.elementIndices = {
      left: new Plane({ horizontal: 0, vertical: 3 }),
      center: new Plane({ horizontal: 1, vertical: 3 }),
      right: new Plane({ horizontal: 2, vertical: 3 }),
      only: new Plane({ horizontal: 3, vertical: 5 })
    };
  }
  wallElevationPosition(indicesBox) {
    const leftBoxes = new Coordinate({
      x: indicesBox.x - 1,
      y: indicesBox.y
    });
    const rightBoxes = new Coordinate({
      x: indicesBox.x + 1,
      y: indicesBox.y
    });
    const left = this.getBox(leftBoxes) !== undefined;
    const right = this.getBox(rightBoxes) !== undefined;
    const isLeft = !left && right;
    if (isLeft)
      return "left";
    const isCenter = left && right;
    if (isCenter)
      return "center";
    const isRight = left && !right;
    if (isRight)
      return "right";
    const isVertical = !left && !right;
    if (isVertical)
      return "only";
    throw new Error("invalid element");
  }
  refreshElements() {
    this.references.forEach((elements3) => {
      const indicesBox = this.indicesBox(elements3.initial);
      const position7 = this.wallElevationPosition(indicesBox);
      const indices = this.elementIndices[position7];
      elements3.element.setIndices(new Plane({
        horizontal: indices.horizontal,
        vertical: indices.vertical
      }));
    });
  }
  pushWallElevation(indicesBox) {
    const wallElevation = this.referencePush(indicesBox);
    if (wallElevation === undefined)
      return;
    this.refreshElements();
    return wallElevation;
  }
  drawWallElevations() {
    this.drawElements();
  }
}

// public/tsc/game/map/water.ts
class Water extends ImageBoxes {
  constructor(props) {
    super({
      x: props.map.initial.x,
      y: props.map.initial.y,
      canvas: props.canvas,
      size: new Size({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane({
        horizontal: 1,
        vertical: 1
      }),
      occupied: true,
      route: "images/terrain/water/water.png"
    });
  }
  pushWater(indicesBoxes) {
    return this.referencePush(indicesBoxes);
  }
  drawWater() {
    this.drawImages();
  }
}

// public/tsc/game/map/foams.ts
class Foams extends AnimationBoxes {
  constructor(props) {
    super({
      x: props.map.initial.x,
      y: props.map.initial.y,
      canvas: props.canvas,
      size: new Size({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane({
        horizontal: 3,
        vertical: 3
      }),
      occupied: [
        [true, false, false],
        [false, false, false],
        [false, false, false]
      ],
      route: "images/terrain/water/foam.png",
      element: new Element({
        size: new Size({ width: 192, height: 192 }),
        indices: new Plane({ horizontal: 0, vertical: 0 })
      }),
      animation: new Animation({ frames: 8, framesPerSecond: 8 })
    });
  }
  pushFoam(indicesBox) {
    const foam = this.referencePush(indicesBox);
    if (foam === undefined)
      return;
    foam.initial.x -= this.size.width;
    foam.initial.y -= this.size.height;
    return foam;
  }
  drawFoams() {
    this.drawAnimations();
  }
}

// public/tsc/game/map/flatsSand.ts
class FlatsSand extends Grounds {
  constructor(props) {
    super({
      canvas: props.canvas,
      map: props.map,
      route: "images/terrain/ground/flat.png",
      elementIndices: {
        leftUp: new Plane({
          horizontal: 5,
          vertical: 0
        }),
        up: new Plane({
          horizontal: 6,
          vertical: 0
        }),
        rightUp: new Plane({
          horizontal: 7,
          vertical: 0
        }),
        left: new Plane({
          horizontal: 5,
          vertical: 1
        }),
        center: new Plane({
          horizontal: 6,
          vertical: 1
        }),
        right: new Plane({
          horizontal: 7,
          vertical: 1
        }),
        leftDown: new Plane({
          horizontal: 5,
          vertical: 2
        }),
        down: new Plane({
          horizontal: 6,
          vertical: 2
        }),
        rightDown: new Plane({
          horizontal: 7,
          vertical: 2
        }),
        horizontalLeft: new Plane({
          horizontal: 5,
          vertical: 3
        }),
        horizontalCenter: new Plane({
          horizontal: 6,
          vertical: 3
        }),
        horizontalRight: new Plane({
          horizontal: 7,
          vertical: 3
        }),
        verticalUp: new Plane({
          horizontal: 8,
          vertical: 0
        }),
        verticalCenter: new Plane({
          horizontal: 8,
          vertical: 1
        }),
        verticalDown: new Plane({
          horizontal: 8,
          vertical: 2
        }),
        only: new Plane({
          horizontal: 8,
          vertical: 3
        })
      }
    });
  }
  pushFlatSand(indicesBox) {
    return this.pushGround(indicesBox);
  }
  drawFlatsSand() {
    this.drawGrounds();
  }
}

// public/tsc/game/map/floor.ts
class Floor {
  map;
  canvas;
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
  constructor(props) {
    this.map = props.map;
    this.canvas = props.canvas;
    this.water = new Water({
      map: this.map,
      canvas: this.canvas
    });
    this.foams = new Foams({
      map: this.map,
      canvas: this.canvas
    });
    this.flatsSand = new FlatsSand({
      map: this.map,
      canvas: this.canvas
    });
    this.elevations = new Elevations({
      map: this.map,
      canvas: this.canvas
    });
    this.flatsGrass = new FlatsGrass({
      map: this.map,
      canvas: this.canvas
    });
    this.shadows = new Shadows({
      map: this.map,
      canvas: this.canvas
    });
    this.wallElevations = new WallElevations({
      map: this.map,
      canvas: this.canvas
    });
    this.stairsElevation = new StairsElevations({
      map: this.map,
      canvas: this.canvas
    });
    this.flatElevations = new FlatElevations({
      map: this.map,
      canvas: this.canvas
    });
    this.castles = new Castles({
      map: this.map,
      canvas: this.canvas
    });
    this.trees = new Trees({
      map: this.map,
      canvas: this.canvas
    });
  }
  pushFloor(matrix) {
    matrix.forEach((row, y) => {
      row.forEach((box2, x) => {
        const indicesBox = new Coordinate({ x, y });
        if (box2.water === true)
          this.water.pushWater(indicesBox);
        if (box2.foam !== false) {
          this.foams.pushFoam(indicesBox);
          if (box2.foam.flatSand === true)
            this.flatsSand.pushFlatSand(indicesBox);
        }
        if (box2.elevation !== false) {
          if (box2.elevation.shadow === true)
            this.shadows.pushShadow(indicesBox);
          if (box2.elevation.flatGrass === true)
            this.flatsGrass.pushFlatGrass(indicesBox);
          this.elevations.pushElevation(indicesBox);
        }
        if (box2.wallElevation !== false) {
          if (box2.wallElevation.shadow === true)
            this.shadows.pushShadow(indicesBox);
          this.wallElevations.pushWallElevation(indicesBox);
          if (box2.wallElevation.flatElevation !== false)
            this.flatElevations.setFlatElevation(indicesBox, box2.wallElevation.flatElevation);
        }
        if (box2.stairElevation !== false) {
          if (box2.stairElevation.shadow === true)
            this.shadows.pushShadow(indicesBox);
          this.stairsElevation.setStairsElevations(indicesBox);
          if (box2.stairElevation.flatElevation !== false)
            this.flatElevations.setFlatElevation(indicesBox, box2.stairElevation.flatElevation);
        }
        if (box2.castle !== false) {
          this.castles.castlePush(indicesBox, box2.castle.state, box2.castle.color);
        }
        if (box2.trees !== false) {
          this.trees.pushTree(indicesBox, box2.trees.animation);
        }
      });
    });
  }
  aboveFloor(character) {
    const flatSand = this.flatsSand.collision(character) !== false;
    const elevations2 = this.elevations.collision(character) !== false;
    const stairsElevations2 = this.stairsElevation.collision(character) !== false;
    if (flatSand === true)
      return true;
    if (elevations2 === true)
      return true;
    if (stairsElevations2 === true)
      return true;
    return false;
  }
  collisionFloor(character, movedCharacter) {
    const flatSand = this.flatsSand.collision(character) !== false;
    const elevations2 = this.elevations.collision(character) !== false;
    const wallElevations2 = this.wallElevations.collision(character) !== false;
    const stairsElevations2 = this.stairsElevation.collision(character) !== false;
    const nextFlatSand = this.flatsSand.collision(movedCharacter) !== false;
    const nextElevations = this.elevations.collision(movedCharacter) !== false;
    const nextWallElevations = this.wallElevations.collision(movedCharacter) !== false;
    const nextStairsElevations = this.stairsElevation.collision(movedCharacter) !== false;
    if (flatSand === true) {
      if (nextFlatSand === true)
        return false;
      if (nextElevations === true)
        return true;
      if (nextWallElevations === true)
        return true;
      if (nextStairsElevations === true)
        return false;
      return true;
    }
    if (elevations2 === true) {
      if (nextElevations === true) {
        return false;
      }
      if (nextWallElevations === true)
        return true;
      if (nextStairsElevations === true)
        return false;
      return true;
    }
    if (wallElevations2 === true) {
      return true;
    } else if (stairsElevations2 === true) {
      if (nextElevations === true)
        return false;
      if (nextWallElevations === true)
        return true;
      if (nextStairsElevations === true)
        return false;
      return true;
    }
    return true;
  }
  drawMap() {
    this.water.drawWater();
    this.foams.drawFoams();
    this.flatsSand.drawFlatsSand();
    this.shadows.drawShadows();
    this.elevations.drawElevations();
    this.wallElevations.drawWallElevations();
    this.flatsGrass.drawFlatsGrass();
    this.stairsElevation.drawStairsElevations();
    this.flatElevations.drawFlatElevations();
    this.castles.drawCastles();
    this.trees.drawTrees();
  }
}

// public/tsc/game/map.ts
class Map extends Position {
  matrix = GetMapMatrix();
  floors;
  boxes;
  canvas;
  constructor(props) {
    super({
      initial: new Coordinate({ x: 0, y: 0 }),
      size: new Size({
        width: 100,
        height: 100
      })
    });
    this.canvas = props.canvas;
    this.boxes = new Size({
      width: this.size.width / MapLength.horizontal,
      height: this.size.height / MapLength.vertical
    });
    this.floors = this.matrix.map((matrix) => {
      const floor2 = new Floor({
        map: this,
        canvas: this.canvas
      });
      floor2.pushFloor(matrix);
      return floor2;
    });
  }
  collisionMap(character, movedCharacter) {
    for (let floorIndex = this.floors.length - 1;floorIndex >= 0; floorIndex--) {
      const floor2 = this.floors[floorIndex];
      if (floor2 === undefined)
        continue;
      if (floor2.aboveFloor(character) === false)
        continue;
      if (floor2.collisionFloor(character, movedCharacter) === true)
        return true;
      const nextFloorIndex = floorIndex + 1;
      const nextFloor = this.floors[nextFloorIndex];
      if (nextFloor === undefined)
        return false;
      const flatSand = floor2.flatsSand.collision(character) !== false;
      const elevations2 = floor2.elevations.collision(character) !== false;
      const wallElevations2 = floor2.wallElevations.collision(character) !== false;
      const stairsElevations2 = floor2.stairsElevation.collision(character) !== false;
      const nextFlatSand = nextFloor.flatsSand.collision(movedCharacter) !== false;
      const nextElevations = nextFloor.elevations.collision(movedCharacter) !== false;
      const nextWallElevations = nextFloor.wallElevations.collision(movedCharacter) !== false;
      const nextStairsElevations = nextFloor.stairsElevation.collision(movedCharacter) !== false;
      if (flatSand === true) {
        if (nextFlatSand === true)
          return true;
        if (nextElevations === true)
          return true;
        if (nextWallElevations === true)
          return true;
        if (nextStairsElevations === true)
          return false;
      }
      if (elevations2 === true) {
        if (nextFlatSand === true)
          return true;
        if (nextElevations === true)
          return true;
        if (nextWallElevations === true)
          return true;
        if (nextStairsElevations === true)
          return false;
      }
      if (wallElevations2 === true) {
        if (nextFlatSand === true)
          return true;
        if (nextElevations === true)
          return true;
        if (nextWallElevations === true)
          return true;
        if (nextStairsElevations === true)
          return false;
      }
      if (stairsElevations2 === true) {
        if (nextFlatSand === true)
          return false;
        if (nextElevations === true)
          return false;
        if (nextWallElevations === true)
          return false;
        if (nextStairsElevations === true)
          return false;
      }
      return false;
    }
    return true;
  }
  drawMap() {
    this.floors.forEach((floor2) => floor2.drawMap());
  }
}

// public/tsc/engine/character/address.ts
class Address {
  x;
  y;
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
  }
  equals(address) {
    return this.x === address.x && this.y === address.y;
  }
}

// public/tsc/engine/rect.ts
class Rect extends Position {
  canvas;
  fillStyle;
  strokeStyle;
  lineWidth;
  constructor(props) {
    super(props);
    this.canvas = props.canvas;
    this.fillStyle = props.fillStyle;
    this.strokeStyle = props.strokeStyle;
    this.lineWidth = props.lineWidth;
  }
  drawRect() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;
    if (this.fillStyle !== false) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fillRect(positionOnCanvas.initial.x, positionOnCanvas.initial.y, positionOnCanvas.size.width, positionOnCanvas.size.height);
    }
    if (this.strokeStyle !== false) {
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.strokeRect(positionOnCanvas.initial.x, positionOnCanvas.initial.y, positionOnCanvas.size.width, positionOnCanvas.size.height);
    }
  }
}

// public/tsc/engine/character.ts
class Character extends Rect {
  scale;
  animations;
  speed;
  address;
  constructor(props) {
    super({
      initial: props.initial,
      size: props.size,
      canvas: props.canvas,
      fillStyle: "#fff",
      strokeStyle: false,
      lineWidth: 0
    });
    this.scale = props.scale;
    this.canvas = props.canvas;
    this.animations = new Animations({
      initial: new Coordinate({ x: 0, y: 0 }),
      size: new Size({ width: 0, height: 0 }),
      canvas: props.canvas,
      route: props.animations.route,
      element: props.animations.element,
      animation: props.animations.animation
    });
    this.speed = props.speed;
    this.address = props.address;
  }
  movedCharacter() {
    if (this.address.equals(new Address({ x: 0, y: 0 })))
      return false;
    const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
    const speedX = this.speed.x * secondsBetweenFrames;
    const speedY = this.speed.y * secondsBetweenFrames;
    const distanceX = speedX * this.address.x;
    const distanceY = speedY * this.address.y;
    const newX = this.initial.x + distanceX;
    const newY = this.initial.y + distanceY;
    return new Character({
      initial: new Coordinate({ x: newX, y: newY }),
      size: new Size({
        width: this.size.width,
        height: this.size.height
      }),
      canvas: this.canvas,
      scale: this.scale,
      animations: {
        route: this.animations.route,
        element: this.animations.element,
        animation: this.animations.animation
      },
      speed: this.speed,
      address: this.address
    });
  }
  drawCharacter() {
    this.drawRect();
    this.animations.size = new Size({
      width: this.scale.width * this.size.width,
      height: this.scale.height * this.size.height
    });
    this.animations.initial = new Coordinate({
      x: this.initial.x + this.size.width / 2 - this.animations.size.width / 2,
      y: this.initial.y + this.size.height / 2 - this.animations.size.height / 2
    });
    this.animations.drawAnimation();
  }
}

// public/tsc/game/pawn.ts
class Pawn extends Character {
  map;
  nickname;
  userBar;
  constructor(props) {
    super({
      initial: props.initial,
      size: new Size({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      canvas: props.canvas,
      scale: new Size({
        width: 3,
        height: 3
      }),
      animations: {
        route: `images/factions/knights/troops/pawn/${props.color}.png`,
        element: new Element({
          size: new Size({ width: 192, height: 192 }),
          indices: new Plane({ horizontal: 6, vertical: 6 })
        }),
        animation: new Animation({ frames: 6, framesPerSecond: 6 })
      },
      speed: new Coordinate({ x: 2, y: 2 }),
      address: new Address({ x: 0, y: 0 })
    });
    this.map = props.map;
    this.nickname = props.nickname;
    this.userBar = props.userBar;
  }
  drawPawn() {
    this.drawCharacter();
    this.userBar.drawUserBar(new Coordinate({
      x: this.initial.x + this.map.boxes.width,
      y: this.initial.y + this.map.boxes.height
    }));
  }
}

// public/tsc/engine/line.ts
class Line extends Position {
  canvas;
  fillStyle;
  strokeStyle;
  lineWidth;
  constructor(props) {
    const size20 = new Size({
      width: props.end.x - props.initial.x,
      height: props.end.y - props.initial.y
    });
    super({
      initial: props.initial,
      size: size20
    });
    this.canvas = props.canvas;
    this.fillStyle = props.fillStyle;
    this.strokeStyle = props.strokeStyle;
    this.lineWidth = props.lineWidth;
  }
  drawLine() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;
    this.canvas.context.beginPath();
    this.canvas.context.lineTo(positionOnCanvas.initial.x, positionOnCanvas.initial.y);
    this.canvas.context.lineTo(positionOnCanvas.end.x, positionOnCanvas.end.y);
    if (this.strokeStyle !== false) {
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.stroke();
    }
    if (this.fillStyle !== false) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }
    this.canvas.context.closePath();
  }
}

// public/tsc/game/sheep.ts
class Sheep extends Character {
  sightline;
  state = "move";
  character = {
    move: {
      animation: new Animation({
        frames: 8,
        framesPerSecond: 8
      }),
      element: {
        indices: new Plane({ horizontal: 0, vertical: 0 })
      }
    },
    jump: {
      animation: new Animation({
        frames: 6,
        framesPerSecond: 6
      }),
      element: {
        indices: new Plane({ horizontal: 0, vertical: 1 })
      }
    }
  };
  jumpTimer = 0;
  map;
  constructor(props) {
    super({
      initial: props.initial,
      size: new Size({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      canvas: props.canvas,
      scale: new Size({
        width: 3,
        height: 3
      }),
      animations: {
        route: "images/resources/sheep.png",
        element: new Element({
          size: new Size({ width: 128, height: 128 }),
          indices: new Plane({ horizontal: 0, vertical: 0 })
        }),
        animation: new Animation({ frames: 8, framesPerSecond: 8 })
      },
      speed: new Coordinate({ x: 40, y: 40 }),
      address: new Address({ x: 0, y: 0 })
    });
    this.map = props.map;
    this.state = "move";
    this.sightline = new Line({
      initial: new Coordinate({
        x: this.initial.x + this.size.width / 2,
        y: this.initial.y + this.size.height / 2
      }),
      end: this.endPercentage(new Size({ width: 200, height: 50 })),
      canvas: this.canvas,
      fillStyle: false,
      strokeStyle: "#333",
      lineWidth: 2
    });
  }
  moveSheep() {
    const movedCharacter = this.movedCharacter();
    if (movedCharacter === false)
      return false;
    const collision = this.map.collisionMap(this, movedCharacter);
    if (collision === true) {
      return false;
    }
    this.initial.x = movedCharacter.initial.x;
    this.initial.y = movedCharacter.initial.y;
    return true;
  }
  jumpSheep() {
    if (this.state !== "jump")
      return;
    const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
    this.jumpTimer += secondsBetweenFrames;
    const seconds = this.animations.animation.frames / this.animations.animation.framesPerSecond;
    if (this.jumpTimer >= seconds) {
      this.state = "move";
      this.jumpTimer = 0;
      return;
    }
  }
  refreshState() {
    let character3 = this.character[this.state];
    if (this.animations.element.getIndices().vertical === character3.element.indices.vertical)
      return;
    this.animations.element.setIndices(new Plane({
      horizontal: character3.element.indices.horizontal,
      vertical: character3.element.indices.vertical
    }));
    this.animations.animation.frames = character3.animation.frames;
    this.animations.animation.framesPerSecond = character3.animation.framesPerSecond;
  }
  drawSheep() {
    this.refreshState();
    this.moveSheep();
    this.jumpSheep();
    this.drawCharacter();
    this.sightline.drawLine();
  }
}

// public/tsc/engine/text.ts
class Text extends Position {
  canvas;
  value;
  fillStyle;
  strokeStyle;
  dungeonFont;
  constructor(props) {
    super(props);
    this.canvas = props.canvas;
    this.value = props.value;
    this.fillStyle = props.fillStyle;
    this.strokeStyle = props.strokeStyle;
    this.dungeonFont = props.dungeonFont;
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
    if (this.fillStyle !== false) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fillText(this.value, positionOnCanvas.initial.x, positionOnCanvas.initial.y);
    }
    if (this.strokeStyle !== false) {
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.strokeText(this.value, positionOnCanvas.initial.x, positionOnCanvas.initial.y);
    }
  }
}

// public/tsc/game/userBar.ts
class UserBar extends Rect {
  photo;
  name;
  constructor(props) {
    super({
      initial: new Coordinate({ x: 0, y: 0 }),
      size: props.size,
      canvas: props.canvas,
      fillStyle: "#416177",
      strokeStyle: "#fff",
      lineWidth: 0.5
    });
    this.photo = new Image2({
      initial: new Coordinate({ x: 0, y: 0 }),
      size: new Size({
        width: this.size.width * 0.3,
        height: this.size.height
      }),
      canvas: this.canvas,
      route: props.photoRoute
    });
    this.name = new Text({
      initial: new Coordinate({ x: 0, y: 0 }),
      size: this.size.percentage(new Size({
        width: 70,
        height: 100
      })),
      canvas: this.canvas,
      value: props.nickname,
      fillStyle: "#fff",
      strokeStyle: false,
      dungeonFont: false
    });
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

// public/tsc/game/game.ts
class Game extends Scene {
  map;
  pawns = [];
  sheepGroup = [];
  constructor(props) {
    super({ canvas: props.canvas });
    this.map = new Map({ canvas: props.canvas });
    this.sheepGroup = [
      new Sheep({
        initial: new Coordinate({ x: 35, y: 50 }),
        map: this.map,
        canvas: props.canvas
      })
    ];
  }
  tiktokGift(gift) {
    const exist = this.pawns.some((pawn2) => pawn2.nickname === gift.nickname);
    if (exist === true)
      return;
    this.pawns.push(new Pawn({
      initial: new Coordinate({
        x: Math.floor(Math.random() * this.map.size.width),
        y: Math.floor(Math.random() * this.map.size.height)
      }),
      map: this.map,
      canvas: this.canvas,
      color: "blue",
      nickname: gift.nickname,
      userBar: new UserBar({
        size: new Size({ width: 0, height: 0 }),
        canvas: this.canvas,
        photoRoute: gift.profilePictureUrl,
        nickname: gift.nickname
      })
    }));
  }
  tiktokChat(chat) {
    console.log(chat);
  }
  draw = () => {
    this.map.drawMap();
    this.pawns.forEach((pawn2) => pawn2.drawPawn());
    this.sheepGroup.forEach((sheep2) => sheep2.drawSheep());
  };
}

// public/tsc/index.ts
window.addEventListener("load", () => {
  const canvas2 = new Canvas({
    initial: new Coordinate({ x: 0, y: 0 }),
    framesPerSecond: 24
  });
  const game2 = new Game({ canvas: canvas2 });
  game2.start();
});
