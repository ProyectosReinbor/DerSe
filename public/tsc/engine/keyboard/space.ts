import { Button } from "../button";
import type { Canvas } from "../canvas";
import { Coordinate } from "../coordinate";
import type { Keyboard } from "../keyboard";
import { Size } from "../size";
import { Text } from "../text";


export class Space extends Button {
  keyboard: Keyboard;
  constructor(props: {
    canvas: Canvas;
    keyboard: Keyboard;
  }) {
    super({
      canvas: props.canvas,
      initial: props.keyboard.endPercentage(
        new Size({ width: 27, height: 3 })
      ),
      size: props.keyboard.size.percentage(
        new Size({ width: 36, height: 14 })
      ),
      fillStyle: "#21618C",
      strokeStyle: "#fff",
      lineWidth: 0.5,
      text: new Text({
        canvas: props.canvas,
        initial: new Coordinate({ x: 0, y: 0 }),
        size: new Size({
          width: 0,
          height: 8,
        }),
        value: "Space",
        fillStyle: "#fff",
        strokeStyle: false,
        dungeonFont: false,
      }),
    });
    this.keyboard = props.keyboard;
  }

  touchendSpace(touch: Coordinate) {
    if (this.insideCoordinate(touch) === false) return false;
    if (this.keyboard.target === false) return false;
    this.keyboard.target.addChar(" ");
    return true;
  }
}