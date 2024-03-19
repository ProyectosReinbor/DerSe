import type { Canvas } from "../canvas";
import { Coordinate } from "../coordinate";
import type { Keyboard } from "../keyboard";
import { Lines } from "../lines";
import { Rect } from "../rect";


export class Enter extends Rect {
  triangle: Lines;
  lines: Lines;
  keyboard: Keyboard;
  constructor(props: {
    canvas: Canvas;
    keyboard: Keyboard;
  }) {
    super({
      canvas: props.canvas,
      initial: props.keyboard.endPercentage(new Coordinate({ x: 13, y: 3 })),
      size: props.keyboard.size.percentage(new Coordinate({ x: 12, y: 14 })),
      fillStyle: "#21618C",
      strokeStyle: "#fff",
      lineWidth: 0.5,
    });
    this.triangle = new Lines({
      initial: this.initial,
      size: this.size,
      canvas: props.canvas,
      fillStyle: "#fff",
      strokeStyle: false,
      lineWidth: 0
    });
    this.triangle.addLine(new Coordinate({
      x: this.initial.x + (this.size.width * 0.1),
      y: this.initial.y + (this.size.height * 0.6),
    }));
    this.triangle.addLine(new Coordinate({
      x: this.initial.x + (this.size.width * 0.3),
      y: this.initial.y + (this.size.height * 0.4),
    }));
    this.triangle.addLine(new Coordinate({
      x: this.initial.x + (this.size.width * 0.3),
      y: this.initial.y + (this.size.height * 0.8),
    }));
    this.triangle.addLine(new Coordinate({
      x: this.initial.x + (this.size.width * 0.1),
      y: this.initial.y + (this.size.height * 0.6),
    }));
    this.lines = new Lines({
      initial: this.initial,
      size: this.size,
      canvas: props.canvas,
      fillStyle: false,
      strokeStyle: "#fff",
      lineWidth: 0.5,
    });
    this.lines.addLine(new Coordinate({
      x: this.initial.x + (this.size.width * 0.2),
      y: this.initial.y + (this.size.height * 0.6),
    }));
    this.lines.addLine(new Coordinate({
      x: this.initial.x + (this.size.width * 0.8),
      y: this.initial.y + (this.size.height * 0.6),
    }));
    this.lines.addLine(new Coordinate({
      x: this.initial.x + (this.size.width * 0.8),
      y: this.initial.y + (this.size.height * 0.2),
    }));
    this.keyboard = props.keyboard;
  }

  touchendEnter(touch: Coordinate) {
    if (this.insideCoordinate(touch) === false) return false;
    if (this.keyboard.target === false) return false;
    this.keyboard.target.addLineBreak();
    return true;
  }

  drawEnter() {
    this.drawRect();
    this.triangle.drawLines();
    this.lines.drawLines();
  }
}