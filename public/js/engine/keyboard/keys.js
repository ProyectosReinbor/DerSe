
import { Position } from "../position.js";
import { Size } from "../size.js";
import { Key } from "./key.js";

export class Keys extends Position {
  constructor(
    initialX,
    initialY,
    sizeWidth,
    sizeHeight,
    canvas,
    characters,
    factoryTextSizeHeight,
    keyPress
  ) {
    super(
      initialX,
      initialY,
      sizeWidth,
      sizeHeight
    );
    this.keys = [];
    this.canvas = canvas;
    this.keyPress = keyPress;
    this.factory = {
      size: new Size(
        sizeWidth / characters.length,
        sizeHeight
      ),
      text: {
        size: new Size(
          0,
          factoryTextSizeHeight
        ),
      }
    };
    for (let index = 0; index < characters.length; index++) {
      const character = characters[index];
      this.setKey(
        index,
        index,
        0,
        "#0F6097",
        "#fff",
        0.5,
        character,
        "#fff",
      );
    }
  }

  touchendKeys(x, y) {
    return this.keys.some(key => key.touchendKey(x, y));
  }

  setKey(
    index,
    boxX,
    boxY,
    fillStyle,
    strokeStyle,
    lineWidth,
    textValue,
    textFillStyle,
    textStrokeStyle,
  ) {
    const key = new Key(
      this.initial.x,
      this.initial.y,
      this.factory.size.width,
      this.factory.size.height,
      this.canvas,
      fillStyle,
      strokeStyle,
      lineWidth,
      this.factory.text.size.height,
      textValue,
      textFillStyle,
      textStrokeStyle,
      this.keyPress
    );
    const top = key.size.width * boxX;
    const left = key.size.height * boxY;
    key.initial.x += top;
    key.initial.y += left;
    this.keys[index] = key;
    return key;
  }

  drawKeys() {
    this.keys.forEach(key => key.drawButton());
  }
}