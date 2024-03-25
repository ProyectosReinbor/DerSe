import { Button_ENGINE } from "../button";
import type { Canvas_ENGINE } from "../canvas";
import type { Keyboard_ENGINE } from "../keyboard";
import { Size_ENGINE } from "../size";

export class CloseQuestion_KEYBOARD extends Button_ENGINE {
  keyboard: Keyboard_ENGINE;
  constructor(props: {
    canvas: Canvas_ENGINE;
    keyboard: Keyboard_ENGINE;
  }) {
    super({
      canvas: props.canvas,
      initial: props.keyboard.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 78,
          height: 3
        })
      }),
      size: props.keyboard.size.getPercentages({
        new Size({ width: 7, height: 14 })
      }),
      fillStyle: "#21618C",
      strokeStyle: "#fff",
      lineWidth: 0.5,
      text: new Text({
        canvas: props.canvas,
        initial: new Coordinate({ x: 0, y: 0 }),
        size: new Size({ width: 0, height: 10 }),
        value: "?",
        fillStyle: "#fff",
        strokeStyle: false,
        dungeonFont: false,
      })
    });
    this.keyboard = props.keyboard;
  }

  touchendCloseQuestion(touch: Coordinate) {
    if (this.insideCoordinate(touch) === false) return false;
    if (this.keyboard.target === false) return false;
    this.keyboard.target.addChar("?");
    return true;
  }
}