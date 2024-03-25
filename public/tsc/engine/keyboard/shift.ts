import type { Canvas_ENGINE } from "../canvas";
import type { Coordinate_ENGINE } from "../coordinate";
import type { Keyboard_ENGINE } from "../keyboard";
import { Lines_ENGINE } from "../lines";
import { Size_ENGINE } from "../size";
import { Square_ENGINE } from "../square";

export class Shift_KEYBOARD extends Square_ENGINE {

  uppercase: boolean;
  triangle: Lines_ENGINE;
  lines: Lines_ENGINE;

  constructor(props: {
    canvas: Canvas_ENGINE,
    keyboard: Keyboard_ENGINE,
  }) {
    super({
      canvas: props.canvas,
      leftUp: props.keyboard.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 2,
          height: 3
        })
      }),
      size: props.keyboard.size.getPercentages({
        percentages: new Size_ENGINE({
          width: 9,
          height: 14
        })
      }),
      fillStyle: "#21618C",
      strokeStyle: "#AED6F1",
      lineWidth: 0.5,
    });
    this.uppercase = false;
    this.triangle = new Lines_ENGINE({
      leftUp: this.leftUp,
      size: this.size,
      canvas: props.canvas,
      fillStyle: "#fff",
      strokeStyle: false,
      lineWidth: 0
    });
    this.triangle.addLine({
      leftUp: new Size_ENGINE({
        width: 50,
        height: 20
      }),
      rightDown: new Size_ENGINE({
        width: 10,
        height: 50
      })
    });
    this.triangle.addLine({
      leftUp: new Size_ENGINE({
        width: 90,
        height: 50
      }),
      rightDown: new Size_ENGINE({
        width: 50,
        height: 20
      })
    });
    this.lines = new Lines_ENGINE({
      leftUp: this.leftUp,
      size: this.size,
      canvas: props.canvas,
      fillStyle: false,
      strokeStyle: "#fff",
      lineWidth: 2,
    });
    this.lines.addLine({
      leftUp: new Size_ENGINE({
        width: 50,
        height: 50
      }),
      rightDown: new Size_ENGINE({
        width: 50,
        height: 80
      })
    });
  }

  touchendShift(props: {
    touch: Coordinate_ENGINE
  }) {
    if (this.insidePositionCoordinate({
      coordinate: props.touch
    }) === false)
      return false;

    this.uppercase = !this.uppercase;
    return true;
  }

  drawShift() {
    this.drawSquare();
    this.triangle.drawLines();
    this.lines.drawLines();
  }
}