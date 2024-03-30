import type { Canvas_ENGINE } from "../canvas";
import type { Coordinate_ENGINE } from "../coordinate";
import type { Keyboard_ENGINE } from "../keyboard";
import { Lines_ENGINE } from "../lines";
import { Size_ENGINE } from "../size";
import { Square_ENGINE } from "../square";

export class Enter_ENGINE extends Square_ENGINE {

  triangle: Lines_ENGINE;
  lines: Lines_ENGINE;
  keyboard: Keyboard_ENGINE;

  constructor(props: {
    canvas: Canvas_ENGINE;
    keyboard: Keyboard_ENGINE;
  }) {
    super({
      canvas: props.canvas,
      leftUp: props.keyboard.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 13,
          height: 3
        })
      }),
      size: props.keyboard.size.getPercentages({
        percentages: new Size_ENGINE({
          width: 12,
          height: 14
        })
      }),
      fillStyle: "#21618C",
      strokeStyle: "#fff",
      lineWidth: 0.5,
    });
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
        width: 10,
        height: 60
      }),
      rightDown: new Size_ENGINE({
        width: 30,
        height: 40
      })
    });
    this.triangle.addLine({
      leftUp: new Size_ENGINE({
        width: 30,
        height: 80
      }),
      rightDown: new Size_ENGINE({
        width: 10,
        height: 60
      })
    });
    this.lines = new Lines_ENGINE({
      leftUp: this.leftUp,
      size: this.size,
      canvas: props.canvas,
      fillStyle: false,
      strokeStyle: "#fff",
      lineWidth: 0.5,
    });
    this.lines.addLine({
      leftUp: new Size_ENGINE({
        width: 20,
        height: 60
      }),
      rightDown: new Size_ENGINE({
        width: 80,
        height: 60
      })
    });
    this.lines.addLine({
      leftUp: new Size_ENGINE({
        width: 80,
        height: 20
      }),
      rightDown: new Size_ENGINE({
        width: 0,
        height: 0
      })
    });
    this.keyboard = props.keyboard;
  }

  touchendEnter(props: {
    touch: Coordinate_ENGINE
  }) {
    if (this.insidePositionCoordinate({
      coordinate: props.touch
    }) === false)
      return false;

    if (this.keyboard.input === false)
      return false;

    this.keyboard.input.addLineBreak();
    return true;
  }

  drawEnter() {
    this.drawSquare();
    this.triangle.drawLines();
    this.lines.drawLines();
  }
}