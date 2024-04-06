// public/tsc/engine/coordinate.ts
class Coordinate_ENGINE {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  isEqualTo(coordinate) {
    return this.x === coordinate.x && this.y === coordinate.y;
  }
}

// public/tsc/engine/position.ts
class Position_ENGINE {
  leftUp;
  size;
  constructor(leftUp, size) {
    this.leftUp = leftUp;
    this.size = size;
  }
  leftDown() {
    return new Coordinate_ENGINE(this.leftUp.x, this.leftUp.y + this.size.height);
  }
  rightDown() {
    return new Coordinate_ENGINE(this.leftUp.x + this.size.width, this.leftUp.y + this.size.height);
  }
  rightUp() {
    return new Coordinate_ENGINE(this.leftUp.x + this.size.width, this.leftUp.y);
  }
  leftUpPlusSizePercentages(percentages) {
    const sizePercentage = this.size.percentage(percentages);
    const x = this.leftUp.x + sizePercentage.width;
    const y = this.leftUp.y + sizePercentage.height;
    return new Coordinate_ENGINE(x, y);
  }
  insidePositionCoordinate(coordinate2) {
    const rightDown = this.rightDown();
    return this.leftUp.x <= coordinate2.x && this.leftUp.y <= coordinate2.y && rightDown.x >= coordinate2.x && rightDown.y >= coordinate2.y;
  }
  insidePosition(position) {
    const rightDown = this.rightDown();
    const positionRightDown = position.rightDown();
    return this.leftUp.x <= position.leftUp.x && this.leftUp.y <= position.leftUp.y && rightDown.x >= positionRightDown.x && rightDown.y >= positionRightDown.y;
  }
  someVertexInside(position) {
    if (this.insidePositionCoordinate(position.leftUp))
      return true;
    if (this.insidePositionCoordinate(position.leftDown()))
      return true;
    if (this.insidePositionCoordinate(position.rightUp()))
      return true;
    if (this.insidePositionCoordinate(position.rightDown()))
      return true;
    return false;
  }
}

// public/tsc/engine/size.ts
class Size_ENGINE {
  width;
  height;
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  aPercent() {
    return new Size_ENGINE(this.width / 100, this.height / 100);
  }
  percentage(percentages) {
    const aPercent = this.aPercent();
    const width = aPercent.width * percentages.width;
    const height = aPercent.height * percentages.height;
    return new Size_ENGINE(width, height);
  }
  half() {
    const width = this.width / 2;
    const height = this.height / 2;
    return new Size_ENGINE(width, height);
  }
}

// public/tsc/engine/camera.ts
class Camera_ENGINE extends Position_ENGINE {
  constructor(leftUp) {
    super(leftUp, new Size_ENGINE(100, 100));
  }
  insideCamera(position2) {
    const doubleSize = new Size_ENGINE(position2.size.width * 2, position2.size.height * 2);
    const vision = new Position_ENGINE(new Coordinate_ENGINE(this.leftUp.x - position2.size.width, this.leftUp.y - position2.size.height), new Size_ENGINE(this.size.width + doubleSize.width, this.size.height + doubleSize.height));
    return vision.insidePosition(position2);
  }
  positionOnCamera(position2) {
    const insideCamera = this.insideCamera(position2);
    if (insideCamera === false)
      return false;
    return new Position_ENGINE(new Coordinate_ENGINE(position2.leftUp.x - this.leftUp.x, position2.leftUp.y - this.leftUp.y), new Size_ENGINE(position2.size.width, position2.size.height));
  }
  focusPosition(position2) {
    let x = position2.leftUp.x - this.size.width / 2;
    x += position2.size.width / 2;
    let y = position2.leftUp.y - this.size.height / 2;
    y += position2.size.height / 2;
    this.leftUp.x = x;
    this.leftUp.y = y;
  }
}

// public/tsc/engine/images.ts
class Images_ENGINE {
  notFound = [];
  images = {};
  loadingImage = false;
  getImage(route) {
    if (this.loadingImage === true)
      return false;
    if (this.notFound.includes(route) === true)
      return false;
    const image = this.images[route];
    if (image === undefined) {
      this.uploadImage(route);
      return false;
    }
    return image;
  }
  uploadImage(route) {
    if (this.notFound.includes(route) === true)
      return;
    const image = this.images[route];
    if (image !== undefined)
      return;
    this.loadingImage = true;
    const newImage = new Image;
    newImage.addEventListener("load", () => {
      this.loadingImage = false;
      this.images[route] = newImage;
    });
    newImage.addEventListener("error", () => {
      throw new Error(`image ${route} is not found`);
      this.notFound.push(route);
    });
    newImage.src = route;
  }
}

