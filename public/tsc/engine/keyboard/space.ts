import { Button_ENGINE } from "../button";
import type { Canvas_ENGINE } from "../canvas";
import { Coordinate_ENGINE } from "../coordinate";
import type { Keyboard_ENGINE } from "../keyboard";
import { Size_ENGINE } from "../size";
import { Text_ENGINE } from "../text";

export class Space_ENGINE extends Button_ENGINE {

  keyboard: Keyboard_ENGINE;

  constructor(props: {
    canvas: Canvas_ENGINE;
    keyboard: Keyboard_ENGINE;
  }) {
    super({
      canvas: props.canvas,
      leftUp: props.keyboard.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 27,
          height: 3
        })
      }),
      size: props.keyboard.size.getPercentages({
        percentages: new Size_ENGINE({
          width: 36,
          height: 14
        })
      }),
      fillStyle: "#21618C",
      strokeStyle: "#fff",
      lineWidth: 0.5,
      text: new Text_ENGINE({
        canvas: props.canvas,
        leftUp: new Coordinate_ENGINE({ x: 0, y: 0 }),
        size: new Size_ENGINE({
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

  touchendSpace(props: {
    touch: Coordinate_ENGINE;
  }) {
    if (this.insidePositionCoordinate({
      coordinate: props.touch
    }) === false)
      return false;

    if (this.keyboard.input === false)
      return false;

    this.keyboard.input.addChar(" ");
    return true;
  }
}