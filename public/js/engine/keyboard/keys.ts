
import type { Canvas } from "../canvas.js";
import type { Coordinate } from "../coordinate.js";
import { Position } from "../position.js";
import { Size } from "../size.js";
import { Key } from "./key.js";

type KeyParameters = {
  size: Size;
  text: {
    size: Size;
  }
};

export class Keys extends Position {
  keyParameters: KeyParameters;
  keys: Key[];
  canvas: Canvas;
  keyPress: (character: string) => void;
  constructor(
    initial: Coordinate,
    size: Size,
    canvas: Canvas,
    characters: string,
    keyParameters: KeyParameters,
    keyPress: (character: string) => void,
  ) {
    super(initial, size);
    this.keys = [];
    this.canvas = canvas;
    this.keyPress = keyPress;
    this.keyParameters = keyParameters;
    this.keyParameters.size.width /= characters.length;
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

  touchendKeys(touch: Coordinate) {
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