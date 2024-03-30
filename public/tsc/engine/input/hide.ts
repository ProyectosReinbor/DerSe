import type { Canvas_ENGINE } from "../canvas";
import { Circle } from "../circle";
import type { Coordinate_ENGINE } from "../coordinate";
import { Curves_ENGINE } from "../curves";
import type { Input_ENGINE } from "../input";
import { Size_ENGINE } from "../size";
import { Square_ENGINE } from "../square";

export class Hide_INPUT extends Square_ENGINE {

  value: string = "";
  input: Input_ENGINE;
  switchedOn: boolean;
  eyelid: Curves_ENGINE;
  iris: Circle;

  constructor(props: {
    canvas: Canvas_ENGINE,
    input: Input_ENGINE,
    switchedOn: boolean,
  }) {
    super({
      leftUp: props.input.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({ width: 88, height: 20 })
      }),
      size: props.input.size.getPercentages({
        percentages: new Size_ENGINE({ width: 10, height: 60 })
      }),
      canvas: props.canvas,
      fillStyle: "#AED6F1",
      strokeStyle: "#EAF2F8",
      lineWidth: 0
    });
    this.input = props.input;
    this.switchedOn = props.switchedOn;
    this.eyelid = new Curves_ENGINE({
      canvas: props.canvas,
      fillStyle: false,
      strokeStyle: "#fff",
      lineWidth: 0.5
    });
    this.eyelid = new Curves_ENGINE({
      canvas: props.canvas,
      fillStyle: false,
      strokeStyle: "#fff",
      lineWidth: 0.5
    });
    this.eyelid.addCurve({
      leftUp: props.input.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 89,
          height: 50
        })
      }),
      rightDown: props.input.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 97,
          height: 50
        })
      }),
      checkPoint: props.input.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 93,
          height: 70
        })
      })
    });
    this.eyelid.addCurve({
      leftUp: props.input.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 89,
          height: 50
        })
      }),
      rightDown: props.input.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 97,
          height: 50
        })
      }),
      checkPoint: props.input.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 93,
          height: 20
        })
      })
    });
    this.iris = new Circle({
      leftUp: props.input.leftUpPlusSizePercentages({
        percentages: new Size_ENGINE({
          width: 87,
          height: 36
        })
      }),
      size: props.input.size.getPercentages({
        percentages: new Size_ENGINE({
          width: 12,
          height: 26
        })
      }),
      canvas: props.canvas,
      startingDegrees: 0,
      finalDegrees: 360,
      counterclockwise: false,
      fillStyle: "#fff",
      strokeStyle: false,
      lineWidth: 0,
    });
  }

  touchendHide(props: {
    touch: Coordinate_ENGINE;
  }) {
    if (this.insidePositionCoordinate({
      coordinate: props.touch
    }) === false)
      return false;

    this.switchedOn = !this.switchedOn;
    return true;
  }

  drawHide() {
    this.drawSquare();
    this.eyelid.drawCurves();
    this.iris.drawCircle();
  }

  get encryption() {
    if (this.value.length === this.input.value.length) return this.value;
    const words = this.input.value.split(" ");
    for (const index in words) {
      const word = words[index];
      if (word === undefined) continue;
      words[index] = new Array(word.length).fill("*").join("");
    }
    this.value = words.join(" ");
    return this.value;
  }
}