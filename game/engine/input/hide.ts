import type { Canvas_ENGINE } from "../canvas";
import { Circle } from "../circle";
import type { Coordinate_ENGINE } from "../coordinate";
import { Curves_ENGINE } from "../curves";
import type { Input_ENGINE } from "../input";
import { Size_ENGINE } from "../size";
import { Square_ENGINE } from "../square";

export class Hide_ENGINE extends Square_ENGINE {

  value: string = "";
  input: Input_ENGINE;
  switchedOn: boolean;
  eyelid: Curves_ENGINE;
  iris: Circle;

  constructor(
    canvas: Canvas_ENGINE,
    input: Input_ENGINE,
    switchedOn: boolean,
  ) {
    super(
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(88, 20)
      ),
      input.size.percentage(
        new Size_ENGINE(10, 60)
      ),
      canvas,
      "#AED6F1",
      "#EAF2F8",
      0
    );
    this.input = input;
    this.switchedOn = switchedOn;
    this.eyelid = new Curves_ENGINE(
      canvas,
      false,
      "#fff",
      0.5
    );
    this.eyelid = new Curves_ENGINE(
      canvas,
      false,
      "#fff",
      0.5
    );
    this.eyelid.addCurve(
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(89, 50)
      ),
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(97, 50)
      ),
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(93, 70)
      )
    );
    this.eyelid.addCurve(
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(89, 50)
      ),
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(97, 50)
      ),
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(93, 20)
      )
    );
    this.iris = new Circle(
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(87, 36)
      ),
      input.size.percentage(
        new Size_ENGINE(12, 26)
      ),
      canvas,
      0,
      360,
      false,
      "#fff",
      false,
      0,
    );
  }

  touchendHide(touch: Coordinate_ENGINE) {
    if (this.insidePositionCoordinate(touch) === false)
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
    if (this.value.length === this.input.value.length)
      return this.value;

    const words = this.input.value.split(" ");
    for (const index in words) {
      const word = words[index];
      if (word === undefined)
        continue;

      words[index] = new Array(word.length).fill("*").join("");
    }
    this.value = words.join(" ");
    return this.value;
  }
}