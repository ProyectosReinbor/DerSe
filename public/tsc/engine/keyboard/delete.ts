import type { Canvas } from "../canvas";
import { Coordinate } from "../coordinate";
import type { Keyboard } from "../keyboard";
import { Lines } from "../lines";
import { Position } from "../position";
import { Text } from "../text";

export class Delete extends Position {
  startTouch: number | false = false;
  lines: Lines;
  character: Text;
  keyboard: Keyboard;
  constructor(props: {
    canvas: Canvas;
    keyboard: Keyboard;
  }) {
    super({
      initial: props.keyboard.endPercentage(new Coordinate({ x: 63, y: 0, })),
      size: props.keyboard.size.percentage(new Coordinate({ x: 15, y: 20, })),
    });
    this.lines = new Lines({
      initial: this.initial,
      size: this.size,
      canvas: props.canvas,
      fillStyle: "#21618C",
      strokeStyle: "#fff",
      lineWidth: 0.5
    });
    this.lines.addLine(new Coordinate({ x: 10, y: 50 }));
    this.lines.addLine(new Coordinate({ x: 30, y: 20 }));
    this.lines.addLine(new Coordinate({ x: 90, y: 20 }));
    this.lines.addLine(new Coordinate({ x: 90, y: 80 }));
    this.lines.addLine(new Coordinate({ x: 30, y: 80 }));
    this.lines.addLine(new Coordinate({ x: 10, y: 50 }));
    this.character = new Text({
      initial: this.endPercentage(new Coordinate({ x: 50, y: 15 })),
      size: this.size.percentage(new Coordinate({ x: 15, y: 100 })),
      canvas: props.canvas,
      value: "X",
      fillStyle: "#fff",
      strokeStyle: false,
      dungeonFont: true
    });
    this.keyboard = props.keyboard;
  }

  touchstartDelete(touch: Coordinate) {
    const inside = this.insideCoordinate(touch);
    if (inside === false) return;
    this.deleteLastCharacter();
  }

  deleteLastCharacter() {
    this.startTouch = new Date().getTime();
    if (this.keyboard.target === false) return;
    this.keyboard.target.deleteLastCharacter();
  }

  touchmoveDelete(touch: Coordinate) {
    const inside = this.insideCoordinate(touch);
    if (inside === true) return;
    this.startTouch = false;
  }

  touchendDelete() {
    if (this.startTouch === false) return false;
    this.startTouch = false;
    return true;
  }

  holdDown() {
    if (this.startTouch === false) return;
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