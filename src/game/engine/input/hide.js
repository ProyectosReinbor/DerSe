import { Canvas } from "../canvas.js";
import { Circle } from "../circle.js";
import { Curves } from "../curves.js";
import { Input } from "../input.js";
import { Position } from "../position.js";
import { Rect } from "../rect.js";

export class Hide extends Rect {

  input: Input;
  eyelid: Curves;
  iris: Circle;
  turnOn: boolean;
  value: string = "";

  constructor(
    canvas: Canvas,
    input: Input,
    turnOn: boolean,
  ) {
    super(
      {
        x: input.initial.x + (input.size.width * 0.88),
        y: input.initial.y + (input.size.height * 0.2),
      },
      {
        width: input.size.width * 0.10,
        height: input.size.height * 0.6,
      },
      canvas,
      "#AED6F1",
      "#EAF2F8",
      0.5,
    );
    this.input = input;
    this.turnOn = turnOn;

    this.eyelid = new Curves(
      canvas,
      [
        {
          initial: {
            x: input.initial.x + (input.size.width * 0.89),
            y: input.initial.y + (input.size.height * 0.50),
          },
          end: {
            x: input.initial.x + (input.size.width * 0.97),
            y: input.initial.y + (input.size.height * 0.50),
          },
          controlPoint: {
            x: input.initial.x + (input.size.width * 0.93),
            y: input.initial.y + (input.size.height * 0.70),
          }
        },
        {
          initial: {
            x: input.initial.x + (input.size.width * 0.89),
            y: input.initial.y + (input.size.height * 0.50),
          },
          end: {
            x: input.initial.x + (input.size.width * 0.97),
            y: input.initial.y + (input.size.height * 0.50),
          },
          controlPoint: {
            x: input.initial.x + (input.size.width * 0.93),
            y: input.initial.y + (input.size.height * 0.20),
          }
        }
      ],
      "",
      "#fff",
      0.5,
    );

    this.iris = new Circle(
      {
        x: input.initial.x + (input.size.width * 0.87),
        y: input.initial.y + (input.size.height * 0.36),
      },
      {
        width: input.size.width * 0.12,
        height: input.size.height * 0.26,
      },
      canvas,
      0,
      360,
      false,
      "#fff",
      "",
      0,
    );
  }

  touchendHide(touch: Position): boolean {
    if (this.inside(touch) === false) return false;
    this.turnOn = !this.turnOn;
    return true;
  }

  drawHide() {
    this.drawRect();
    this.eyelid.drawCurves();
    this.iris.drawCircle();
  }

  get encryption(): string {
    if (this.value.length === this.input.value.length) return this.value;
    const words = this.input.value.split(" ");
    for (const index in words) {
      words[index] = new Array(words[index].length).fill("*").join("");
    }
    this.value = words.join(" ");
    return this.value;
  }
}