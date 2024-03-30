import type { Canvas_ENGINE } from "../canvas";
import { Coordinate_ENGINE } from "../coordinate";
import { Plane_ENGINE } from "../plane";
import { Size_ENGINE } from "../size";
import { Text_ENGINE } from "../text";
import { Key_ENGINE } from "./key";

export class Keys_ENGINE extends Coordinate_ENGINE {

  keyDefault: Key_ENGINE;
  keys: Key_ENGINE[] = [];
  canvas: Canvas_ENGINE;

  constructor(props: {
    x: number;
    y: number;
    canvas: Canvas_ENGINE;
    characters: string;
    keyDefault: Key_ENGINE;
  }) {
    super(props);
    this.canvas = props.canvas;
    this.keyDefault = props.keyDefault;
    this.keyDefault.size.width /= props.characters.length;
    for (let index = 0; index < props.characters.length; index++) {
      const character = props.characters[index];
      if (character === undefined) continue;
      this.addKey({
        boxes: new Plane_ENGINE({
          horizontal: index,
          vertical: 0
        }),
        newKey: new Key_ENGINE({
          leftUp: new Coordinate_ENGINE({ x: 0, y: 0 }),
          size: new Size_ENGINE({ width: 0, height: 0 }),
          canvas: this.canvas,
          fillStyle: "#0F6097",
          strokeStyle: "#fff",
          lineWidth: 0.5,
          text: new Text_ENGINE({
            canvas: this.canvas,
            leftUp: new Coordinate_ENGINE({ x: 0, y: 0 }),
            size: new Size_ENGINE({ width: 0, height: 0 }),
            value: character,
            fillStyle: "#fff",
            strokeStyle: false,
            dungeonFont: false
          }),
          keyPress: () => { },
        })
      });
    }
  }

  touchendKeys(props: {
    touch: Coordinate_ENGINE;
  }) {
    return this.keys.some(key => key.touchendKey(props));
  }

  addKey(props: {
    boxes: Plane_ENGINE,
    newKey: Key_ENGINE
  }) {
    const size = new Size_ENGINE({
      width: this.keyDefault.size.width,
      height: this.keyDefault.size.height
    });
    const top = size.width * props.boxes.horizontal;
    const left = size.height * props.boxes.vertical;
    const key = new Key_ENGINE({
      canvas: this.canvas,
      leftUp: new Coordinate_ENGINE({
        x: this.x + top,
        y: this.y + left
      }),
      size,
      fillStyle: props.newKey.fillStyle,
      strokeStyle: props.newKey.strokeStyle,
      lineWidth: props.newKey.lineWidth,
      text: new Text_ENGINE({
        canvas: this.canvas,
        leftUp: new Coordinate_ENGINE({ x: 0, y: 0 }),
        size: new Size_ENGINE({
          width: 0,
          height: this.keyDefault.text.size.height
        }),
        value: props.newKey.text.value,
        fillStyle: props.newKey.text.fillStyle,
        strokeStyle: props.newKey.text.strokeStyle,
        dungeonFont: this.keyDefault.text.dungeonFont
      }),
      keyPress: this.keyDefault.keyPress
    });
    this.keys.push(key);
  }

  drawKeys() {
    this.keys.forEach(key => key.drawButton());
  }
}