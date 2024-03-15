
import type { Canvas } from "../canvas.js";
import { Coordinate } from "../coordinate.js";
import { Size } from "../size.js";
import { Key } from "./key.js";

export class Keys extends Coordinate {
  keyParameters: {
    size: Size;
    text: {
      size: Size;
    }
  };
  keys: Key[];
  canvas: Canvas;
  keyPress: (character: string) => void;
  constructor(
    x: number,
    y: number,
    canvas: Canvas,
    characters: string,
    keyParameters: {
      size: Size;
      text: {
        size: Size;
      }
    },
    keyPress: (character: string) => void,
  ) {
    super(x, y);
    this.keys = [];
    this.canvas = canvas;
    this.keyPress = keyPress;
    this.keyParameters = keyParameters;
    this.keyParameters.size.width /= characters.length;
    for (let index = 0; index < characters.length; index++) {
      const character = characters[index];
      this.setKey(
        index,
        new Coordinate(index),
        "#0F6097",
        "#fff",
        0.5,
        {
          value: character,
          fillStyle: "#fff",
          strokeStyle: "",
        }
      );
    }
  }

  touchendKeys(touch: Coordinate) {
    return this.keys.some(key => key.touchendKey(touch));
  }

  setKey(
    index: number,
    boxes: Coordinate,
    fillStyle: string,
    strokeStyle: string,
    lineWidth: number,
    textParameters: {
      value: string;
      fillStyle: string;
      strokeStyle: string;
    },
  ) {
    const key = new Key(
      new Coordinate(
        this.x,
        this.y,
      ),
      new Size(
        this.keyParameters.size.width,
        this.keyParameters.size.height,
      ),
      this.canvas,
      fillStyle,
      strokeStyle,
      lineWidth,
      {
        size: this.keyParameters.text.size,
        value: textParameters.value,
        fillStyle: textParameters.fillStyle,
        strokeStyle: textParameters.strokeStyle,
      },
      this.keyPress
    );
    const top = key.size.width * boxes.x;
    const left = key.size.height * boxes.y;
    key.initial.x += top;
    key.initial.y += left;
    this.keys[index] = key;
    return key;
  }

  drawKeys() {
    this.keys.forEach(key => key.drawButton());
  }
}