// public/tsc/engine/canvas.ts
class Canvas_ENGINE extends Camera_ENGINE {
  aPercent = new Size_ENGINE(0, 0);
  margin = new Size_ENGINE(0, 0);
  images = new Images_ENGINE;
  intervalBetweenFrames = 0;
  time = 0;
  timeBetweenFrames = 0;
  element;
  context;
  drawScene() {
  }
  touchstartScene = () => {
  };
  touchmoveScene = () => {
  };
  touchendScene = () => {
  };
  constructor(leftUp, framesPerSecond) {
    super(leftUp);
    this.setFramesPerSecond(framesPerSecond);
    this.element = window.document.getElementById("canvas");
    this.context = this.element.getContext("2d");
    this.aspectRatio();
    window.addEventListener("resize", () => this.aspectRatio());
    this.element.addEventListener("touchstart", (event) => this.touchstartCanvas(event));
    this.element.addEventListener("touchmove", (event) => this.touchmoveCanvas(event));
    this.element.addEventListener("touchend", (event) => this.touchendCanvas(event));
    this.nextFrame(0);
  }
  getFramesPerSecond() {
    return 1000 / this.intervalBetweenFrames;
  }
  setFramesPerSecond(value) {
    this.intervalBetweenFrames = 1000 / value;
  }
  nextFrame(time) {
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
  getTouchCoordinate(touch) {
    if (touch === null)
      return false;
    const left = this.margin.width / 2;
    const top = this.margin.height / 2;
    return new Coordinate_ENGINE(touch.pageX - left, touch.pageY - top);
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
    return new Position_ENGINE(new Coordinate_ENGINE(this.widthInPixels(positionOnCamera.leftUp.x), this.heightInPixels(positionOnCamera.leftUp.y)), new Size_ENGINE(this.widthInPixels(positionOnCamera.size.width), this.heightInPixels(positionOnCamera.size.height)));
  }
  widthInPercentageHeight(percentageHeight) {
    const pixels = this.heightInPixels(percentageHeight);
    return this.widthInPercentages(pixels);
  }
  widthInPercentages(pixels) {
    return pixels / this.aPercent.width;
  }
  widthInPixels(percentage) {
    return percentage * this.aPercent.width;
  }
  heightInPercentages(pixels) {
    return pixels / this.aPercent.height;
  }
  heightInPixels(percentage) {
    return percentage * this.aPercent.height;
  }
}

// public/tsc/engine/scene.ts
class Scene_ENGINE {
  canvas;
  draw = () => {
  };
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

// public/tsc/engine/plane.ts
class Plane_ENGINE {
  horizontal;
  vertical;
  constructor(horizontal, vertical) {
    this.horizontal = horizontal;
    this.vertical = vertical;
  }
}

// public/tsc/game/mapMatrix.ts
class MapMatrix_ENGINE {
  static length = new Plane_ENGINE(37, 21);
  static getEmptyBox() {
    return {
      water: false,
      foam: false,
      elevation: false,
      wallElevation: false,
      stairElevation: false,
      castle: false,
      trees: false
    };
  }
  static getFloor0Box(boxIndices) {
    const box = MapMatrix_ENGINE.getEmptyBox();
    box.water = true;
    if (boxIndices.vertical >= 3 && boxIndices.vertical <= 19 && boxIndices.horizontal >= 1 && boxIndices.horizontal <= 35)
      box.foam = {
        flatSand: true
      };
    if (boxIndices.vertical === 14 && boxIndices.horizontal >= 11 && boxIndices.horizontal <= 13)
      box.stairElevation = {
        shadow: true,
        flatElevation: boxIndices.horizontal === 11 ? "sand" : false
      };
    return box;
  }
  static getFloor1Box(boxIndices) {
    const box = MapMatrix_ENGINE.getEmptyBox();
    if (boxIndices.horizontal >= 2 && boxIndices.horizontal <= 34 && boxIndices.vertical >= 2 && boxIndices.vertical <= 13)
      box.elevation = {
        floor: 1,
        shadow: boxIndices.vertical >= 3,
        flatGrass: true
      };
    if (boxIndices.horizontal >= 2 && boxIndices.horizontal <= 10 && boxIndices.vertical === 14)
      box.elevation = {
        floor: 1,
        shadow: true,
        flatGrass: true
      };
    if (boxIndices.horizontal >= 14 && boxIndices.horizontal <= 34 && boxIndices.vertical === 14)
      box.elevation = {
        floor: 1,
        shadow: true,
        flatGrass: true
      };
    if (boxIndices.vertical === 15 && boxIndices.horizontal >= 2 && boxIndices.horizontal <= 10) {
      const flatElevationRandom = Math.round(Math.random());
      box.wallElevation = {
        shadow: true,
        flatElevation: flatElevationRandom === 0 ? "sand" : false
      };
    }
    if (boxIndices.vertical === 15 && boxIndices.horizontal >= 14 && boxIndices.horizontal <= 34) {
      const flatElevationRandom = Math.round(Math.random());
      box.wallElevation = {
        shadow: true,
        flatElevation: flatElevationRandom === 0 ? "sand" : false
      };
    }
    if (boxIndices.vertical === 7 && boxIndices.horizontal >= 11 && boxIndices.horizontal <= 13) {
      box.stairElevation = {
        shadow: true,
        flatElevation: boxIndices.horizontal === 9 ? "grass" : false
      };
    }
    if (boxIndices.vertical === 3 && boxIndices.horizontal === 14) {
      box.trees = {
        animation: "felled"
      };
    }
    return box;
  }
  static getFloor2Box(boxIndices) {
    const box = MapMatrix_ENGINE.getEmptyBox();
    if (boxIndices.horizontal >= 6 && boxIndices.horizontal <= 30 && boxIndices.vertical >= 1 && boxIndices.vertical <= 6) {
      box.elevation = {
        floor: 2,
        shadow: boxIndices.vertical >= 3,
        flatGrass: true
      };
    }
    if (boxIndices.horizontal >= 6 && boxIndices.horizontal <= 10 && boxIndices.vertical === 7) {
      box.elevation = {
        floor: 2,
        shadow: true,
        flatGrass: true
      };
    }
    if (boxIndices.horizontal >= 14 && boxIndices.horizontal <= 30 && boxIndices.vertical === 7) {
      box.elevation = {
        floor: 2,
        shadow: true,
        flatGrass: true
      };
    }
    if (boxIndices.vertical === 8 && boxIndices.horizontal >= 6 && boxIndices.horizontal <= 10) {
      const flatElevationRandom = Math.round(Math.random());
      box.wallElevation = {
        shadow: true,
        flatElevation: flatElevationRandom === 0 ? "grass" : false
      };
    }
    if (boxIndices.vertical === 8 && boxIndices.horizontal >= 14 && boxIndices.horizontal <= 30) {
      const flatElevationRandom = Math.round(Math.random());
      box.wallElevation = {
        shadow: true,
        flatElevation: flatElevationRandom === 0 ? "grass" : false
      };
    }
    return box;
  }
  static getBoxFloors = [
    MapMatrix_ENGINE.getFloor0Box,
    MapMatrix_ENGINE.getFloor1Box,
    MapMatrix_ENGINE.getFloor2Box
  ];
  static get() {
    const map = [];
    for (let floor = 0;floor < MapMatrix_ENGINE.getBoxFloors.length; floor++) {
      map[floor] = [];
      const floorMatrix = map[floor];
      if (floorMatrix === undefined)
        continue;
      const boxIndices = new Plane_ENGINE(0, 0);
      for (boxIndices.vertical = 0;boxIndices.vertical < MapMatrix_ENGINE.length.vertical; boxIndices.vertical++) {
        floorMatrix[boxIndices.vertical] = [];
        const row = floorMatrix[boxIndices.vertical];
        if (row === undefined)
          continue;
        for (boxIndices.horizontal = 0;boxIndices.horizontal < MapMatrix_ENGINE.length.horizontal; boxIndices.horizontal++) {
          const getBoxFloor = MapMatrix_ENGINE.getBoxFloors[floor];
          if (getBoxFloor === undefined)
            continue;
          row[boxIndices.horizontal] = getBoxFloor(boxIndices);
        }
      }
    }
    return map;
  }
}

// public/tsc/engine/element.ts
class Element_ENGINE extends Position_ENGINE {
  constructor(size3, indices) {
    super(new Coordinate_ENGINE(0, 0), size3);
    this.setIndices(indices);
  }
  setIndices(newIndices) {
    this.leftUp.x = this.size.width * newIndices.horizontal;
    this.leftUp.y = this.size.height * newIndices.vertical;
  }
  getIndices() {
    return new Plane_ENGINE(this.leftUp.x / this.size.width, this.leftUp.y / this.size.height);
  }
  nextFrame(frames) {
    this.setIndices(new Plane_ENGINE(this.getIndices().horizontal + 1, this.getIndices().vertical));
    if (this.getIndices().horizontal >= frames)
      this.setIndices(new Plane_ENGINE(0, this.getIndices().vertical));
  }
}

// public/tsc/engine/image.ts
class Image_ENGINE extends Position_ENGINE {
  canvas;
  route = false;
  constructor(leftUp, size3, canvas, route) {
    super(leftUp, size3);
    this.canvas = canvas;
    this.route = route;
  }
  getImage() {
    if (this.route === false)
      return false;
    return this.canvas.images.getImage(this.route);
  }
  drawImage() {
    const image = this.getImage();
    if (image === false)
      return;
    const positionOnTheCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnTheCanvas === false)
      return;
    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(image, positionOnTheCanvas.leftUp.x, positionOnTheCanvas.leftUp.y, positionOnTheCanvas.size.width, positionOnTheCanvas.size.height);
  }
}

// public/tsc/engine/elements.ts
class Elements_ENGINE extends Image_ENGINE {
  element;
  constructor(leftUp, size3, canvas, route, element) {
    super(leftUp, size3, canvas, route);
    this.element = element;
  }
  drawElement() {
    const image2 = this.getImage();
    if (image2 === false)
      return;
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;
    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(image2, this.element.leftUp.x, this.element.leftUp.y, this.element.size.width, this.element.size.height, positionOnCanvas.leftUp.x, positionOnCanvas.leftUp.y, positionOnCanvas.size.width, positionOnCanvas.size.height);
  }
}

// public/tsc/engine/box.ts
class Box_ENGINE extends Position_ENGINE {
  referenceIndex;
  constructor(leftUp, size3, referenceIndex) {
    super(leftUp, size3);
    this.referenceIndex = referenceIndex;
  }
}

// public/tsc/engine/boxes.ts
class Boxes_ENGINE extends Coordinate_ENGINE {
  boxes = [];
  references = [];
  canvas;
  size;
  length;
  occupied;
  constructor(x, y, canvas, size4, length, occupied) {
    super(x, y);
    this.canvas = canvas;
    this.size = size4;
    this.length = length;
    this.occupied = occupied;
  }
  collision(coordinate6) {
    const position7 = new Position_ENGINE(coordinate6, new Size_ENGINE(this.size.width, this.size.height));
    const boxIndicesLeftUp = (() => {
      const coordinate7 = new Coordinate_ENGINE(position7.leftUp.x - this.size.width, position7.leftUp.y - this.size.height);
      return this.getBoxIndices(coordinate7);
    })();
    const boxIndicesRightDown = (() => {
      const positionRightDown = position7.rightDown();
      const coordinate7 = new Coordinate_ENGINE(positionRightDown.x + this.size.width, positionRightDown.y + this.size.height);
      return this.getBoxIndices(coordinate7);
    })();
    const boxIndices = new Plane_ENGINE(0, 0);
    for (boxIndices.vertical = boxIndicesLeftUp.vertical;boxIndices.vertical <= boxIndicesRightDown.vertical; boxIndices.vertical++) {
      for (boxIndices.horizontal = boxIndicesLeftUp.horizontal;boxIndices.horizontal <= boxIndicesRightDown.horizontal; boxIndices.horizontal++) {
        const box2 = this.getBox(boxIndices);
        if (box2 === undefined)
          continue;
        if (box2.someVertexInside(position7) === false)
          continue;
        return box2;
      }
    }
    return false;
  }
  getPosition(boxIndices) {
    const x = boxIndices.horizontal * this.size.width;
    const y = boxIndices.vertical * this.size.height;
    const width = this.size.width * this.length.horizontal;
    const height = this.size.height * this.length.vertical;
    return new Position_ENGINE(new Coordinate_ENGINE(x, y), new Size_ENGINE(width, height));
  }
  getBox(boxIndices) {
    const boxesRow = this.boxes[boxIndices.vertical];
    if (boxesRow === undefined)
      return;
    const box2 = boxesRow[boxIndices.horizontal];
    return box2;
  }
  getBoxIndices(coordinate6) {
    const horizontal = Math.floor(coordinate6.x / this.size.width);
    const vertical = Math.floor(coordinate6.y / this.size.height);
    return new Plane_ENGINE(horizontal, vertical);
  }
  boxesIndices(boxIndices, box2) {
    let row = this.boxes[boxIndices.vertical];
    if (row === undefined)
      row = [];
    row[boxIndices.horizontal] = box2;
    this.boxes[boxIndices.vertical] = row;
  }
  setBox(boxIndices, referenceIndex) {
    const box2 = (() => {
      const size4 = new Size_ENGINE(this.size.width, this.size.height);
      const leftUp = (() => {
        const distanceX = boxIndices.horizontal * size4.width;
        const distanceY = boxIndices.vertical * size4.height;
        return new Coordinate_ENGINE(this.x + distanceX, this.y + distanceY);
      })();
      return new Box_ENGINE(leftUp, size4, referenceIndex);
    })();
    this.boxesIndices(boxIndices, box2);
  }
  occupiedBoxes(initialReferenceIndices, indexesBoxOccupy, referenceIndex) {
    const boxIndices = (() => {
      const horizontal = initialReferenceIndices.horizontal + indexesBoxOccupy.vertical;
      const vertical = initialReferenceIndices.vertical + indexesBoxOccupy.horizontal;
      return new Plane_ENGINE(horizontal, vertical);
    })();
    let boxesRow = this.boxes[boxIndices.vertical];
    if (boxesRow === undefined)
      boxesRow = [];
    let box2 = this.getBox(boxIndices);
    if (box2 !== undefined)
      return;
    this.setBox(boxIndices, referenceIndex);
  }
  referencePush(boxIndices) {
    const reference = this.getPosition(boxIndices);
    const referenceIndex = this.referencesPush(boxIndices, reference);
    if (referenceIndex === undefined)
      return;
    return this.references[referenceIndex];
  }
  referencesPush(boxIndices, reference) {
    const box2 = this.getBox(boxIndices);
    if (box2 !== undefined)
      return;
    this.references.push(reference);
    const referenceIndex = this.references.length - 1;
    if (this.occupied === true) {
      for (let vertical = 0;vertical < this.length.vertical; vertical++) {
        for (let horizontal = 0;horizontal < this.length.horizontal; horizontal++) {
          const indexesBoxOccupy = new Plane_ENGINE(horizontal, vertical);
          this.occupiedBoxes(boxIndices, indexesBoxOccupy, referenceIndex);
        }
      }
    } else {
      this.occupied.forEach((row, vertical) => {
        row.forEach((value, horizontal) => {
          if (value === false)
            return;
          const indexesBoxOccupy = new Plane_ENGINE(horizontal, vertical);
          this.occupiedBoxes(boxIndices, indexesBoxOccupy, referenceIndex);
        });
      });
    }
    return referenceIndex;
  }
}

// public/tsc/engine/imageBoxes.ts
class ImageBoxes_ENGINE extends Boxes_ENGINE {
  references = [];
  route;
  constructor(x, y, canvas, size4, length, occupied, route) {
    super(x, y, canvas, size4, length, occupied);
    this.route = route;
  }
  referencePush(boxIndices) {
    const position7 = this.getPosition(boxIndices);
    const reference = new Image_ENGINE(position7.leftUp, position7.size, this.canvas, this.route);
    const indexReference = this.referencesPush(boxIndices, reference);
    if (indexReference === undefined)
      return;
    return this.references[indexReference];
  }
  drawImages() {
    this.references.forEach((image3) => image3.drawImage());
  }
}

// public/tsc/engine/elementBoxes.ts
class ElementBoxes_ENGINE extends ImageBoxes_ENGINE {
  references = [];
  element;
  constructor(x, y, canvas, size5, length, occupied, route, element2) {
    super(x, y, canvas, size5, length, occupied, route);
    this.element = element2;
  }
  referencePush(boxIndices) {
    const position7 = this.getPosition(boxIndices);
    const reference = new Elements_ENGINE(position7.leftUp, position7.size, this.canvas, this.route, new Element_ENGINE(new Size_ENGINE(this.element.size.width, this.element.size.height), new Plane_ENGINE(this.element.getIndices().horizontal, this.element.getIndices().vertical)));
    const indexReference = this.referencesPush(boxIndices, reference);
    if (indexReference === undefined)
      return;
    return this.references[indexReference];
  }
  drawElements() {
    this.references.forEach((elements2) => elements2.drawElement());
  }
}

// public/tsc/game/map/grounds.ts
class Grounds_ENGINE extends ElementBoxes_ENGINE {
  references = [];
  elementIndices;
  constructor(map, canvas, route, elementIndices) {
    super(map.leftUp.x, map.leftUp.y, canvas, new Size_ENGINE(map.boxes.width, map.boxes.height), new Plane_ENGINE(1, 1), true, route, new Element_ENGINE(new Size_ENGINE(64, 64), elementIndices.only));
    this.elementIndices = elementIndices;
  }
  refreshElements() {
    this.references.forEach((elements2) => {
      const boxIndices = this.getBoxIndices(elements2.leftUp);
      const groundPosition = this.groundPosition(boxIndices);
      const indices = this.elementIndices[groundPosition];
      elements2.element.setIndices(new Plane_ENGINE(indices.horizontal, indices.vertical));
    });
  }
  pushGround(boxIndices) {
    const ground = this.referencePush(boxIndices);
    this.refreshElements();
    return ground;
  }
  groundPosition(boxIndices) {
    const leftBoxes = new Plane_ENGINE(boxIndices.horizontal - 1, boxIndices.vertical);
    const rightBoxes = new Plane_ENGINE(boxIndices.horizontal + 1, boxIndices.vertical);
    const upBoxes = new Plane_ENGINE(boxIndices.horizontal, boxIndices.vertical - 1);
    const downBoxes = new Plane_ENGINE(boxIndices.horizontal, boxIndices.vertical + 1);
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

// public/tsc/game/map/flatsSand.ts
class FlatsSand_ENGINE extends Grounds_ENGINE {
  constructor(map, canvas) {
    super(map, canvas, "images/terrain/ground/flat.png", {
      leftUp: new Plane_ENGINE(5, 0),
      up: new Plane_ENGINE(6, 0),
      rightUp: new Plane_ENGINE(7, 0),
      left: new Plane_ENGINE(5, 1),
      center: new Plane_ENGINE(6, 1),
      right: new Plane_ENGINE(7, 1),
      leftDown: new Plane_ENGINE(5, 2),
      down: new Plane_ENGINE(6, 2),
      rightDown: new Plane_ENGINE(7, 2),
      horizontalLeft: new Plane_ENGINE(5, 3),
      horizontalCenter: new Plane_ENGINE(6, 3),
      horizontalRight: new Plane_ENGINE(7, 3),
      verticalUp: new Plane_ENGINE(8, 0),
      verticalCenter: new Plane_ENGINE(8, 1),
      verticalDown: new Plane_ENGINE(8, 2),
      only: new Plane_ENGINE(8, 3)
    });
  }
  pushFlatSand(boxIndices) {
    return this.pushGround(boxIndices);
  }
  drawFlatsSand() {
    this.drawGrounds();
  }
}

// public/tsc/game/map/elevations.ts
class Elevations_ENGINE extends Grounds_ENGINE {
  constructor(map, canvas) {
    super(map, canvas, "images/terrain/ground/elevation.png", {
      leftUp: new Plane_ENGINE(0, 0),
      up: new Plane_ENGINE(1, 0),
      rightUp: new Plane_ENGINE(2, 0),
      left: new Plane_ENGINE(0, 1),
      center: new Plane_ENGINE(1, 1),
      right: new Plane_ENGINE(2, 1),
      leftDown: new Plane_ENGINE(0, 2),
      down: new Plane_ENGINE(1, 2),
      rightDown: new Plane_ENGINE(2, 2),
      horizontalLeft: new Plane_ENGINE(0, 4),
      horizontalCenter: new Plane_ENGINE(1, 4),
      horizontalRight: new Plane_ENGINE(2, 4),
      verticalUp: new Plane_ENGINE(3, 0),
      verticalCenter: new Plane_ENGINE(3, 1),
      verticalDown: new Plane_ENGINE(3, 2),
      only: new Plane_ENGINE(3, 4)
    });
  }
  pushElevation(boxIndices) {
    this.pushGround(boxIndices);
  }
  drawElevations() {
    this.drawGrounds();
  }
}

// public/tsc/game/map/wallElevations.ts
class WallElevations_ENGINE extends ElementBoxes_ENGINE {
  elementIndices;
  constructor(map, canvas) {
    super(map.leftUp.x, map.leftUp.y, canvas, new Size_ENGINE(map.boxes.width, map.boxes.height), new Plane_ENGINE(1, 1), true, "images/terrain/ground/elevation.png", new Element_ENGINE(new Size_ENGINE(64, 64), new Plane_ENGINE(0, 0)));
    this.elementIndices = {
      left: new Plane_ENGINE(0, 3),
      center: new Plane_ENGINE(1, 3),
      right: new Plane_ENGINE(2, 3),
      only: new Plane_ENGINE(3, 5)
    };
  }
  wallElevationPosition(boxIndices) {
    const leftBoxes = new Plane_ENGINE(boxIndices.horizontal - 1, boxIndices.vertical);
    const rightBoxes = new Plane_ENGINE(boxIndices.horizontal + 1, boxIndices.vertical);
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
    this.references.forEach((elements2) => {
      const boxIndices = this.getBoxIndices(elements2.leftUp);
      const position7 = this.wallElevationPosition(boxIndices);
      const indices = this.elementIndices[position7];
      elements2.element.setIndices(new Plane_ENGINE(indices.horizontal, indices.vertical));
    });
  }
  pushWallElevation(boxIndices) {
    const wallElevation = this.referencePush(boxIndices);
    if (wallElevation === undefined)
      return;
    this.refreshElements();
    return wallElevation;
  }
  drawWallElevations() {
    this.drawElements();
  }
}

// public/tsc/game/map/castle.ts
class Castle_ENGINE extends Image_ENGINE {
  state = "construction";
  color = "blue";
  constructor(leftUp, size7, canvas, state, color) {
    super(leftUp, size7, canvas, false);
    this.imageCastle(state, color);
  }
  imageCastle(newState, newColor) {
    this.state = newState;
    this.color = newColor;
    let file = this.state;
    if (this.state === "ready")
      file = this.color;
    this.route = `images/factions/knights/buildings/castle/${file}.png`;
  }
}

// public/tsc/game/map/castles.ts
class Castles_ENGINE extends ImageBoxes_ENGINE {
  references = [];
  constructor(map, canvas) {
    super(map.leftUp.x, map.leftUp.y, canvas, new Size_ENGINE(map.boxes.width, map.boxes.height), new Plane_ENGINE(4, 3), true, false);
  }
  castlePush(boxIndices, state, color) {
    const position7 = this.getPosition(boxIndices);
    const reference = new Castle_ENGINE(position7.leftUp, position7.size, this.canvas, state, color);
    const indexReference = this.referencesPush(boxIndices, reference);
    if (indexReference === undefined)
      return;
    return 0;
  }
  drawCastles() {
    this.drawImages();
  }
}

// public/tsc/game/map/water.ts
class Water_ENGINE extends ImageBoxes_ENGINE {
  constructor(map, canvas) {
    super(map.leftUp.x, map.leftUp.y, canvas, new Size_ENGINE(map.boxes.width, map.boxes.height), new Plane_ENGINE(1, 1), true, "images/terrain/water/water.png");
  }
  pushWater(boxIndices) {
    return this.referencePush(boxIndices);
  }
  drawWater() {
    this.drawImages();
  }
}

// public/tsc/engine/animation.ts
class Animation_ENGINE {
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

// public/tsc/engine/animations.ts
class Animations_ENGINE extends Elements_ENGINE {
  timerNextFrame = 0;
  animation;
  constructor(leftUp, size9, canvas, route, element4, animation) {
    super(leftUp, size9, canvas, route, element4);
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

// public/tsc/engine/animationBoxes.ts
class AnimationBoxes_ENGINE extends ElementBoxes_ENGINE {
  references = [];
  animation;
  constructor(x, y, canvas, size10, length, occupied, route, element5, animation2) {
    super(x, y, canvas, size10, length, occupied, route, element5);
    this.animation = animation2;
  }
  referencePush(boxIndices) {
    const position7 = this.getPosition(boxIndices);
    const reference = new Animations_ENGINE(position7.leftUp, position7.size, this.canvas, this.route, new Element_ENGINE(new Size_ENGINE(this.element.size.width, this.element.size.height), new Plane_ENGINE(0, this.element.getIndices().vertical)), new Animation_ENGINE(this.animation.frames, this.animation.framesPerSecond));
    const indexReference = this.referencesPush(boxIndices, reference);
    if (indexReference === undefined)
      return;
    return this.references[indexReference];
  }
  drawAnimations() {
    this.references.forEach((animations2) => animations2.drawAnimation());
  }
}

// public/tsc/game/map/foams.ts
class Foams_ENGINE extends AnimationBoxes_ENGINE {
  constructor(map, canvas) {
    super(map.leftUp.x, map.leftUp.y, canvas, new Size_ENGINE(map.boxes.width, map.boxes.height), new Plane_ENGINE(3, 3), [
      [true, false, false],
      [false, false, false],
      [false, false, false]
    ], "images/terrain/water/foam.png", new Element_ENGINE(new Size_ENGINE(192, 192), new Plane_ENGINE(0, 0)), new Animation_ENGINE(8, 8));
  }
  pushFoam(boxIndices) {
    const foam = this.referencePush(boxIndices);
    if (foam === undefined)
      return;
    foam.leftUp.x -= this.size.width;
    foam.leftUp.y -= this.size.height;
    return foam;
  }
  drawFoams() {
    this.drawAnimations();
  }
}

// public/tsc/game/map/flatsGrass.ts
class FlatsGrass_ENGINE extends Grounds_ENGINE {
  constructor(map, canvas) {
    super(map, canvas, "images/terrain/ground/flat.png", {
      leftUp: new Plane_ENGINE(0, 0),
      up: new Plane_ENGINE(1, 0),
      rightUp: new Plane_ENGINE(2, 0),
      left: new Plane_ENGINE(0, 1),
      center: new Plane_ENGINE(1, 1),
      right: new Plane_ENGINE(2, 1),
      leftDown: new Plane_ENGINE(0, 2),
      down: new Plane_ENGINE(1, 2),
      rightDown: new Plane_ENGINE(2, 2),
      horizontalLeft: new Plane_ENGINE(0, 3),
      horizontalCenter: new Plane_ENGINE(1, 3),
      horizontalRight: new Plane_ENGINE(2, 3),
      verticalUp: new Plane_ENGINE(3, 0),
      verticalCenter: new Plane_ENGINE(3, 1),
      verticalDown: new Plane_ENGINE(3, 2),
      only: new Plane_ENGINE(3, 3)
    });
  }
  pushFlatGrass(boxIndices) {
    return this.pushGround(boxIndices);
  }
  drawFlatsGrass() {
    this.drawGrounds();
  }
}

// public/tsc/game/map/shadows.ts
class Shadows_ENGINE extends ImageBoxes_ENGINE {
  constructor(map, canvas) {
    super(map.leftUp.x, map.leftUp.y, canvas, new Size_ENGINE(map.boxes.width, map.boxes.height), new Plane_ENGINE(3, 3), [
      [true, false, false],
      [false, false, false],
      [false, false, false]
    ], "images/terrain/ground/shadows.png");
  }
  pushShadow(boxIndices) {
    const shadow = this.referencePush(boxIndices);
    if (shadow === undefined)
      return;
    shadow.leftUp.x -= this.size.width;
    shadow.leftUp.y -= this.size.height;
    return shadow;
  }
  drawShadows() {
    this.drawImages();
  }
}

// public/tsc/game/map/stairsElevations.ts
class StairsElevations_ENGINE extends ElementBoxes_ENGINE {
  elementIndices;
  constructor(map, canvas) {
    super(map.leftUp.x, map.leftUp.y, canvas, new Size_ENGINE(map.boxes.width, map.boxes.height), new Plane_ENGINE(1, 1), true, "images/terrain/ground/elevation.png", new Element_ENGINE(new Size_ENGINE(64, 64), new Plane_ENGINE(0, 0)));
    this.elementIndices = {
      left: new Plane_ENGINE(0, 7),
      center: new Plane_ENGINE(1, 7),
      right: new Plane_ENGINE(2, 7),
      only: new Plane_ENGINE(3, 7)
    };
  }
  positionStairElevation(boxIndices) {
    const leftBoxIndices = new Plane_ENGINE(boxIndices.horizontal - 1, boxIndices.vertical);
    const rightBoxIndices = new Plane_ENGINE(boxIndices.horizontal + 1, boxIndices.vertical);
    const left = this.getBox(leftBoxIndices) !== undefined;
    const right = this.getBox(rightBoxIndices) !== undefined;
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
    this.references.forEach((elements3) => {
      const boxIndices = this.getBoxIndices(elements3.leftUp);
      const position7 = this.positionStairElevation(boxIndices);
      const indices = this.elementIndices[position7];
      elements3.element.setIndices(new Plane_ENGINE(indices.horizontal, indices.vertical));
    });
  }
  setStairsElevations(boxIndices) {
    const stairElevation = this.referencePush(boxIndices);
    if (stairElevation === undefined)
      return;
    this.refreshElements();
    return stairElevation;
  }
  drawStairsElevations() {
    this.drawElements();
  }
}

// public/tsc/game/map/flatElevations.ts
class FlatElevations_ENGINE extends ElementBoxes_ENGINE {
  elementIndices;
  constructor(map, canvas) {
    super(map.leftUp.x, map.leftUp.y, canvas, new Size_ENGINE(map.boxes.width, map.boxes.height), new Plane_ENGINE(1, 1), true, "images/terrain/ground/flat.png", new Element_ENGINE(new Size_ENGINE(64, 64), new Plane_ENGINE(0, 0)));
    this.elementIndices = {
      grass: new Plane_ENGINE(4, 0),
      sand: new Plane_ENGINE(9, 0)
    };
  }
  pushFlatElevation(boxIndices, state) {
    const indices = this.elementIndices[state];
    this.element.setIndices(new Plane_ENGINE(indices.horizontal, indices.vertical));
    return this.referencePush(boxIndices);
  }
  drawFlatElevations() {
    this.drawElements();
  }
}

// public/tsc/game/map/trees.ts
class Trees_ENGINE extends AnimationBoxes_ENGINE {
  states;
  constructor(map, canvas) {
    super(map.leftUp.x, map.leftUp.y, canvas, new Size_ENGINE(map.boxes.width, map.boxes.height), new Plane_ENGINE(3, 3), [
      [true, false, false],
      [true, false, false],
      [false, false, false]
    ], "images/resources/tree.png", new Element_ENGINE(new Size_ENGINE(192, 192), new Plane_ENGINE(0, 0)), new Animation_ENGINE(4, 4));
    this.states = {
      motion: {
        animation: new Animation_ENGINE(4, 4),
        element: {
          indices: new Plane_ENGINE(0, 0)
        }
      },
      attacked: {
        animation: new Animation_ENGINE(2, 2),
        element: {
          indices: new Plane_ENGINE(0, 1)
        }
      },
      felled: {
        animation: new Animation_ENGINE(1, 1),
        element: {
          indices: new Plane_ENGINE(0, 2)
        }
      }
    };
  }
  pushTree(boxIndices, state) {
    const tree = this.states[state];
    const animations2 = this.referencePush(boxIndices);
    if (animations2 === undefined)
      return;
    animations2.element.setIndices(new Plane_ENGINE(tree.element.indices.horizontal, tree.element.indices.vertical));
    animations2.animation = new Animation_ENGINE(tree.animation.frames, tree.animation.framesPerSecond);
    return animations2;
  }
  drawTrees() {
    this.drawAnimations();
  }
}

// public/tsc/engine/character/direction.ts
class Direction_ENGINE {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getX() {
    return this.x;
  }
  getNumberX() {
    if (this.x === "left")
      return -1;
    if (this.x === "right")
      return 1;
    if (this.x === "center")
      return 0;
    throw new Error("invalid  direction x");
  }
  getY() {
    return this.y;
  }
  getNumberY() {
    if (this.y === "up")
      return -1;
    if (this.y === "down")
      return 1;
    if (this.y === "center")
      return 0;
    throw new Error("invalid direction y");
  }
  setX(x) {
    this.x = x;
  }
  setY(y) {
    this.y = y;
  }
  isEqualTo(directionX, directionY) {
    return this.x === directionX && this.y === directionY;
  }
}

// public/tsc/game/map/floor.ts
class Floor_ENGINE {
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
  constructor(map, canvas) {
    this.map = map;
    this.canvas = canvas;
    this.water = new Water_ENGINE(this.map, this.canvas);
    this.foams = new Foams_ENGINE(this.map, this.canvas);
    this.flatsSand = new FlatsSand_ENGINE(this.map, this.canvas);
    this.elevations = new Elevations_ENGINE(this.map, this.canvas);
    this.flatsGrass = new FlatsGrass_ENGINE(this.map, this.canvas);
    this.shadows = new Shadows_ENGINE(this.map, this.canvas);
    this.wallElevations = new WallElevations_ENGINE(this.map, this.canvas);
    this.stairsElevation = new StairsElevations_ENGINE(this.map, this.canvas);
    this.flatElevations = new FlatElevations_ENGINE(this.map, this.canvas);
    this.castles = new Castles_ENGINE(this.map, this.canvas);
    this.trees = new Trees_ENGINE(this.map, this.canvas);
  }
  pushFloor(matrix) {
    matrix.forEach((row, vertical) => {
      row.forEach((box3, horizontal) => {
        const boxIndices = new Plane_ENGINE(horizontal, vertical);
        if (box3.water === true)
          this.water.pushWater(boxIndices);
        if (box3.foam !== false) {
          this.foams.pushFoam(boxIndices);
          if (box3.foam.flatSand === true)
            this.flatsSand.pushFlatSand(boxIndices);
        }
        if (box3.elevation !== false) {
          if (box3.elevation.shadow === true)
            this.shadows.pushShadow(boxIndices);
          if (box3.elevation.flatGrass === true)
            this.flatsGrass.pushFlatGrass(boxIndices);
          this.elevations.pushElevation(boxIndices);
        }
        if (box3.wallElevation !== false) {
          if (box3.wallElevation.shadow === true)
            this.shadows.pushShadow(boxIndices);
          this.wallElevations.pushWallElevation(boxIndices);
          if (box3.wallElevation.flatElevation !== false)
            this.flatElevations.pushFlatElevation(boxIndices, box3.wallElevation.flatElevation);
        }
        if (box3.stairElevation !== false) {
          if (box3.stairElevation.shadow === true)
            this.shadows.pushShadow(boxIndices);
          this.stairsElevation.setStairsElevations(boxIndices);
          if (box3.stairElevation.flatElevation !== false)
            this.flatElevations.pushFlatElevation(boxIndices, box3.stairElevation.flatElevation);
        }
        if (box3.castle !== false) {
          this.castles.castlePush(boxIndices, box3.castle.state, box3.castle.color);
        }
        if (box3.trees !== false) {
          this.trees.pushTree(boxIndices, box3.trees.animation);
        }
      });
    });
  }
  aboveFloor(coordinate7) {
    const flatSand = this.flatsSand.collision(coordinate7) !== false;
    const elevations2 = this.elevations.collision(coordinate7) !== false;
    const stairsElevations2 = this.stairsElevation.collision(coordinate7) !== false;
    if (flatSand === true)
      return true;
    if (elevations2 === true)
      return true;
    if (stairsElevations2 === true)
      return true;
    return false;
  }
  collisionFloor(coordinate7, lastCoordinate) {
    if (coordinate7.x === lastCoordinate.x && coordinate7.y === lastCoordinate.y)
      return false;
    const flatSand = this.flatsSand.collision(coordinate7) instanceof Box_ENGINE;
    const elevations2 = this.elevations.collision(coordinate7) instanceof Box_ENGINE;
    const wallElevations2 = this.wallElevations.collision(coordinate7) instanceof Box_ENGINE;
    const stairsElevations2 = this.stairsElevation.collision(coordinate7) instanceof Box_ENGINE;
    const direction2 = (() => {
      const value = new Direction_ENGINE("center", "center");
      if (coordinate7.x > lastCoordinate.x)
        value.setX("left");
      else if (coordinate7.x < lastCoordinate.x)
        value.setX("right");
      if (coordinate7.y > lastCoordinate.y)
        value.setY("up");
      else if (coordinate7.y < lastCoordinate.y)
        value.setY("down");
      return value;
    })();
    const nextCoordinate = new Coordinate_ENGINE(coordinate7.x, coordinate7.y);
    let newCoordinate = new Coordinate_ENGINE(coordinate7.x, coordinate7.y);
    const collisionNextCoordinate = () => {
      console.log("nextCoordinate while", nextCoordinate);
      console.log("newCoodinate while", newCoordinate);
      const nextFlatSand = this.flatsSand.collision(nextCoordinate) !== false;
      const nextElevations = this.elevations.collision(nextCoordinate) !== false;
      const nextWallElevations = this.wallElevations.collision(nextCoordinate) !== false;
      const nextStairsElevations = this.stairsElevation.collision(nextCoordinate) !== false;
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
      throw new Error("invalid coordinate collision");
    };
    const conditionInX = () => {
      const directionX = direction2.getX();
      if (directionX === "left")
        return lastCoordinate.x < nextCoordinate.x;
      else if (directionX === "right")
        return nextCoordinate.x < lastCoordinate.x;
      return false;
    };
    const conditionInY = () => {
      const directionY = direction2.getY();
      if (directionY === "up")
        return lastCoordinate.y < nextCoordinate.y;
      else if (directionY === "down")
        return nextCoordinate.y < lastCoordinate.y;
      return false;
    };
    while (conditionInX() || conditionInY()) {
      nextCoordinate.x += this.map.boxes.width * direction2.getNumberX();
      nextCoordinate.y += this.map.boxes.height * direction2.getNumberY();
      const collision = collisionNextCoordinate();
      if (collision === true)
        return newCoordinate;
      newCoordinate = new Coordinate_ENGINE(nextCoordinate.x, nextCoordinate.y);
    }
    return false;
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
class Map_ENGINE extends Position_ENGINE {
  matrix = MapMatrix_ENGINE.get();
  floors;
  boxes;
  canvas;
  constructor(canvas) {
    super(new Coordinate_ENGINE(0, 0), new Size_ENGINE(100, 100));
    this.canvas = canvas;
    this.boxes = new Size_ENGINE(0, this.size.height / MapMatrix_ENGINE.length.vertical);
    this.boxes.width = this.canvas.widthInPercentageHeight(this.boxes.height);
    this.floors = this.matrix.map((matrix) => {
      const floor2 = new Floor_ENGINE(this, this.canvas);
      floor2.pushFloor(matrix);
      return floor2;
    });
  }
  indexFloorOn(coordinate8) {
    for (let floorIndex = this.floors.length - 1;floorIndex >= 0; floorIndex--) {
      const floor2 = this.floors[floorIndex];
      if (floor2 === undefined)
        continue;
      if (floor2.aboveFloor(coordinate8) === false)
        continue;
    }
  }
  collisionMap(coordinate8, lastCoordinate) {
    console.log(coordinate8, lastCoordinate);
    for (let floorIndex = this.floors.length - 1;floorIndex >= 0; floorIndex--) {
      const floor2 = this.floors[floorIndex];
      if (floor2 === undefined)
        continue;
      if (floor2.aboveFloor(coordinate8) === false)
        continue;
      const collisionFloor = floor2.collisionFloor(coordinate8, lastCoordinate);
      if (collisionFloor !== false)
        return collisionFloor;
      const nextFloorIndex = floorIndex + 1;
      const nextFloor = this.floors[nextFloorIndex];
      if (nextFloor === undefined)
        return coordinate8;
      const flatSand = floor2.flatsSand.collision(coordinate8) !== false;
      const elevations2 = floor2.elevations.collision(coordinate8) !== false;
      const wallElevations2 = floor2.wallElevations.collision(coordinate8) !== false;
      const stairsElevations2 = floor2.stairsElevation.collision(coordinate8) !== false;
      const direction3 = (() => {
        const value = new Direction_ENGINE("center", "center");
        if (coordinate8.x > lastCoordinate.x)
          value.setX("left");
        else if (coordinate8.x < lastCoordinate.x)
          value.setX("right");
        if (coordinate8.y > lastCoordinate.y)
          value.setY("up");
        else if (coordinate8.y < lastCoordinate.y)
          value.setY("down");
        return value;
      })();
      const nextCoordinate = new Coordinate_ENGINE(coordinate8.x, coordinate8.y);
      let newCoordinate = new Coordinate_ENGINE(coordinate8.x, coordinate8.y);
      const collisionNextCoordinate = () => {
        const nextFlatSand = nextFloor.flatsSand.collision(nextCoordinate) !== false;
        const nextElevations = nextFloor.elevations.collision(nextCoordinate) !== false;
        const nextWallElevations = nextFloor.wallElevations.collision(nextCoordinate) !== false;
        const nextStairsElevations = nextFloor.stairsElevation.collision(nextCoordinate) !== false;
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
        return true;
      };
      const conditionInX = () => {
        const directionX = direction3.getX();
        if (directionX === "left")
          return lastCoordinate.x < nextCoordinate.x;
        else if (directionX === "right")
          return nextCoordinate.x < lastCoordinate.x;
        return false;
      };
      const conditionInY = () => {
        const directionY = direction3.getY();
        if (directionY === "up")
          return lastCoordinate.y < nextCoordinate.y;
        else if (directionY === "down") {
          return nextCoordinate.y < lastCoordinate.y;
        }
        return false;
      };
      while (conditionInX() || conditionInY()) {
        nextCoordinate.x += this.boxes.width * direction3.getNumberX();
        nextCoordinate.y += this.boxes.height * direction3.getNumberY();
        const collision = collisionNextCoordinate();
        if (collision === true)
          return newCoordinate;
        newCoordinate = new Coordinate_ENGINE(nextCoordinate.x, nextCoordinate.y);
      }
      return false;
    }
    throw new Error("no floors");
  }
  drawMap() {
    this.floors.forEach((floor2) => floor2.drawMap());
  }
}

// public/tsc/engine/square.ts
class Square_ENGINE extends Position_ENGINE {
  canvas;
  fillStyle;
  strokeStyle;
  lineWidth;
  constructor(leftUp, size16, canvas, fillStyle, strokeStyle, lineWidth) {
    super(leftUp, size16);
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }
  drawSquare() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;
    this.canvas.context.beginPath();
    this.canvas.context.rect(positionOnCanvas.leftUp.x, positionOnCanvas.leftUp.y, positionOnCanvas.size.width, positionOnCanvas.size.height);
    if (this.fillStyle !== false) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fill();
    }
    if (this.strokeStyle !== false) {
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.lineWidth = this.lineWidth;
      this.canvas.context.stroke();
    }
    this.canvas.context.closePath();
  }
}

// public/tsc/engine/character.ts
class Character_ENGINE extends Square_ENGINE {
  scale;
  animations;
  speed;
  direction;
  constructor(leftUp, size17, canvas, fillStyle, strokeStyle, lineWidth, scale, animations3, speed, direction3) {
    super(leftUp, size17, canvas, fillStyle, strokeStyle, lineWidth);
    this.scale = scale;
    this.canvas = canvas;
    this.animations = new Animations_ENGINE(new Coordinate_ENGINE(0, 0), new Size_ENGINE(0, 0), canvas, animations3.route, animations3.element, animations3.animation);
    this.speed = speed;
    this.direction = direction3;
  }
  movedCharacter() {
    if (this.direction.isEqualTo("center", "center"))
      return false;
    const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
    const speedX = this.speed.x * secondsBetweenFrames;
    const speedY = this.speed.y * secondsBetweenFrames;
    const distanceX = speedX * this.direction.getNumberX();
    const distanceY = speedY * this.direction.getNumberY();
    const newX = this.leftUp.x + distanceX;
    const newY = this.leftUp.y + distanceY;
    return new Coordinate_ENGINE(newX, newY);
  }
  drawCharacter() {
    this.drawSquare();
    this.animations.size = new Size_ENGINE(this.scale.width * this.size.width, this.scale.height * this.size.height);
    this.animations.leftUp = new Coordinate_ENGINE(this.leftUp.x + this.size.width / 2 - this.animations.size.width / 2, this.leftUp.y + this.size.height / 2 - this.animations.size.height / 2);
    this.animations.drawAnimation();
  }
}

// public/tsc/engine/text.ts
class Text_ENGINE extends Position_ENGINE {
  canvas;
  value;
  fillStyle;
  strokeStyle;
  dungeonFont;
  constructor(leftUp, size17, canvas, value, fillStyle, strokeStyle, dungeonFont) {
    super(leftUp, size17);
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
    const positionOnCamera = this.canvas.positionOnCamera(this);
    if (positionOnCamera === false)
      return;
    this.canvas.context.font = this.font;
    this.canvas.context.textAlign = "left";
    this.canvas.context.textBaseline = "top";
    positionOnCamera.size.width = this.canvas.context.measureText(this.value).width;
    positionOnCamera.leftUp.x += this.size.width / 2;
    positionOnCamera.leftUp.x -= positionOnCamera.size.width / 2;
    if (this.fillStyle !== false) {
      this.canvas.context.fillStyle = this.fillStyle;
      this.canvas.context.fillText(this.value, positionOnCamera.leftUp.x, positionOnCamera.leftUp.y);
    }
    if (this.strokeStyle !== false) {
      this.canvas.context.strokeStyle = this.strokeStyle;
      this.canvas.context.strokeText(this.value, positionOnCamera.leftUp.x, positionOnCamera.leftUp.y);
    }
  }
}

// public/tsc/game/userBar.ts
class UserBar_ENGINE extends Square_ENGINE {
  pawn;
  photo;
  name;
  constructor(pawn, size18, canvas, photoRoute, nickname) {
    super(new Coordinate_ENGINE(0, 0), size18, canvas, "#416177", "#fff", 0.5);
    this.pawn = pawn;
    this.photo = new Image_ENGINE(new Coordinate_ENGINE(0, 0), new Size_ENGINE(this.size.width * 0.3, this.size.height), this.canvas, photoRoute);
    this.name = new Text_ENGINE(new Coordinate_ENGINE(0, 0), this.size.percentage(new Size_ENGINE(70, 100)), this.canvas, nickname, "#fff", false, false);
  }
  drawUserBar() {
    this.leftUp.x = this.pawn.leftUp.x;
    this.leftUp.y = this.pawn.leftUp.y - this.size.height;
    this.photo.leftUp.x = this.leftUp.x;
    this.photo.leftUp.y = this.leftUp.y;
    this.name.leftUp.x = this.leftUp.x + this.photo.size.width;
    this.name.leftUp.y = this.leftUp.y;
    this.drawSquare();
    this.photo.drawImage();
    this.name.drawText();
  }
}

// public/tsc/game/pawn.ts
class Pawn_ENGINE extends Character_ENGINE {
  map;
  nickname;
  userBar;
  constructor(leftUp, map, canvas, color, nickname) {
    super(leftUp, new Size_ENGINE(map.boxes.width, map.boxes.height), canvas, "#fff", false, 0, new Size_ENGINE(3, 3), {
      route: `images/factions/knights/troops/pawn/${color}.png`,
      element: new Element_ENGINE(new Size_ENGINE(192, 192), new Plane_ENGINE(6, 6)),
      animation: new Animation_ENGINE(6, 6)
    }, new Coordinate_ENGINE(2, 2), new Direction_ENGINE("center", "center"));
    this.map = map;
    this.nickname = nickname;
    this.userBar = new UserBar_ENGINE(this, new Size_ENGINE(0, 0), this.canvas, false, this.nickname);
  }
  drawPawn() {
    this.drawCharacter();
    this.userBar.drawUserBar();
  }
}

// public/tsc/engine/line.ts
class Line_ENGINE extends Position_ENGINE {
  canvas;
  fillStyle;
  strokeStyle;
  lineWidth;
  constructor(leftUp, rightDown, canvas, fillStyle, strokeStyle, lineWidth) {
    const size20 = new Size_ENGINE(rightDown.x - leftUp.x, rightDown.y - leftUp.y);
    super(leftUp, size20);
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }
  setPosition(leftUp, rightDown) {
    const size20 = new Size_ENGINE(rightDown.x - leftUp.x, rightDown.y - leftUp.y);
    this.leftUp = leftUp;
    this.size = size20;
  }
  drawLine() {
    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false)
      return;
    this.canvas.context.beginPath();
    this.canvas.context.lineTo(positionOnCanvas.leftUp.x, positionOnCanvas.leftUp.y);
    const positionOnCanvasRightDown = positionOnCanvas.rightDown();
    this.canvas.context.lineTo(positionOnCanvasRightDown.x, positionOnCanvasRightDown.y);
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
class Sheep_ENGINE extends Character_ENGINE {
  lineSight;
  state = "move";
  states = {
    move: {
      animation: new Animation_ENGINE(8, 8),
      element: {
        indices: new Plane_ENGINE(0, 0)
      }
    },
    jump: {
      animation: new Animation_ENGINE(6, 6),
      element: {
        indices: new Plane_ENGINE(0, 1)
      }
    }
  };
  jumpTimer = 0;
  map;
  constructor(leftUp, map, canvas) {
    super(leftUp, new Size_ENGINE(map.boxes.width, map.boxes.height), canvas, "#fff", false, 0, new Size_ENGINE(3, 3), {
      route: "images/resources/sheep/left.png",
      element: new Element_ENGINE(new Size_ENGINE(128, 128), new Plane_ENGINE(0, 0)),
      animation: new Animation_ENGINE(8, 8)
    }, new Coordinate_ENGINE(1000, 1000), new Direction_ENGINE("center", "down"));
    this.map = map;
    this.state = "move";
    this.lineSight = new Line_ENGINE(new Coordinate_ENGINE(0, 0), new Coordinate_ENGINE(0, 0), this.canvas, false, "#333", 2);
  }
  lineSightPosition() {
    const leftUp = (() => {
      const halfSizeWidth = this.size.width / 2;
      const halfSizeHeight = this.size.height / 2;
      const x = this.leftUp.x + halfSizeWidth;
      const y = this.leftUp.y + halfSizeHeight;
      return new Coordinate_ENGINE(x, y);
    })();
    const rightDown = (() => {
      const percentages = (() => {
        const lineReach = 120;
        const percentageCenter = 50;
        const lineScopeX = lineReach * this.direction.getNumberX();
        const lineScopeY = lineReach * this.direction.getNumberY();
        return new Size_ENGINE(lineScopeX + percentageCenter, lineScopeY + percentageCenter);
      })();
      return this.leftUpPlusSizePercentages(percentages);
    })();
    this.lineSight.setPosition(leftUp, rightDown);
  }
  moveSheep() {
    this.lineSightPosition();
    const moved = this.movedCharacter();
    if (moved === false)
      return;
    const lineSightCollisionMap = this.map.collisionMap(this.leftUp, this.lineSight.rightDown());
    if (lineSightCollisionMap !== false) {
      this.leftUp.x = lineSightCollisionMap.x;
      this.leftUp.y = lineSightCollisionMap.y;
      const random1 = Math.round(Math.random());
      const random2 = Math.round(Math.random());
      this.direction.setX(random1 === 0 ? "left" : "right");
      this.direction.setY(random2 === 0 ? "up" : "down");
      const random3 = Math.round(Math.random() * 2);
      if (random3 === 0)
        this.direction.setY("center");
      else if (random3 === 1)
        this.direction.setX("center");
      return;
    }
    console.log("MOVED", moved);
    this.leftUp.x = moved.x;
    this.leftUp.y = moved.y;
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
    let character3 = this.states[this.state];
    if (this.animations.element.getIndices().vertical === character3.element.indices.vertical)
      return;
    this.animations.element.setIndices(new Plane_ENGINE(character3.element.indices.horizontal, character3.element.indices.vertical));
    this.animations.animation.frames = character3.animation.frames;
    this.animations.animation.framesPerSecond = character3.animation.framesPerSecond;
  }
  imageAccordingDirectionMovement() {
    const directionX = this.direction.getX();
    if (directionX === "center")
      return;
    this.animations.route = `images/resources/sheep/${directionX}.png`;
  }
  drawSheep() {
    this.refreshState();
    this.moveSheep();
    this.jumpSheep();
    this.imageAccordingDirectionMovement();
    this.drawCharacter();
    this.lineSight.drawLine();
  }
}

// public/tsc/game/game.ts
class Game_ENGINE extends Scene_ENGINE {
  map;
  pawns = [];
  sheepGroup = [];
  constructor(canvas) {
    super(canvas);
    this.map = new Map_ENGINE(canvas);
    this.sheepGroup = [
      new Sheep_ENGINE(new Coordinate_ENGINE(35, 50), this.map, canvas)
    ];
  }
  tiktokGift(gift) {
    const exist = this.pawns.some((pawn2) => pawn2.nickname === gift.nickname);
    if (exist === true)
      return;
    this.pawns.push(new Pawn_ENGINE(new Coordinate_ENGINE(Math.floor(Math.random() * this.map.size.width), Math.floor(Math.random() * this.map.size.height)), this.map, this.canvas, "blue", gift.nickname));
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
  const canvas2 = new Canvas_ENGINE(new Coordinate_ENGINE(0, 0), 24);
  const game2 = new Game_ENGINE(canvas2);
  game2.start();
});
