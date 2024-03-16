import {
  type Canvas,
  Coordinate,
  type Input,
  Rect,
  Size,
  Circle,
  Curves
} from "../exports.js";

export class Hide extends Rect {
  value: string = "";
  input: Input;
  turnOn: boolean;
  eyelid: Curves;
  iris: Circle;
  constructor(
    canvas: Canvas,
    input: Input,
    turnOn: boolean,
  ) {
    super(
      new Coordinate(
        input.initial.x + (input.size.width * 0.88),
        input.initial.y + (input.size.height * 0.2),
      ),
      new Size(
        input.size.width * 0.10,
        input.size.height * 0.6,
      ),
      canvas,
      "#AED6F1",
      "#EAF2F8",
      0.5,
    );
    this.input = input;
    this.turnOn = turnOn;
    this.eyelid = new Curves(
      canvas,
      undefined,
      "#fff",
      0.5
    );
    this.eyelid.addCurve(
      new Coordinate(
        input.initial.x + (input.size.width * 0.89),
        input.initial.y + (input.size.height * 0.50),
      ),
      new Coordinate(
        input.initial.x + (input.size.width * 0.97),
        input.initial.y + (input.size.height * 0.50),
      ),
      new Coordinate(
        input.initial.x + (input.size.width * 0.93),
        input.initial.y + (input.size.height * 0.70)
      )
    );
    this.eyelid.addCurve(
      new Coordinate(
        input.initial.x + (input.size.width * 0.89),
        input.initial.y + (input.size.height * 0.50),
      ),
      new Coordinate(
        input.initial.x + (input.size.width * 0.97),
        input.initial.y + (input.size.height * 0.50),
      ),
      new Coordinate(
        input.initial.x + (input.size.width * 0.93),
        input.initial.y + (input.size.height * 0.20),
      )
    );
    this.iris = new Circle(
      new Coordinate(
        input.initial.x + (input.size.width * 0.87),
        input.initial.y + (input.size.height * 0.36),
      ),
      new Size(
        input.size.width * 0.12,
        input.size.height * 0.26,
      ),
      canvas,
      0,
      360,
      false,
      "#fff",
    );
  }

  touchendHide(touch: Coordinate) {
    if (this.insideCoordinate(touch) === false) return false;
    this.turnOn = !this.turnOn;
    return true;
  }

  drawHide() {
    this.drawRect();
    this.eyelid.drawCurves();
    this.iris.drawCircle();
  }

  get encryption() {
    if (this.value.length === this.input.value.length) return this.value;
    const words = this.input.value.split(" ");
    for (const index in words) {
      words[index] = new Array(words[index].length).fill("*").join("");
    }
    this.value = words.join(" ");
    return this.value;
  }
}