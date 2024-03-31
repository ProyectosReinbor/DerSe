// public/tsc/engine/coordinate.ts
class Coordinate_ENGINE {
  x;
  y;
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
  }
  isEqualTo(props) {
    return this.x === props.coordinate.x && this.y === props.coordinate.y;
  }
}

// public/tsc/engine/position.ts
class Position_ENGINE {
  leftUp;
  size;
  constructor(props) {
    this.leftUp = props.leftUp;
    this.size = props.size;
  }
  get leftDown() {
    return new Coordinate_ENGINE({
      x: this.leftUp.x,
      y: this.leftUp.y + this.size.height
    });
  }
  get rightDown() {
    return new Coordinate_ENGINE({
      x: this.leftUp.x + this.size.width,
      y: this.leftUp.y + this.size.height
    });
  }
  get rightUp() {
    return new Coordinate_ENGINE({
      x: this.leftUp.x + this.size.width,
      y: this.leftUp.y
    });
  }
  leftUpPlusSizePercentages(props) {
    const size = this.size.getPercentages(props);
    return new Coordinate_ENGINE({
      x: this.leftUp.x + size.width,
      y: this.leftUp.y + size.height
    });
  }
  insidePositionCoordinate(props) {
    return this.leftUp.x <= props.coordinate.x && this.leftUp.y <= props.coordinate.y && this.rightDown.x >= props.coordinate.x && this.rightDown.y >= props.coordinate.y;
  }
  insidePosition(props) {
    return this.leftUp.x <= props.position.leftUp.x && this.leftUp.y <= props.position.leftUp.y && this.rightDown.x >= props.position.rightDown.x && this.rightDown.y >= props.position.rightDown.y;
  }
  someVertexInside(props) {
    if (this.insidePositionCoordinate({
      coordinate: props.position.leftUp
    }) === true)
      return true;
    if (this.insidePositionCoordinate({
      coordinate: props.position.leftDown
    }) === true)
      return true;
    if (this.insidePositionCoordinate({
      coordinate: props.position.rightUp
    }) === true)
      return true;
    if (this.insidePositionCoordinate({
      coordinate: props.position.rightDown
    }) === true)
      return true;
    return false;
  }
}

// public/tsc/engine/size.ts
class Size_ENGINE {
  width;
  height;
  constructor(props) {
    this.width = props.width;
    this.height = props.height;
  }
  get aPercent() {
    return new Size_ENGINE({
      width: this.width / 100,
      height: this.height / 100
    });
  }
  getPercentages(props) {
    return new Size_ENGINE({
      width: this.aPercent.width * props.percentages.width,
      height: this.aPercent.height * props.percentages.height
    });
  }
}

