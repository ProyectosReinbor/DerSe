
import { Canvas } from "../canvas.js";
import { Position } from "../position.js";
import { Key } from "./key.js";

export class Keys extends Position {

  canvas: Canvas;
  factory: {
    size: {
      width: number;
      height: number;
    };
    text: {
      size: {
        height: number;
      }
    };
  };
  keyPress: (character: string) => void;
  keys: Key[] = [];

  constructor(
    initial: {
      x: number;
      y: number;
    },
    size: {
      width: number;
      height: number;
    },
    canvas: Canvas,
    characters: string,
    factory: {
      text: {
        size: {
          height: number;
        }
      }
    },
    keyPress: (character: string) => void
  ) {
    super(
      {
        x: initial.x,
        y: initial.y,
      },
      {
        width: size.width,
        height: size.height,
      }
    );
    this.canvas = canvas;
    this.factory = {
      size: {
        width: this.size.width / characters.length,
        height: this.size.height,
      },
      text: {
        size: factory.text.size
      }
    };

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

  touchendKeys(touch: Position): boolean {
    return this.keys.some(key => key.touchendKey(touch));
  }

  setKey(
    index: number,
    box: {
      x: number;
      y: number;
    },
    fillStyle: string,
    strokeStyle: string,
    lineWidth: number,
    text: {
      value: string;
      fillStyle: string;
      strokeStyle: string;
    }
  ): Key {
    const key = new Key(
      this.initial,
      this.factory.size,
      this.canvas,
      fillStyle,
      strokeStyle,
      lineWidth,
      {
        size: this.factory.text.size,
        value: text.value,
        fillStyle: text.fillStyle,
        strokeStyle: text.strokeStyle,
      },
      this.keyPress
    );
    key.initial.x += key.size.width * box.x;
    key.initial.y += key.size.height * box.y;
    this.keys[index] = key;
    return key;
  }

  drawKeys(): void {
    this.keys.forEach(key => key.drawButton());
  }
}