import type { Canvas } from "../canvas";
import { Coordinate } from "../coordinate";
import { Size } from "../size";
import { Text } from "../text";
import { Key } from "./key";

export class Keys extends Coordinate {
  keyDefault: Key;
  keys: Key[] = [];
  canvas: Canvas;
  constructor(props: {
    x: number;
    y: number;
    canvas: Canvas;
    characters: string;
    keyDefault: Key;
  }) {
    super(props);
    this.canvas = props.canvas;
    this.keyDefault = props.keyDefault;
    this.keyDefault.size.width /= props.characters.length;
    for (let index = 0; index < props.characters.length; index++) {
      const character = props.characters[index];
      if (character === undefined) continue;
      this.setKey(
        index,
        new Coordinate({ x: index, y: 0 }),
        new Key({
          initial: new Coordinate({ x: 0, y: 0 }),
          size: new Size({ width: 0, height: 0 }),
          canvas: this.canvas,
          fillStyle: "#0F6097",
          strokeStyle: "#fff",
          lineWidth: 0.5,
          text: new Text({
            canvas: this.canvas,
            initial: new Coordinate({ x: 0, y: 0 }),
            size: new Size({ width: 0, height: 0 }),
            value: character,
            fillStyle: "#fff",
            strokeStyle: false,
            dungeonFont: false
          }),
          keyPress: () => { },
        })
      );
    }
  }

  touchendKeys(touch: Coordinate) {
    return this.keys.some(key => key.touchendKey(touch));
  }

  setKey(
    index: number,
    boxes: Coordinate,
    newKey: Key
  ) {
    const size = new Size({
      width: this.keyDefault.size.width,
      height: this.keyDefault.size.height
    });
    const top = size.width * boxes.x;
    const left = size.height * boxes.y;
    this.keys[index] = new Key({
      canvas: this.canvas,
      initial: new Coordinate({
        x: this.x + top,
        y: this.y + left
      }),
      size,
      fillStyle: newKey.fillStyle,
      strokeStyle: newKey.strokeStyle,
      lineWidth: newKey.lineWidth,
      text: new Text({
        canvas: this.canvas,
        initial: new Coordinate({ x: 0, y: 0 }),
        size: new Size({
          width: 0,
          height: this.keyDefault.text.size.height
        }),
        value: newKey.text.value,
        fillStyle: newKey.text.fillStyle,
        strokeStyle: newKey.text.strokeStyle,
        dungeonFont: this.keyDefault.text.dungeonFont
      }),
      keyPress: this.keyDefault.keyPress
    });
  }

  drawKeys() {
    this.keys.forEach(key => key.drawButton());
  }
}