import type { Canvas } from "../canvas";
import { Coordinate } from "../coordinate";
import type { Keyboard } from "../keyboard";
import { Lines } from "../lines";
import { Position } from "../position";
import { Size } from "../size";
import { Text } from "../text";


export class Delete extends Position {
  startTouch: number | null = null;
  lines: Lines;
  character: Text;
  keyboard: Keyboard;
  constructor(
    canvas: Canvas,
    keyboard: Keyboard,
  ) {
    super(
      new Coordinate(
        keyboard.initial.x + (keyboard.size.width * 0.63),
        keyboard.initial.y,
      ),
      new Size(
        keyboard.size.width * 0.15,
        keyboard.size.height * 0.2,
      )
    );
    this.startTouch = null;
    this.lines = new Lines(
      canvas,
      "#21618C",
      "#fff",
      0.5
    );
    this.lines.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.1),
      this.initial.y + (this.size.height * 0.5),
    ));
    this.lines.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.3),
      this.initial.y + (this.size.height * 0.2),
    ));
    this.lines.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.9),
      this.initial.y + (this.size.height * 0.2),
    ));
    this.lines.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.9),
      this.initial.y + (this.size.height * 0.8),
    ));
    this.lines.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.3),
      this.initial.y + (this.size.height * 0.8),
    ));
    this.lines.addLine(new Coordinate(
      this.initial.x + (this.size.width * 0.1),
      this.initial.y + (this.size.height * 0.5),
    ));
    this.character = new Text(
      new Coordinate(
        this.initial.x + (this.size.width * 0.50),
        this.initial.y + (this.size.height * 0.15),
      ),
      new Size(
        this.size.width * 0.15,
        9,
      ),
      canvas,
      "X",
      "#fff",
    );
    this.keyboard = keyboard;
  }

  touchstartDelete(touch: Coordinate) {
    const inside = this.insideCoordinate(touch);
    if (inside === false) return;
    this.deleteLastCharacter();
  }

  deleteLastCharacter() {
    this.startTouch = new Date().getTime();
    if (this.keyboard.target === null) return;
    this.keyboard.target.deleteLastCharacter();
  }

  touchmoveDelete(touch: Coordinate) {
    const inside = this.insideCoordinate(touch);
    if (inside === true) return;
    this.startTouch = null;
  }

  touchendDelete() {
    if (this.startTouch === null) return false;
    this.startTouch = null;
    return true;
  }

  holdDown() {
    if (this.startTouch === null) return;
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