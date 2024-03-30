import type { Canvas_ENGINE } from "../canvas";
import type { Coordinate_ENGINE } from "../coordinate";
import type { Keyboard_ENGINE } from "../keyboard";
import { Lines_ENGINE } from "../lines";
import { Size_ENGINE } from "../size";
import { Square_ENGINE } from "../square";

export class Finish_KEYBOARD extends Square_ENGINE {

  seen: Lines_ENGINE;
  keyboard: Keyboard_ENGINE;

  constructor(props: {
    canvas: Canvas_ENGINE;
    keyboard: Keyboard_ENGINE;
  }) {
    super({
      canvas: props.canvas,
      leftUp: props.keyboard.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 88,
          height: 3
        })
      }),
      size: props.keyboard.size.getPercentages({
        percentages: new Size_ENGINE({
          width: 1,
          height: 14
        })
      }),
      fillStyle: "#21618C",
      strokeStyle: "#fff",
      lineWidth: 0.5,
    });
    this.seen = new Lines_ENGINE({
      leftUp: this.leftUp,
      size: this.size,
      canvas: props.canvas,
      fillStyle: false,
      strokeStyle: "#fff",
      lineWidth: 0.5
    });
    this.seen.addLine({
      leftUp: new Size_ENGINE({
        width: 30,
        height: 50
      }),
      rightDown: new Size_ENGINE({
        width: 50,
        height: 80
      })
    });
    this.seen.addLine({
      leftUp: new Size_ENGINE({
        width: 70,
        height: 20
      }),
      rightDown: new Size_ENGINE({
        width: 0,
        height: 0
      })
    });
    this.keyboard = props.keyboard;
  }

  touchendFinish(props: {
    touch: Coordinate_ENGINE;
  }) {
    if (this.insidePositionCoordinate({
      coordinate: props.touch
    }) === false)
      return false;

    this.keyboard.input = false;
    return true;
  }

  drawFinish() {
    this.drawSquare();
    this.seen.drawLines();
  }
}