// public/tsc/engine/camera.ts
class Camera_ENGINE extends Position_ENGINE {
  constructor(props) {
    super({
      leftUp: props.leftUp,
      size: new Size_ENGINE({ width: 100, height: 100 })
    });
  }
  insideCamera(props) {
    const doubleSize = new Size_ENGINE({
      width: props.position.size.width * 2,
      height: props.position.size.height * 2
    });
    const vision = new Position_ENGINE({
      leftUp: new Coordinate_ENGINE({
        x: this.leftUp.x - props.position.size.width,
        y: this.leftUp.y - props.position.size.height
      }),
      size: new Size_ENGINE({
        width: this.size.width + doubleSize.width,
        height: this.size.height + doubleSize.height
      })
    });
    return vision.insidePosition({
      position: props.position
    });
  }
  positionOnCamera(props) {
    const insideCamera = this.insideCamera({
      position: props.position
    });
    if (insideCamera === false)
      return false;
    return new Position_ENGINE({
      leftUp: new Coordinate_ENGINE({
        x: props.position.leftUp.x - this.leftUp.x,
        y: props.position.leftUp.y - this.leftUp.y
      }),
      size: new Size_ENGINE({
        width: props.position.size.width,
        height: props.position.size.height
      })
    });
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
  routes = [];
  images = {};
  theImageExists(route) {
    if (route === false)
      return false;
    if (this.notFound.includes(route))
      throw new Error(`image ${route} is not found`);
    return this.images[route];
  }
  getImage(route) {
    const image = this.theImageExists(route);
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
      await this.uploadImage(route);
    }
  }
  uploadImage(route) {
    return new Promise((resolve) => {
      if (route === false)
        return resolve(false);
      const imageExists = this.theImageExists(route);
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
class Canvas_ENGINE extends Camera_ENGINE {
  aPercent = new Size_ENGINE({ width: 0, height: 0 });
  margin = new Size_ENGINE({ width: 0, height: 0 });
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
  constructor(props) {
    super({
      leftUp: props.leftUp
    });
    this.setFramesPerSecond({
      value: props.framesPerSecond
    });
    this.element = window.document.getElementById("canvas");
    this.context = this.element.getContext("2d");
    this.aspectRatio();
    window.addEventListener("resize", () => this.aspectRatio());
    this.element.addEventListener("touchstart", (event) => this.touchstartCanvas({
      event
    }));
    this.element.addEventListener("touchmove", (event) => this.touchmoveCanvas({
      event
    }));
    this.element.addEventListener("touchend", (event) => this.touchendCanvas({
      event
    }));
    this.nextFrame({
      time: 0
    });
  }
  getFramesPerSecond() {
    return 1000 / this.intervalBetweenFrames;
  }
  setFramesPerSecond(props) {
    this.intervalBetweenFrames = 1000 / props.value;
  }
  nextFrame(props) {
    const difference = props.time - this.time;
    if (difference < this.intervalBetweenFrames) {
      requestAnimationFrame((time) => this.nextFrame({
        time
      }));
      return;
    }
    this.timeBetweenFrames = difference;
    this.time = props.time;
    this.drawCanvas();
    requestAnimationFrame((time) => this.nextFrame({
      time
    }));
  }
  async start(props) {
    await this.images.loadAll();
    this.drawScene = props.drawScene;
    this.touchstartScene = props.touchstartScene;
    this.touchmoveScene = props.touchmoveScene;
    this.touchendScene = props.touchendScene;
  }
  drawCanvas() {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
    this.drawScene();
  }
  aspectRatio() {
    const screen = new window.Screen;
    const ratio = 0.5625;
    this.element.width = screen.width;
    this.element.height = screen.height * ratio;
    if (this.element.height > screen.height) {
      const ratio2 = 1.7777777777777777;
      this.element.height = screen.height;
      this.element.width = screen.height * ratio2;
    }
    this.margin.width = screen.width - this.element.width;
    this.margin.height = screen.height - this.element.height;
    this.element.style.left = `${this.margin.width / 2}px`;
    this.element.style.top = `${this.margin.height / 2}px`;
    this.aPercent.width = this.element.width / 100;
    this.aPercent.height = this.element.height / 100;
  }
  getTouchCoordinate(props) {
    if (props.touch === null)
      return false;
    const left = this.margin.width / 2;
    const top = this.margin.height / 2;
    return new Coordinate_ENGINE({
      x: props.touch.pageX - left,
      y: props.touch.pageY - top
    });
  }
  touchstartCanvas(props) {
    props.event.preventDefault();
    for (let index = 0;index < props.event.changedTouches.length; index++) {
      const touch = props.event.changedTouches.item(index);
      const coordinate4 = this.getTouchCoordinate({
        touch
      });
      if (coordinate4 === false)
        continue;
      this.touchstartScene(coordinate4);
    }
  }
  touchmoveCanvas(props) {
    props.event.preventDefault();
    for (let index = 0;index < props.event.changedTouches.length; index++) {
      const touch = props.event.changedTouches.item(index);
      const coordinate4 = this.getTouchCoordinate({ touch });
      if (coordinate4 === false)
        continue;
      this.touchmoveScene(coordinate4);
    }
  }
  touchendCanvas(props) {
    props.event.preventDefault();
    for (let index = 0;index < props.event.changedTouches.length; index++) {
      const touch = props.event.changedTouches.item(index);
      const coordinate4 = this.getTouchCoordinate({
        touch
      });
      if (coordinate4 === false)
        continue;
      this.touchendScene(coordinate4);
    }
  }
  positionOnCanvas(props) {
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
        })
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
  getWidthInPercentages(props) {
    return props.pixels / this.aPercent.width;
  }
  getWidthInPixels(props) {
    return props.percentage * this.aPercent.width;
  }
  getHeightInPercentages(props) {
    return props.pixels / this.aPercent.height;
  }
  getHeightInPixels(props) {
    return props.percentage * this.aPercent.height;
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
  constructor(props) {
    this.canvas = props.canvas;
  }
  async start() {
    await this.canvas.start({
      drawScene: () => this.draw(),
      touchstartScene: (touch) => this.touchstart(touch),
      touchmoveScene: (touch) => this.touchmove(touch),
      touchendScene: (touch) => this.touchend(touch)
    });
  }
}

// public/tsc/engine/plane.ts
class Plane_ENGINE {
  horizontal;
  vertical;
  constructor(props) {
    this.horizontal = props.horizontal;
    this.vertical = props.vertical;
  }
}

// public/tsc/game/mapMatrix.ts
class MapMatrix_ENGINE {
  static length = new Plane_ENGINE({
    horizontal: 21,
    vertical: 21
  });
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
  static getFloor0Box(props) {
    const box = MapMatrix_ENGINE.getEmptyBox();
    box.water = true;
    if (props.boxIndices.vertical >= 3 && props.boxIndices.vertical <= 19 && props.boxIndices.horizontal >= 1 && props.boxIndices.horizontal <= 19)
      box.foam = {
        flatSand: true
      };
    if (props.boxIndices.vertical === 14 && props.boxIndices.horizontal >= 11 && props.boxIndices.horizontal <= 13)
      box.stairElevation = {
        shadow: true,
        flatElevation: props.boxIndices.horizontal === 11 ? "sand" : false
      };
    return box;
  }
  static getFloor1Box(props) {
    const box = MapMatrix_ENGINE.getEmptyBox();
    if (props.boxIndices.horizontal >= 2 && props.boxIndices.horizontal <= 17 && props.boxIndices.vertical >= 2 && props.boxIndices.vertical <= 13)
      box.elevation = {
        floor: 1,
        shadow: props.boxIndices.vertical >= 3,
        flatGrass: true
      };
    if (props.boxIndices.horizontal >= 2 && props.boxIndices.horizontal <= 10 && props.boxIndices.vertical === 14)
      box.elevation = {
        floor: 1,
        shadow: true,
        flatGrass: true
      };
    if (props.boxIndices.horizontal >= 14 && props.boxIndices.horizontal <= 17 && props.boxIndices.vertical === 14)
      box.elevation = {
        floor: 1,
        shadow: true,
        flatGrass: true
      };
    if (props.boxIndices.vertical === 15 && props.boxIndices.horizontal >= 2 && props.boxIndices.horizontal <= 10) {
      const flatElevationRandom = Math.round(Math.random());
      box.wallElevation = {
        shadow: true,
        flatElevation: flatElevationRandom === 0 ? "sand" : false
      };
    }
    if (props.boxIndices.vertical === 15 && props.boxIndices.horizontal >= 14 && props.boxIndices.horizontal <= 17) {
      const flatElevationRandom = Math.round(Math.random());
      box.wallElevation = {
        shadow: true,
        flatElevation: flatElevationRandom === 0 ? "sand" : false
      };
    }
    if (props.boxIndices.vertical === 7 && props.boxIndices.horizontal >= 11 && props.boxIndices.horizontal <= 13) {
      box.stairElevation = {
        shadow: true,
        flatElevation: props.boxIndices.horizontal === 9 ? "grass" : false
      };
    }
    if (props.boxIndices.vertical === 3 && props.boxIndices.horizontal === 14) {
      box.trees = {
        animation: "felled"
      };
    }
    return box;
  }
  static getFloor2Box(props) {
    const box = MapMatrix_ENGINE.getEmptyBox();
    if (props.boxIndices.horizontal >= 6 && props.boxIndices.horizontal <= 14 && props.boxIndices.vertical >= 1 && props.boxIndices.vertical <= 6) {
      box.elevation = {
        floor: 2,
        shadow: props.boxIndices.vertical >= 3,
        flatGrass: true
      };
    }
    if (props.boxIndices.horizontal >= 6 && props.boxIndices.horizontal <= 10 && props.boxIndices.vertical === 7) {
      box.elevation = {
        floor: 2,
        shadow: true,
        flatGrass: true
      };
    }
    if (props.boxIndices.horizontal >= 14 && props.boxIndices.horizontal <= 14 && props.boxIndices.vertical === 7) {
      box.elevation = {
        floor: 2,
        shadow: true,
        flatGrass: true
      };
    }
    if (props.boxIndices.vertical === 8 && props.boxIndices.horizontal >= 6 && props.boxIndices.horizontal <= 10) {
      const flatElevationRandom = Math.round(Math.random());
      box.wallElevation = {
        shadow: true,
        flatElevation: flatElevationRandom === 0 ? "grass" : false
      };
    }
    if (props.boxIndices.vertical === 8 && props.boxIndices.horizontal === 14) {
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
      const boxIndices = new Plane_ENGINE({
        horizontal: 0,
        vertical: 0
      });
      for (boxIndices.vertical = 0;boxIndices.vertical < MapMatrix_ENGINE.length.vertical; boxIndices.vertical++) {
        floorMatrix[boxIndices.vertical] = [];
        const row = floorMatrix[boxIndices.vertical];
        if (row === undefined)
          continue;
        for (boxIndices.horizontal = 0;boxIndices.horizontal < MapMatrix_ENGINE.length.horizontal; boxIndices.horizontal++) {
          const getBoxFloor = MapMatrix_ENGINE.getBoxFloors[floor];
          if (getBoxFloor === undefined)
            continue;
          row[boxIndices.horizontal] = getBoxFloor({
            boxIndices
          });
        }
      }
    }
    return map;
  }
}

// public/tsc/engine/element.ts
class Element_ENGINE extends Position_ENGINE {
  constructor(props) {
    super({
      leftUp: new Coordinate_ENGINE({ x: 0, y: 0 }),
      size: props.size
    });
    this.setIndices(props.indices);
  }
  setIndices(newIndices) {
    this.leftUp.x = this.size.width * newIndices.horizontal;
    this.leftUp.y = this.size.height * newIndices.vertical;
  }
  getIndices() {
    return new Plane_ENGINE({
      horizontal: this.leftUp.x / this.size.width,
      vertical: this.leftUp.y / this.size.height
    });
  }
  nextFrame(frames) {
    this.setIndices(new Plane_ENGINE({
      horizontal: this.getIndices().horizontal + 1,
      vertical: this.getIndices().vertical
    }));
    if (this.getIndices().horizontal >= frames)
      this.setIndices(new Plane_ENGINE({
        horizontal: 0,
        vertical: this.getIndices().vertical
      }));
  }
}

// public/tsc/engine/image.ts
class Image_ENGINE extends Position_ENGINE {
  canvas;
  route;
  reflected;
  constructor(props) {
    super(props);
    this.canvas = props.canvas;
    this.route = props.route;
    this.canvas.images;
    this.canvas.images.addRoute(this.route);
    this.reflected = true;
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
    const positionOnTheCanvas = this.canvas.positionOnCanvas({
      position: this
    });
    if (positionOnTheCanvas === false)
      return;
    if (this.reflected === true) {
      this.canvas.context.scale(-1, 1);
    }
    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(image, positionOnTheCanvas.leftUp.x, positionOnTheCanvas.leftUp.y, positionOnTheCanvas.size.width, positionOnTheCanvas.size.height);
  }
}

// public/tsc/engine/elements.ts
class Elements_ENGINE extends Image_ENGINE {
  element;
  constructor(props) {
    super(props);
    this.element = props.element;
  }
  drawElement() {
    const image2 = this.image;
    if (image2 === false)
      return;
    const positionOnCanvas = this.canvas.positionOnCanvas({
      position: this
    });
    if (positionOnCanvas === false)
      return;
    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(image2, this.element.leftUp.x, this.element.leftUp.y, this.element.size.width, this.element.size.height, positionOnCanvas.leftUp.x, positionOnCanvas.leftUp.y, positionOnCanvas.size.width, positionOnCanvas.size.height);
  }
}

// public/tsc/engine/box.ts
class Box_ENGINE extends Position_ENGINE {
  referenceIndex;
  constructor(props) {
    super(props);
    this.referenceIndex = props.referenceIndex;
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
  constructor(props) {
    super({
      x: props.x,
      y: props.y
    });
    this.canvas = props.canvas;
    this.size = props.size;
    this.length = props.length;
    this.occupied = props.occupied;
  }
  collision(props) {
    const size4 = new Size_ENGINE({
      width: this.size.width * props.character.address.x,
      height: this.size.height * props.character.address.y
    });
    const leftUp = new Coordinate_ENGINE({
      x: props.character.leftUp.x + size4.width,
      y: props.character.leftUp.y + size4.height
    });
    const rightDown = new Coordinate_ENGINE({
      x: props.character.rightDown.x + size4.width,
      y: props.character.rightDown.y + size4.height
    });
    const boxIndicesLeftUp = this.getBoxIndices({
      coordinate: leftUp
    });
    const boxIndicesRightDown = this.getBoxIndices({
      coordinate: rightDown
    });
    const boxIndices = new Plane_ENGINE({
      horizontal: 0,
      vertical: 0
    });
    for (boxIndices.vertical = boxIndicesLeftUp.vertical;boxIndices.vertical <= boxIndicesRightDown.vertical; boxIndices.vertical++) {
      for (boxIndices.horizontal = boxIndicesLeftUp.horizontal;boxIndices.horizontal <= boxIndicesRightDown.horizontal; boxIndices.horizontal++) {
        const box2 = this.getBox({ boxIndices });
        if (box2 === undefined)
          continue;
        if (box2.someVertexInside({ position: props.character }) === false)
          continue;
        return box2;
      }
    }
    return false;
  }
  getPosition(props) {
    return new Position_ENGINE({
      leftUp: new Coordinate_ENGINE({
        x: props.boxIndices.horizontal * this.size.width,
        y: props.boxIndices.vertical * this.size.height
      }),
      size: new Size_ENGINE({
        width: this.size.width * this.length.horizontal,
        height: this.size.height * this.length.vertical
      })
    });
  }
  getBox(props) {
    const boxesRow = this.boxes[props.boxIndices.vertical];
    if (boxesRow === undefined)
      return;
    const box2 = boxesRow[props.boxIndices.horizontal];
    return box2;
  }
  getBoxIndices(props) {
    const horizontal = Math.floor(props.coordinate.x / this.size.width);
    const vertical = Math.floor(props.coordinate.y / this.size.height);
    return new Plane_ENGINE({
      horizontal,
      vertical
    });
  }
  boxesIndices(props) {
    let row = this.boxes[props.boxIndices.vertical];
    if (row === undefined)
      row = [];
    row[props.boxIndices.horizontal] = props.box;
    this.boxes[props.boxIndices.vertical] = row;
  }
  setBox(props) {
    const size4 = new Size_ENGINE({
      width: this.size.width,
      height: this.size.height
    });
    const distanceX = props.boxIndices.horizontal * size4.width;
    const distanceY = props.boxIndices.vertical * size4.height;
    const box2 = new Box_ENGINE({
      leftUp: new Coordinate_ENGINE({
        x: this.x + distanceX,
        y: this.y + distanceY
      }),
      size: size4,
      referenceIndex: props.referenceIndex
    });
    this.boxesIndices({
      boxIndices: props.boxIndices,
      box: box2
    });
  }
  occupiedBoxes(props) {
    const boxIndices = new Plane_ENGINE({
      horizontal: props.boxIndices.horizontal + props.occupiedIndices.vertical,
      vertical: props.boxIndices.vertical + props.occupiedIndices.horizontal
    });
    let boxesRow = this.boxes[boxIndices.vertical];
    if (boxesRow === undefined)
      boxesRow = [];
    let box2 = this.getBox({ boxIndices });
    if (box2 !== undefined)
      return;
    this.setBox({
      boxIndices,
      referenceIndex: props.referenceIndex
    });
  }
  referencePush(props) {
    const reference = this.getPosition({
      boxIndices: props.boxIndices
    });
    const referenceIndex = this.referencesPush({
      boxIndices: props.boxIndices,
      reference
    });
    if (referenceIndex === undefined)
      return;
    return this.references[referenceIndex];
  }
  referencesPush(props) {
    const box2 = this.getBox({
      boxIndices: props.boxIndices
    });
    if (box2 !== undefined)
      return;
    this.references.push(props.reference);
    const referenceIndex = this.references.length - 1;
    if (this.occupied === true) {
      for (let vertical = 0;vertical < this.length.vertical; vertical++) {
        for (let horizontal = 0;horizontal < this.length.horizontal; horizontal++) {
          this.occupiedBoxes({
            boxIndices: props.boxIndices,
            occupiedIndices: new Plane_ENGINE({
              horizontal,
              vertical
            }),
            referenceIndex
          });
        }
      }
    } else {
      this.occupied.forEach((row, vertical) => {
        row.forEach((value, horizontal) => {
          if (value === false)
            return;
          this.occupiedBoxes({
            boxIndices: props.boxIndices,
            occupiedIndices: new Plane_ENGINE({
              horizontal,
              vertical
            }),
            referenceIndex
          });
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
  constructor(props) {
    super({
      x: props.x,
      y: props.y,
      canvas: props.canvas,
      size: props.size,
      length: props.length,
      occupied: props.occupied
    });
    this.route = props.route;
  }
  referencePush(props) {
    const position7 = this.getPosition({
      boxIndices: props.boxIndices
    });
    const reference = new Image_ENGINE({
      leftUp: position7.leftUp,
      size: position7.size,
      canvas: this.canvas,
      route: this.route
    });
    const indexReference = this.referencesPush({
      boxIndices: props.boxIndices,
      reference
    });
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
  constructor(props) {
    super({
      x: props.x,
      y: props.y,
      canvas: props.canvas,
      size: props.size,
      length: props.length,
      occupied: props.occupied,
      route: props.route
    });
    this.element = props.element;
  }
  referencePush(props) {
    const position7 = this.getPosition({
      boxIndices: props.boxIndices
    });
    const reference = new Elements_ENGINE({
      leftUp: position7.leftUp,
      size: position7.size,
      canvas: this.canvas,
      route: this.route,
      element: new Element_ENGINE({
        size: new Size_ENGINE({
          width: this.element.size.width,
          height: this.element.size.height
        }),
        indices: new Plane_ENGINE({
          horizontal: this.element.getIndices().horizontal,
          vertical: this.element.getIndices().vertical
        })
      })
    });
    const indexReference = this.referencesPush({
      boxIndices: props.boxIndices,
      reference
    });
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
  constructor(props) {
    super({
      x: props.map.leftUp.x,
      y: props.map.leftUp.y,
      canvas: props.canvas,
      size: new Size_ENGINE({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane_ENGINE({
        horizontal: 1,
        vertical: 1
      }),
      occupied: true,
      route: props.route,
      element: new Element_ENGINE({
        size: new Size_ENGINE({
          width: 64,
          height: 64
        }),
        indices: props.elementIndices.only
      })
    });
    this.elementIndices = props.elementIndices;
  }
  refreshElements() {
    this.references.forEach((elements2) => {
      const boxIndices = this.getBoxIndices({
        coordinate: elements2.leftUp
      });
      const groundPosition = this.groundPosition({
        boxIndices
      });
      const indices = this.elementIndices[groundPosition];
      elements2.element.setIndices(new Plane_ENGINE({
        horizontal: indices.horizontal,
        vertical: indices.vertical
      }));
    });
  }
  pushGround(props) {
    const ground = this.referencePush({
      boxIndices: props.boxIndices
    });
    this.refreshElements();
    return ground;
  }
  groundPosition(props) {
    const leftBoxes = new Plane_ENGINE({
      horizontal: props.boxIndices.horizontal - 1,
      vertical: props.boxIndices.vertical
    });
    const rightBoxes = new Plane_ENGINE({
      horizontal: props.boxIndices.horizontal + 1,
      vertical: props.boxIndices.vertical
    });
    const upBoxes = new Plane_ENGINE({
      horizontal: props.boxIndices.horizontal,
      vertical: props.boxIndices.vertical - 1
    });
    const downBoxes = new Plane_ENGINE({
      horizontal: props.boxIndices.horizontal,
      vertical: props.boxIndices.vertical + 1
    });
    const left = this.getBox({
      boxIndices: leftBoxes
    }) !== undefined;
    const right = this.getBox({
      boxIndices: rightBoxes
    }) !== undefined;
    const up = this.getBox({
      boxIndices: upBoxes
    }) !== undefined;
    const down = this.getBox({
      boxIndices: downBoxes
    }) !== undefined;
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
  constructor(props) {
    super({
      canvas: props.canvas,
      map: props.map,
      route: "images/terrain/ground/flat.png",
      elementIndices: {
        leftUp: new Plane_ENGINE({
          horizontal: 5,
          vertical: 0
        }),
        up: new Plane_ENGINE({
          horizontal: 6,
          vertical: 0
        }),
        rightUp: new Plane_ENGINE({
          horizontal: 7,
          vertical: 0
        }),
        left: new Plane_ENGINE({
          horizontal: 5,
          vertical: 1
        }),
        center: new Plane_ENGINE({
          horizontal: 6,
          vertical: 1
        }),
        right: new Plane_ENGINE({
          horizontal: 7,
          vertical: 1
        }),
        leftDown: new Plane_ENGINE({
          horizontal: 5,
          vertical: 2
        }),
        down: new Plane_ENGINE({
          horizontal: 6,
          vertical: 2
        }),
        rightDown: new Plane_ENGINE({
          horizontal: 7,
          vertical: 2
        }),
        horizontalLeft: new Plane_ENGINE({
          horizontal: 5,
          vertical: 3
        }),
        horizontalCenter: new Plane_ENGINE({
          horizontal: 6,
          vertical: 3
        }),
        horizontalRight: new Plane_ENGINE({
          horizontal: 7,
          vertical: 3
        }),
        verticalUp: new Plane_ENGINE({
          horizontal: 8,
          vertical: 0
        }),
        verticalCenter: new Plane_ENGINE({
          horizontal: 8,
          vertical: 1
        }),
        verticalDown: new Plane_ENGINE({
          horizontal: 8,
          vertical: 2
        }),
        only: new Plane_ENGINE({
          horizontal: 8,
          vertical: 3
        })
      }
    });
  }
  pushFlatSand(props) {
    return this.pushGround({
      boxIndices: props.boxIndices
    });
  }
  drawFlatsSand() {
    this.drawGrounds();
  }
}

// public/tsc/game/map/elevations.ts
class Elevations_ENGINE extends Grounds_ENGINE {
  constructor(props) {
    super({
      canvas: props.canvas,
      map: props.map,
      route: "images/terrain/ground/elevation.png",
      elementIndices: {
        leftUp: new Plane_ENGINE({
          horizontal: 0,
          vertical: 0
        }),
        up: new Plane_ENGINE({
          horizontal: 1,
          vertical: 0
        }),
        rightUp: new Plane_ENGINE({
          horizontal: 2,
          vertical: 0
        }),
        left: new Plane_ENGINE({
          horizontal: 0,
          vertical: 1
        }),
        center: new Plane_ENGINE({
          horizontal: 1,
          vertical: 1
        }),
        right: new Plane_ENGINE({
          horizontal: 2,
          vertical: 1
        }),
        leftDown: new Plane_ENGINE({
          horizontal: 0,
          vertical: 2
        }),
        down: new Plane_ENGINE({
          horizontal: 1,
          vertical: 2
        }),
        rightDown: new Plane_ENGINE({
          horizontal: 2,
          vertical: 2
        }),
        horizontalLeft: new Plane_ENGINE({
          horizontal: 0,
          vertical: 4
        }),
        horizontalCenter: new Plane_ENGINE({
          horizontal: 1,
          vertical: 4
        }),
        horizontalRight: new Plane_ENGINE({
          horizontal: 2,
          vertical: 4
        }),
        verticalUp: new Plane_ENGINE({
          horizontal: 3,
          vertical: 0
        }),
        verticalCenter: new Plane_ENGINE({
          horizontal: 3,
          vertical: 1
        }),
        verticalDown: new Plane_ENGINE({
          horizontal: 3,
          vertical: 2
        }),
        only: new Plane_ENGINE({
          horizontal: 3,
          vertical: 4
        })
      }
    });
  }
  pushElevation(props) {
    this.pushGround({
      boxIndices: props.boxIndices
    });
  }
  drawElevations() {
    this.drawGrounds();
  }
}

// public/tsc/game/map/wallElevations.ts
class WallElevations_ENGINE extends ElementBoxes_ENGINE {
  elementIndices;
  constructor(props) {
    super({
      x: props.map.leftUp.x,
      y: props.map.leftUp.y,
      canvas: props.canvas,
      size: new Size_ENGINE({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane_ENGINE({
        horizontal: 1,
        vertical: 1
      }),
      occupied: true,
      route: "images/terrain/ground/elevation.png",
      element: new Element_ENGINE({
        size: new Size_ENGINE({
          width: 64,
          height: 64
        }),
        indices: new Plane_ENGINE({
          horizontal: 0,
          vertical: 0
        })
      })
    });
    this.elementIndices = {
      left: new Plane_ENGINE({
        horizontal: 0,
        vertical: 3
      }),
      center: new Plane_ENGINE({
        horizontal: 1,
        vertical: 3
      }),
      right: new Plane_ENGINE({
        horizontal: 2,
        vertical: 3
      }),
      only: new Plane_ENGINE({
        horizontal: 3,
        vertical: 5
      })
    };
  }
  wallElevationPosition(props) {
    const leftBoxes = new Plane_ENGINE({
      horizontal: props.boxIndices.horizontal - 1,
      vertical: props.boxIndices.vertical
    });
    const rightBoxes = new Plane_ENGINE({
      horizontal: props.boxIndices.horizontal + 1,
      vertical: props.boxIndices.vertical
    });
    const left = this.getBox({
      boxIndices: leftBoxes
    }) !== undefined;
    const right = this.getBox({
      boxIndices: rightBoxes
    }) !== undefined;
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
      const boxIndices = this.getBoxIndices({
        coordinate: elements2.leftUp
      });
      const position7 = this.wallElevationPosition({
        boxIndices
      });
      const indices = this.elementIndices[position7];
      elements2.element.setIndices(new Plane_ENGINE({
        horizontal: indices.horizontal,
        vertical: indices.vertical
      }));
    });
  }
  pushWallElevation(props) {
    const wallElevation = this.referencePush({
      boxIndices: props.boxIndices
    });
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
  constructor(props) {
    super({
      leftUp: props.leftUp,
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
class Castles_ENGINE extends ImageBoxes_ENGINE {
  references = [];
  constructor(props) {
    super({
      x: props.map.leftUp.x,
      y: props.map.leftUp.y,
      canvas: props.canvas,
      size: new Size_ENGINE({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane_ENGINE({
        horizontal: 4,
        vertical: 3
      }),
      occupied: true,
      route: false
    });
  }
  castlePush(props) {
    const position7 = this.getPosition({
      boxIndices: props.boxIndices
    });
    const reference = new Castle_ENGINE({
      leftUp: position7.leftUp,
      size: position7.size,
      canvas: this.canvas,
      state: props.state,
      color: props.color
    });
    const indexReference = this.referencesPush({
      boxIndices: props.boxIndices,
      reference
    });
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
  constructor(props) {
    super({
      x: props.map.leftUp.x,
      y: props.map.leftUp.y,
      canvas: props.canvas,
      size: new Size_ENGINE({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane_ENGINE({
        horizontal: 1,
        vertical: 1
      }),
      occupied: true,
      route: "images/terrain/water/water.png"
    });
  }
  pushWater(props) {
    return this.referencePush({
      boxIndices: props.boxIndices
    });
  }
  drawWater() {
    this.drawImages();
  }
}

// public/tsc/engine/animation.ts
class Animation_ENGINE {
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
class Animations_ENGINE extends Elements_ENGINE {
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
class AnimationBoxes_ENGINE extends ElementBoxes_ENGINE {
  references = [];
  animation;
  constructor(props) {
    super({
      x: props.x,
      y: props.y,
      canvas: props.canvas,
      size: props.size,
      length: props.length,
      occupied: props.occupied,
      route: props.route,
      element: props.element
    });
    this.animation = props.animation;
  }
  referencePush(props) {
    const position7 = this.getPosition({
      boxIndices: props.boxIndices
    });
    const reference = new Animations_ENGINE({
      leftUp: position7.leftUp,
      size: position7.size,
      canvas: this.canvas,
      route: this.route,
      element: new Element_ENGINE({
        size: new Size_ENGINE({
          width: this.element.size.width,
          height: this.element.size.height
        }),
        indices: new Plane_ENGINE({
          horizontal: 0,
          vertical: this.element.getIndices().vertical
        })
      }),
      animation: new Animation_ENGINE({
        frames: this.animation.frames,
        framesPerSecond: this.animation.framesPerSecond
      })
    });
    const indexReference = this.referencesPush({
      boxIndices: props.boxIndices,
      reference
    });
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
  constructor(props) {
    super({
      x: props.map.leftUp.x,
      y: props.map.leftUp.y,
      canvas: props.canvas,
      size: new Size_ENGINE({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane_ENGINE({
        horizontal: 3,
        vertical: 3
      }),
      occupied: [
        [true, false, false],
        [false, false, false],
        [false, false, false]
      ],
      route: "images/terrain/water/foam.png",
      element: new Element_ENGINE({
        size: new Size_ENGINE({
          width: 192,
          height: 192
        }),
        indices: new Plane_ENGINE({
          horizontal: 0,
          vertical: 0
        })
      }),
      animation: new Animation_ENGINE({
        frames: 8,
        framesPerSecond: 8
      })
    });
  }
  pushFoam(props) {
    const foam = this.referencePush({
      boxIndices: props.boxIndices
    });
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
  constructor(props) {
    super({
      canvas: props.canvas,
      map: props.map,
      route: "images/terrain/ground/flat.png",
      elementIndices: {
        leftUp: new Plane_ENGINE({
          horizontal: 0,
          vertical: 0
        }),
        up: new Plane_ENGINE({
          horizontal: 1,
          vertical: 0
        }),
        rightUp: new Plane_ENGINE({
          horizontal: 2,
          vertical: 0
        }),
        left: new Plane_ENGINE({
          horizontal: 0,
          vertical: 1
        }),
        center: new Plane_ENGINE({
          horizontal: 1,
          vertical: 1
        }),
        right: new Plane_ENGINE({
          horizontal: 2,
          vertical: 1
        }),
        leftDown: new Plane_ENGINE({
          horizontal: 0,
          vertical: 2
        }),
        down: new Plane_ENGINE({
          horizontal: 1,
          vertical: 2
        }),
        rightDown: new Plane_ENGINE({
          horizontal: 2,
          vertical: 2
        }),
        horizontalLeft: new Plane_ENGINE({
          horizontal: 0,
          vertical: 3
        }),
        horizontalCenter: new Plane_ENGINE({
          horizontal: 1,
          vertical: 3
        }),
        horizontalRight: new Plane_ENGINE({
          horizontal: 2,
          vertical: 3
        }),
        verticalUp: new Plane_ENGINE({
          horizontal: 3,
          vertical: 0
        }),
        verticalCenter: new Plane_ENGINE({
          horizontal: 3,
          vertical: 1
        }),
        verticalDown: new Plane_ENGINE({
          horizontal: 3,
          vertical: 2
        }),
        only: new Plane_ENGINE({
          horizontal: 3,
          vertical: 3
        })
      }
    });
  }
  pushFlatGrass(props) {
    return this.pushGround({
      boxIndices: props.boxIndices
    });
  }
  drawFlatsGrass() {
    this.drawGrounds();
  }
}

// public/tsc/game/map/shadows.ts
class Shadows_ENGINE extends ImageBoxes_ENGINE {
  constructor(props) {
    super({
      x: props.map.leftUp.x,
      y: props.map.leftUp.y,
      canvas: props.canvas,
      size: new Size_ENGINE({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane_ENGINE({
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
  pushShadow(props) {
    const shadow = this.referencePush({
      boxIndices: props.boxIndices
    });
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
  constructor(props) {
    super({
      x: props.map.leftUp.x,
      y: props.map.leftUp.y,
      canvas: props.canvas,
      size: new Size_ENGINE({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane_ENGINE({
        horizontal: 1,
        vertical: 1
      }),
      occupied: true,
      route: "images/terrain/ground/elevation.png",
      element: new Element_ENGINE({
        size: new Size_ENGINE({
          width: 64,
          height: 64
        }),
        indices: new Plane_ENGINE({
          horizontal: 0,
          vertical: 0
        })
      })
    });
    this.elementIndices = {
      left: new Plane_ENGINE({
        horizontal: 0,
        vertical: 7
      }),
      center: new Plane_ENGINE({
        horizontal: 1,
        vertical: 7
      }),
      right: new Plane_ENGINE({
        horizontal: 2,
        vertical: 7
      }),
      only: new Plane_ENGINE({
        horizontal: 3,
        vertical: 7
      })
    };
  }
  positionStairElevation(props) {
    const leftBoxIndices = new Plane_ENGINE({
      horizontal: props.boxIndices.horizontal - 1,
      vertical: props.boxIndices.vertical
    });
    const rightBoxIndices = new Plane_ENGINE({
      horizontal: props.boxIndices.horizontal + 1,
      vertical: props.boxIndices.vertical
    });
    const left = this.getBox({
      boxIndices: leftBoxIndices
    }) !== undefined;
    const right = this.getBox({
      boxIndices: rightBoxIndices
    }) !== undefined;
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
      const boxIndices = this.getBoxIndices({
        coordinate: elements3.leftUp
      });
      const position7 = this.positionStairElevation({
        boxIndices
      });
      const indices = this.elementIndices[position7];
      elements3.element.setIndices(new Plane_ENGINE({
        horizontal: indices.horizontal,
        vertical: indices.vertical
      }));
    });
  }
  setStairsElevations(props) {
    const stairElevation = this.referencePush({
      boxIndices: props.boxIndices
    });
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
  constructor(props) {
    super({
      x: props.map.leftUp.x,
      y: props.map.leftUp.y,
      canvas: props.canvas,
      size: new Size_ENGINE({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane_ENGINE({
        horizontal: 1,
        vertical: 1
      }),
      occupied: true,
      route: "images/terrain/ground/flat.png",
      element: new Element_ENGINE({
        size: new Size_ENGINE({
          width: 64,
          height: 64
        }),
        indices: new Plane_ENGINE({
          horizontal: 0,
          vertical: 0
        })
      })
    });
    this.elementIndices = {
      grass: new Plane_ENGINE({
        horizontal: 4,
        vertical: 0
      }),
      sand: new Plane_ENGINE({
        horizontal: 9,
        vertical: 0
      })
    };
  }
  pushFlatElevation(props) {
    const indices = this.elementIndices[props.state];
    this.element.setIndices(new Plane_ENGINE({
      horizontal: indices.horizontal,
      vertical: indices.vertical
    }));
    return this.referencePush({
      boxIndices: props.boxIndices
    });
  }
  drawFlatElevations() {
    this.drawElements();
  }
}

// public/tsc/game/map/trees.ts
class Trees_ENGINE extends AnimationBoxes_ENGINE {
  states;
  constructor(props) {
    super({
      x: props.map.leftUp.x,
      y: props.map.leftUp.y,
      canvas: props.canvas,
      size: new Size_ENGINE({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      length: new Plane_ENGINE({
        horizontal: 3,
        vertical: 3
      }),
      occupied: [
        [true, false, false],
        [true, false, false],
        [false, false, false]
      ],
      route: "images/resources/tree.png",
      element: new Element_ENGINE({
        size: new Size_ENGINE({
          width: 192,
          height: 192
        }),
        indices: new Plane_ENGINE({
          horizontal: 0,
          vertical: 0
        })
      }),
      animation: new Animation_ENGINE({
        frames: 4,
        framesPerSecond: 4
      })
    });
    this.states = {
      motion: {
        animation: new Animation_ENGINE({
          frames: 4,
          framesPerSecond: 4
        }),
        element: {
          indices: new Plane_ENGINE({ horizontal: 0, vertical: 0 })
        }
      },
      attacked: {
        animation: new Animation_ENGINE({
          frames: 2,
          framesPerSecond: 2
        }),
        element: {
          indices: new Plane_ENGINE({ horizontal: 0, vertical: 1 })
        }
      },
      felled: {
        animation: new Animation_ENGINE({
          frames: 1,
          framesPerSecond: 1
        }),
        element: {
          indices: new Plane_ENGINE({ horizontal: 0, vertical: 2 })
        }
      }
    };
  }
  pushTree(props) {
    const tree = this.states[props.state];
    const animations2 = this.referencePush({
      boxIndices: props.boxIndices
    });
    if (animations2 === undefined)
      return;
    animations2.element.setIndices(new Plane_ENGINE({
      horizontal: tree.element.indices.horizontal,
      vertical: tree.element.indices.vertical
    }));
    animations2.animation = new Animation_ENGINE({
      frames: tree.animation.frames,
      framesPerSecond: tree.animation.framesPerSecond
    });
    return animations2;
  }
  drawTrees() {
    this.drawAnimations();
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
  constructor(props) {
    this.map = props.map;
    this.canvas = props.canvas;
    this.water = new Water_ENGINE({
      map: this.map,
      canvas: this.canvas
    });
    this.foams = new Foams_ENGINE({
      map: this.map,
      canvas: this.canvas
    });
    this.flatsSand = new FlatsSand_ENGINE({
      map: this.map,
      canvas: this.canvas
    });
    this.elevations = new Elevations_ENGINE({
      map: this.map,
      canvas: this.canvas
    });
    this.flatsGrass = new FlatsGrass_ENGINE({
      map: this.map,
      canvas: this.canvas
    });
    this.shadows = new Shadows_ENGINE({
      map: this.map,
      canvas: this.canvas
    });
    this.wallElevations = new WallElevations_ENGINE({
      map: this.map,
      canvas: this.canvas
    });
    this.stairsElevation = new StairsElevations_ENGINE({
      map: this.map,
      canvas: this.canvas
    });
    this.flatElevations = new FlatElevations_ENGINE({
      map: this.map,
      canvas: this.canvas
    });
    this.castles = new Castles_ENGINE({
      map: this.map,
      canvas: this.canvas
    });
    this.trees = new Trees_ENGINE({
      map: this.map,
      canvas: this.canvas
    });
  }
  pushFloor(matrix) {
    matrix.forEach((row, vertical) => {
      row.forEach((box2, horizontal) => {
        const boxIndices = new Plane_ENGINE({
          horizontal,
          vertical
        });
        if (box2.water === true)
          this.water.pushWater({
            boxIndices
          });
        if (box2.foam !== false) {
          this.foams.pushFoam({
            boxIndices
          });
          if (box2.foam.flatSand === true)
            this.flatsSand.pushFlatSand({
              boxIndices
            });
        }
        if (box2.elevation !== false) {
          if (box2.elevation.shadow === true)
            this.shadows.pushShadow({
              boxIndices
            });
          if (box2.elevation.flatGrass === true)
            this.flatsGrass.pushFlatGrass({
              boxIndices
            });
          this.elevations.pushElevation({
            boxIndices
          });
        }
        if (box2.wallElevation !== false) {
          if (box2.wallElevation.shadow === true)
            this.shadows.pushShadow({
              boxIndices
            });
          this.wallElevations.pushWallElevation({
            boxIndices
          });
          if (box2.wallElevation.flatElevation !== false)
            this.flatElevations.pushFlatElevation({
              boxIndices,
              state: box2.wallElevation.flatElevation
            });
        }
        if (box2.stairElevation !== false) {
          if (box2.stairElevation.shadow === true)
            this.shadows.pushShadow({
              boxIndices
            });
          this.stairsElevation.setStairsElevations({
            boxIndices
          });
          if (box2.stairElevation.flatElevation !== false)
            this.flatElevations.pushFlatElevation({
              boxIndices,
              state: box2.stairElevation.flatElevation
            });
        }
        if (box2.castle !== false) {
          this.castles.castlePush({
            boxIndices,
            state: box2.castle.state,
            color: box2.castle.color
          });
        }
        if (box2.trees !== false) {
          this.trees.pushTree({
            boxIndices,
            state: box2.trees.animation
          });
        }
      });
    });
  }
  aboveFloor(props) {
    const flatSand = this.flatsSand.collision({
      character: props.character
    }) !== false;
    const elevations2 = this.elevations.collision({
      character: props.character
    }) !== false;
    const stairsElevations2 = this.stairsElevation.collision({
      character: props.character
    }) !== false;
    if (flatSand === true)
      return true;
    if (elevations2 === true)
      return true;
    if (stairsElevations2 === true)
      return true;
    return false;
  }
  collisionFloor(props) {
    const flatSand = this.flatsSand.collision({
      character: props.character
    }) !== false;
    const elevations2 = this.elevations.collision({
      character: props.character
    }) !== false;
    const wallElevations2 = this.wallElevations.collision({
      character: props.character
    }) !== false;
    const stairsElevations2 = this.stairsElevation.collision({
      character: props.character
    }) !== false;
    const nextFlatSand = this.flatsSand.collision({
      character: props.moved
    }) !== false;
    const nextElevations = this.elevations.collision({
      character: props.moved
    }) !== false;
    const nextWallElevations = this.wallElevations.collision({
      character: props.moved
    }) !== false;
    const nextStairsElevations = this.stairsElevation.collision({
      character: props.moved
    }) !== false;
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
class Map_ENGINE extends Position_ENGINE {
  matrix = MapMatrix_ENGINE.get();
  floors;
  boxes;
  canvas;
  constructor(props) {
    super({
      leftUp: new Coordinate_ENGINE({ x: 0, y: 0 }),
      size: new Size_ENGINE({
        width: 100,
        height: 100
      })
    });
    this.canvas = props.canvas;
    this.boxes = new Size_ENGINE({
      width: this.size.width / MapMatrix_ENGINE.length.horizontal,
      height: this.size.height / MapMatrix_ENGINE.length.vertical
    });
    this.floors = this.matrix.map((matrix) => {
      const floor2 = new Floor_ENGINE({
        map: this,
        canvas: this.canvas
      });
      floor2.pushFloor(matrix);
      return floor2;
    });
  }
  indexFloorOn(props) {
    for (let floorIndex = this.floors.length - 1;floorIndex >= 0; floorIndex--) {
      const floor2 = this.floors[floorIndex];
      if (floor2 === undefined)
        continue;
      if (floor2.aboveFloor({
        character: props.character
      }) === false)
        continue;
    }
  }
  collisionMap(props) {
    for (let floorIndex = this.floors.length - 1;floorIndex >= 0; floorIndex--) {
      const floor2 = this.floors[floorIndex];
      if (floor2 === undefined)
        continue;
      if (floor2.aboveFloor({
        character: props.character
      }) === false)
        continue;
      if (floor2.collisionFloor({
        character: props.character,
        moved: props.moved
      }) === true)
        return true;
      const nextFloorIndex = floorIndex + 1;
      const nextFloor = this.floors[nextFloorIndex];
      if (nextFloor === undefined)
        return false;
      const flatSand = floor2.flatsSand.collision({
        character: props.character
      }) !== false;
      const elevations2 = floor2.elevations.collision({
        character: props.character
      }) !== false;
      const wallElevations2 = floor2.wallElevations.collision({
        character: props.character
      }) !== false;
      const stairsElevations2 = floor2.stairsElevation.collision({
        character: props.character
      }) !== false;
      const nextFlatSand = nextFloor.flatsSand.collision({
        character: props.moved
      }) !== false;
      const nextElevations = nextFloor.elevations.collision({
        character: props.moved
      }) !== false;
      const nextWallElevations = nextFloor.wallElevations.collision({
        character: props.moved
      }) !== false;
      const nextStairsElevations = nextFloor.stairsElevation.collision({
        character: props.moved
      }) !== false;
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

// public/tsc/engine/character/direction.ts
class Direction_ENGINE {
  x;
  y;
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
  }
  isEqualTo(direction) {
    return this.x === direction.x && this.y === direction.y;
  }
}

// public/tsc/engine/square.ts
class Square_ENGINE extends Position_ENGINE {
  canvas;
  fillStyle;
  strokeStyle;
  lineWidth;
  constructor(props) {
    super({
      leftUp: props.leftUp,
      size: props.size
    });
    this.canvas = props.canvas;
    this.fillStyle = props.fillStyle;
    this.strokeStyle = props.strokeStyle;
    this.lineWidth = props.lineWidth;
  }
  drawSquare() {
    const positionOnCanvas = this.canvas.positionOnCanvas({
      position: this
    });
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
  address;
  constructor(props) {
    super({
      leftUp: props.leftUp,
      size: props.size,
      canvas: props.canvas,
      fillStyle: props.fillStyle,
      strokeStyle: props.strokeStyle,
      lineWidth: props.lineWidth
    });
    this.scale = props.scale;
    this.canvas = props.canvas;
    this.animations = new Animations_ENGINE({
      leftUp: new Coordinate_ENGINE({ x: 0, y: 0 }),
      size: new Size_ENGINE({ width: 0, height: 0 }),
      canvas: props.canvas,
      route: props.animations.route,
      element: props.animations.element,
      animation: props.animations.animation
    });
    this.speed = props.speed;
    this.address = props.address;
  }
  movedCharacter() {
    if (this.address.isEqualTo(new Direction_ENGINE({ x: 0, y: 0 })))
      return false;
    const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
    const speedX = this.speed.x * secondsBetweenFrames;
    const speedY = this.speed.y * secondsBetweenFrames;
    const distanceX = speedX * this.address.x;
    const distanceY = speedY * this.address.y;
    const newX = this.leftUp.x + distanceX;
    const newY = this.leftUp.y + distanceY;
    return new Character_ENGINE({
      leftUp: new Coordinate_ENGINE({ x: newX, y: newY }),
      size: new Size_ENGINE({
        width: this.size.width,
        height: this.size.height
      }),
      canvas: this.canvas,
      fillStyle: this.fillStyle,
      strokeStyle: this.strokeStyle,
      lineWidth: this.lineWidth,
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
    this.drawSquare();
    this.animations.size = new Size_ENGINE({
      width: this.scale.width * this.size.width,
      height: this.scale.height * this.size.height
    });
    this.animations.leftUp = new Coordinate_ENGINE({
      x: this.leftUp.x + this.size.width / 2 - this.animations.size.width / 2,
      y: this.leftUp.y + this.size.height / 2 - this.animations.size.height / 2
    });
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
    const positionOnCamera = this.canvas.positionOnCamera({
      position: this
    });
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
  constructor(props) {
    super({
      leftUp: new Coordinate_ENGINE({
        x: 0,
        y: 0
      }),
      size: props.size,
      canvas: props.canvas,
      fillStyle: "#416177",
      strokeStyle: "#fff",
      lineWidth: 0.5
    });
    this.pawn = props.pawn;
    this.photo = new Image_ENGINE({
      leftUp: new Coordinate_ENGINE({
        x: 0,
        y: 0
      }),
      size: new Size_ENGINE({
        width: this.size.width * 0.3,
        height: this.size.height
      }),
      canvas: this.canvas,
      route: props.photoRoute
    });
    this.name = new Text_ENGINE({
      leftUp: new Coordinate_ENGINE({
        x: 0,
        y: 0
      }),
      size: this.size.getPercentages({
        percentages: new Size_ENGINE({
          width: 70,
          height: 100
        })
      }),
      canvas: this.canvas,
      value: props.nickname,
      fillStyle: "#fff",
      strokeStyle: false,
      dungeonFont: false
    });
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
  constructor(props) {
    super({
      leftUp: props.leftUp,
      size: new Size_ENGINE({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      canvas: props.canvas,
      fillStyle: "#fff",
      strokeStyle: false,
      lineWidth: 0,
      scale: new Size_ENGINE({
        width: 3,
        height: 3
      }),
      animations: {
        route: `images/factions/knights/troops/pawn/${props.color}.png`,
        element: new Element_ENGINE({
          size: new Size_ENGINE({
            width: 192,
            height: 192
          }),
          indices: new Plane_ENGINE({
            horizontal: 6,
            vertical: 6
          })
        }),
        animation: new Animation_ENGINE({
          frames: 6,
          framesPerSecond: 6
        })
      },
      speed: new Coordinate_ENGINE({
        x: 2,
        y: 2
      }),
      address: new Direction_ENGINE({
        x: 0,
        y: 0
      })
    });
    this.map = props.map;
    this.nickname = props.nickname;
    this.userBar = new UserBar_ENGINE({
      pawn: this,
      size: new Size_ENGINE({
        width: 0,
        height: 0
      }),
      canvas: this.canvas,
      photoRoute: false,
      nickname: this.nickname
    });
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
  constructor(props) {
    const size20 = new Size_ENGINE({
      width: props.rightDown.x - props.leftUp.x,
      height: props.rightDown.y - props.leftUp.y
    });
    super({
      leftUp: props.leftUp,
      size: size20
    });
    this.canvas = props.canvas;
    this.fillStyle = props.fillStyle;
    this.strokeStyle = props.strokeStyle;
    this.lineWidth = props.lineWidth;
  }
  drawLine() {
    const positionOnCanvas = this.canvas.positionOnCanvas({
      position: this
    });
    if (positionOnCanvas === false)
      return;
    this.canvas.context.beginPath();
    this.canvas.context.lineTo(positionOnCanvas.leftUp.x, positionOnCanvas.leftUp.y);
    this.canvas.context.lineTo(positionOnCanvas.rightDown.x, positionOnCanvas.rightDown.y);
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
      animation: new Animation_ENGINE({
        frames: 8,
        framesPerSecond: 8
      }),
      element: {
        indices: new Plane_ENGINE({
          horizontal: 0,
          vertical: 0
        })
      }
    },
    jump: {
      animation: new Animation_ENGINE({
        frames: 6,
        framesPerSecond: 6
      }),
      element: {
        indices: new Plane_ENGINE({
          horizontal: 0,
          vertical: 1
        })
      }
    }
  };
  jumpTimer = 0;
  map;
  constructor(props) {
    super({
      leftUp: props.leftUp,
      size: new Size_ENGINE({
        width: props.map.boxes.width,
        height: props.map.boxes.height
      }),
      canvas: props.canvas,
      fillStyle: "#fff",
      strokeStyle: false,
      lineWidth: 0,
      scale: new Size_ENGINE({
        width: 3,
        height: 3
      }),
      animations: {
        route: "images/resources/sheep.png",
        element: new Element_ENGINE({
          size: new Size_ENGINE({
            width: 128,
            height: 128
          }),
          indices: new Plane_ENGINE({
            horizontal: 0,
            vertical: 0
          })
        }),
        animation: new Animation_ENGINE({
          frames: 8,
          framesPerSecond: 8
        })
      },
      speed: new Coordinate_ENGINE({
        x: 40,
        y: 40
      }),
      address: new Direction_ENGINE({
        x: 0,
        y: 0
      })
    });
    this.map = props.map;
    this.state = "move";
    this.lineSight = new Line_ENGINE({
      leftUp: new Coordinate_ENGINE({
        x: this.leftUp.x + this.size.width / 2,
        y: this.leftUp.y + this.size.height / 2
      }),
      rightDown: this.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 200,
          height: 50
        })
      }),
      canvas: this.canvas,
      fillStyle: false,
      strokeStyle: "#333",
      lineWidth: 2
    });
  }
  moveSheep() {
    const moved = this.movedCharacter();
    if (moved === false)
      return false;
    const collision = this.map.collisionMap({
      character: this,
      moved
    });
    if (collision === true) {
      return false;
    }
    this.leftUp.x = moved.leftUp.x;
    this.leftUp.y = moved.leftUp.y;
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
    let character3 = this.states[this.state];
    if (this.animations.element.getIndices().vertical === character3.element.indices.vertical)
      return;
    this.animations.element.setIndices(new Plane_ENGINE({
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
    this.lineSight.drawLine();
  }
}

// public/tsc/game/game.ts
class Game_ENGINE extends Scene_ENGINE {
  map;
  pawns = [];
  sheepGroup = [];
  constructor(props) {
    super({
      canvas: props.canvas
    });
    this.map = new Map_ENGINE({
      canvas: props.canvas
    });
    this.sheepGroup = [
      new Sheep_ENGINE({
        leftUp: new Coordinate_ENGINE({
          x: 35,
          y: 50
        }),
        map: this.map,
        canvas: props.canvas
      })
    ];
  }
  tiktokGift(gift) {
    const exist = this.pawns.some((pawn2) => pawn2.nickname === gift.nickname);
    if (exist === true)
      return;
    this.pawns.push(new Pawn_ENGINE({
      leftUp: new Coordinate_ENGINE({
        x: Math.floor(Math.random() * this.map.size.width),
        y: Math.floor(Math.random() * this.map.size.height)
      }),
      map: this.map,
      canvas: this.canvas,
      color: "blue",
      nickname: gift.nickname
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
  const canvas2 = new Canvas_ENGINE({
    leftUp: new Coordinate_ENGINE({ x: 0, y: 0 }),
    framesPerSecond: 24
  });
  const game2 = new Game_ENGINE({ canvas: canvas2 });
  game2.start();
});
