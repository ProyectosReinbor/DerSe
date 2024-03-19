import type { Canvas } from "../canvas";
import { Circle } from "../circle";
import { Coordinate } from "../coordinate";
import { Curves } from "../curves";
import type { Input } from "../input";
import { Rect } from "../rect";


export class Hide extends Rect {
  value: string = "";
  input: Input;
  turnOn: boolean;
  eyelid: Curves;
  iris: Circle;
  constructor(props: {
    canvas: Canvas,
    input: Input,
    turnOn: boolean,
  }) {
    super({
      canvas: props.canvas,
      initial: props.input.endPercentage(new Coordinate({ x: 88, y: 20 })),
      size: props.input.size.percentage(new Coordinate({ x: 10, y: 60 })),
      fillStyle: "#AED6F1",
      strokeStyle: "#EAF2F8",
      lineWidth: 0.5,
    });
    this.input = props.input;
    this.turnOn = props.turnOn;
    this.eyelid = new Curves({
      canvas: props.canvas,
      fillStyle: false,
      strokeStyle: "#fff",
      lineWidth: 0.5
    });
    this.eyelid.addCurve(
      props.input.endPercentage(new Coordinate({ x: 89, y: 50 })),
      props.input.endPercentage(new Coordinate({ x: 97, y: 50 })),
      props.input.endPercentage(new Coordinate({ x: 93, y: 70 }))
    );
    this.eyelid.addCurve(
      props.input.endPercentage(new Coordinate({ x: 89, y: 50 })),
      props.input.endPercentage(new Coordinate({ x: 97, y: 50 })),
      props.input.endPercentage(new Coordinate({ x: 93, y: 20 }))
    );
    this.iris = new Circle({
      initial: props.input.endPercentage(new Coordinate({ x: 87, y: 36 })),
      size: props.input.size.percentage(new Coordinate({ x: 12, y: 26 })),
      canvas: props.canvas,
      startingDegrees: 0,
      finalDegrees: 360,
      counterclockwise: false,
      fillStyle: "#fff",
      strokeStyle: false,
      lineWidth: 0,
    });
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