import type { Canvas } from "../canvas";
import { Coordinate } from "../coordinate";
import type { Keyboard } from "../keyboard";
import { Lines } from "../lines";
import { Rect } from "../rect";
import { Size } from "../size";


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
      initial: new Coordinate({
        x: props.keyboard.initial.x + (props.keyboard.size.width * 0.13),
        y: props.keyboard.initial.y + (props.keyboard.size.height * 0.03),
      }),
      size: new Size({
        width: props.keyboard.size.width * 0.12,
        height: props.keyboard.size.height * 0.14,
      }),
      fillStyle: "#21618C",
      strokeStyle: "#fff",
      lineWidth: 0.5,
    });
    this.triangle = new Lines({
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