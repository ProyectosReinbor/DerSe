import type { Canvas_ENGINE } from "../canvas";
import type { Coordinate_ENGINE } from "../coordinate";
import type { Keyboard_ENGINE } from "../keyboard";
import { Lines_ENGINE } from "../lines";
import { Position_ENGINE } from "../position";
import { Size_ENGINE } from "../size";
import { Text_ENGINE } from "../text";

export class Delete_ENGINE extends Position_ENGINE {

  startTouch: number | false = false;
  lines: Lines_ENGINE;
  character: Text_ENGINE;
  keyboard: Keyboard_ENGINE;

  constructor(props: {
    canvas: Canvas_ENGINE;
    keyboard: Keyboard_ENGINE;
  }) {
    super({
      leftUp: props.keyboard.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 63,
          height: 0
        })
      }),
      size: props.keyboard.size.getPercentages({
        percentages: new Size_ENGINE({
          width: 15,
          height: 20
        })
      }),
    });
    this.lines = new Lines_ENGINE({
      leftUp: this.leftUp,
      size: this.size,
      canvas: props.canvas,
      fillStyle: "#21618C",
      strokeStyle: "#fff",
      lineWidth: 0.5
    });
    this.lines.addLine({
      leftUp: new Size_ENGINE({
        width: 10,
        height: 50
      }),
      rightDown: new Size_ENGINE({
        width: 30,
        height: 20
      })
    });
    this.lines.addLine({
      leftUp: new Size_ENGINE({
        width: 90,
        height: 20
      }),
      rightDown: new Size_ENGINE({
        width: 90,
        height: 80
      })
    });
    this.lines.addLine({
      leftUp: new Size_ENGINE({
        width: 30,
        height: 80
      }),
      rightDown: new Size_ENGINE({
        width: 10,
        height: 50
      })
    });
    this.character = new Text_ENGINE({
      leftUp: this.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 50,
          height: 15
        })
      }),
      size: this.size.getPercentages({
        percentages: new Size_ENGINE({
          width: 15,
          height: 100
        })
      }),
      canvas: props.canvas,
      value: "X",
      fillStyle: "#fff",
      strokeStyle: false,
      dungeonFont: true
    });
    this.keyboard = props.keyboard;
  }

  touchstartDelete(props: {
    touch: Coordinate_ENGINE
  }) {
    const inside = this.insidePositionCoordinate({
      coordinate: props.touch
    });
    if (inside === false)
      return;

    this.deleteLastCharacter();
  }

  deleteLastCharacter() {
    this.startTouch = new Date().getTime();
    if (this.keyboard.input === false)
      return;

    this.keyboard.input.deleteLastCharacter();
  }

  touchmoveDelete(props: {
    touch: Coordinate_ENGINE;
  }) {
    const inside = this.insidePositionCoordinate({
      coordinate: props.touch
    });
    if (inside === true)
      return;

    this.startTouch = false;
  }

  touchendDelete() {
    if (this.startTouch === false)
      return false;

    this.startTouch = false;
    return true;
  }

  holdDown() {
    if (this.startTouch === false)
      return;

    const time = new Date().getTime() - this.startTouch;
    if (time > 250)
      this.deleteLastCharacter();
  }

  drawDelete() {
    this.holdDown();
    this.lines.drawLines();
    this.character.drawText();
  }
}