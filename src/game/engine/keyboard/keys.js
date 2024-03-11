
import { Position } from "../position.js";
import { Size } from "../size.js";
import { Key } from "./key.js";

export const Factory = (
  sizeWidth,
  sizeHeight,
  textSizeWidth,
  textSizeHeight,
) => ({
  size: new Size(sizeWidth, sizeHeight),
  text: {
    size: new Size(textSizeWidth, textSizeHeight),
  }
});

export class Keys extends Position {
  constructor(
    initialX,
    initialY,
    sizeWidth,
    sizeHeight,
    canvas,
    characters,
    factorySizeWidth,
    factorySizeHeight,
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
    this.factory = Factory(
      factorySizeWidth,
      factorySizeHeight,
      this.size.width / characters.length,
      factoryTextSizeHeight
    );
    this.keyPress = keyPress;
    for (let index = 0; index < characters.length; index++) {
      const character = characters[index];
      this.setKey(
        index,
        {
          x: index,
          y: 0,
        },
        "blue",
        "white",
        0.5,
        {
          value: character,
          fillStyle: "white",
          strokeStyle: ""
        }
      );
    }
  }

  touchendKeys(touch) {
    return this.keys.some(key => key.touchendKey(touch));
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
    key.initial.x += key.size.width * boxX;
    key.initial.y += key.size.height * boxY;
    this.keys[index] = key;
    return key;
  }

  drawKeys() {
    this.keys.forEach(key => key.drawButton());
  }
}