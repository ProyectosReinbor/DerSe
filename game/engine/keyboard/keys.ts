import type { Canvas_ENGINE } from "../canvas";
import type { FillStyle, StrokeStyle } from "../context";
import { Coordinate_ENGINE } from "../coordinate";
import { Plane_ENGINE } from "../plane";
import { Size_ENGINE } from "../size";
import { Text_ENGINE } from "../text";
import { Key_ENGINE, type KeyPress } from "./key";

type KeyDefault = {
  size: Size_ENGINE;
  text: {
    size: Size_ENGINE;
  };
  keyPress: KeyPress;
};

export class Keys_ENGINE extends Coordinate_ENGINE {

  keyDefault: KeyDefault;
  keys: Key_ENGINE[] = [];
  canvas: Canvas_ENGINE;

  constructor(
    x: number,
    y: number,
    canvas: Canvas_ENGINE,
    characters: string,
    keyDefault: KeyDefault,
  ) {
    super(x, y);
    this.canvas = canvas;
    this.keyDefault = keyDefault;
    this.keyDefault.size.width /= characters.length;
    for (
      let index = 0;
      index < characters.length;
      index++
    ) {
      const character = characters[index];
      if (character === undefined)
        continue;

      this.addKey(
        new Plane_ENGINE(index, 0),
        {
          fillStyle: "#0F6097",
          strokeStyle: "#fff",
          lineWidth: 0.5,
          text: {
            value: character,
            fillStyle: "#fff",
            strokeStyle: false,
            dungeonFont: false
          },
        }
      );
    }
  }

  touchendKeys(touch: Coordinate_ENGINE) {
    return this.keys.some(
      key => key.touchendKey(touch)
    );
  }

  addKey(
    boxes: Plane_ENGINE,
    newKey: {
      fillStyle: FillStyle;
      strokeStyle: StrokeStyle;
      lineWidth: number;
      text: {
        value: string;
        fillStyle: FillStyle;
        strokeStyle: StrokeStyle;
        dungeonFont: boolean;
      };
    }
  ) {
    const size = new Size_ENGINE(
      this.keyDefault.size.width,
      this.keyDefault.size.height
    );
    const top = size.width * boxes.horizontal;
    const left = size.height * boxes.vertical;
    const key = new Key_ENGINE(
      new Coordinate_ENGINE(
        this.x + top,
        this.y + left
      ),
      size,
      this.canvas,
      newKey.fillStyle,
      newKey.strokeStyle,
      newKey.lineWidth,
      new Text_ENGINE(
        new Coordinate_ENGINE(0, 0),
        new Size_ENGINE(0, this.keyDefault.text.size.height),
        this.canvas,
        newKey.text.value,
        newKey.text.fillStyle,
        newKey.text.strokeStyle,
        newKey.text.dungeonFont
      ),
      this.keyDefault.keyPress
    );
    this.keys.push(key);
  }

  drawKeys() {
    this.keys.forEach(
      key => key.drawButton()
    );
  }
}