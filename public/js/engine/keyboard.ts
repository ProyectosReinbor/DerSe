import { Rect } from "./rect.js";
import { CloseQuestion } from "./keyboard/closeQuestion.js";
import { Delete } from "./keyboard/delete.js";
import { Enter } from "./keyboard/enter.js";
import { Finish } from "./keyboard/finish.js";
import { Keys } from "./keyboard/keys.js";
import { Shift } from "./keyboard/shift.js";
import { Space } from "./keyboard/space.js";
import { Position } from "./position.js";
import type { Canvas } from "./canvas.js";
import { Coordinate } from "./coordinate.js";
import { Size } from "./size.js";
import type { Input } from "./input.js";

export class Keyboard extends Rect {
  target: Input | null = null;
  shiftKeys: Keys[];
  keys: Keys[];
  shift: Shift;
  enter: Enter;
  space: Space;
  delete: Delete;
  closeQuestion: CloseQuestion;
  finish: Finish;
  constructor(
    canvas: Canvas,
  ) {
    super(
      new Coordinate(5, 35),
      new Size(90, 60),
      canvas,
      "#21618C",
    );
    this.shiftKeys = this.getKeys([
      "1234567890",
      "QWERTYUIOP",
      "ASDFGHJKL",
      "ZXCVBNM@.,"
    ]);
    this.keys = this.getKeys([
      "1234567890",
      "qwertyuiop",
      "asdfghjkl_",
      "zxcvbnm@.,"
    ]);
    this.shift = new Shift(
      canvas,
      this
    );
    this.enter = new Enter(
      canvas,
      this,
    );
    this.space = new Space(
      canvas,
      this,
    );
    this.delete = new Delete(
      canvas,
      this,
    );

    this.closeQuestion = new CloseQuestion(
      canvas,
      this,
    );

    this.finish = new Finish(
      canvas,
      this,
    );
  }

  getKeys(keys: string[]) {
    const width = (this.size.width * 0.97);
    const height = (this.size.height * 0.8) / keys.length;
    return keys.map((characters, index) => {
      const leftIndex = (width * 0.01) * index;
      const topIndex = height * (index + 1);
      return new Keys(
        this.initial.x + leftIndex,
        this.initial.y + topIndex,
        width,
        height,
        this.canvas,
        characters,
        10,
        (character: string) => {
          if (this.target === null) return;
          this.target.addChar(character)
        }
      );
    });
  }

  touchstartKeyboard(touch: Coordinate) {
    this.delete.touchstartDelete(touch);
  }

  touchmoveKeyboard(touch: Coordinate) {
    this.delete.touchmoveDelete(touch);
  }

  touchendKeyboard(touch: Coordinate) {
    if (this.target === null) return;
    if (this.delete.touchendDelete() === true) return;
    if (this.space.touchendSpace(touch) === true) return;
    if (this.shift.touchendShift(touch) === true) return;
    if (this.closeQuestion.touchendCloseQuestion(touch) === true) return;
    if (this.finish.touchendFinish(touch) === true) return;
    if (this.enter.touchendEnter(touch) === true) return;

    if (this.shift.uppercase === true) {
      const touchendKeys = this.shiftKeys.some(keys => keys.touchendKeys(touch));
      if (touchendKeys === true) return;
    }
    else if (this.shift.uppercase === false) {
      const touchendKeys = this.keys.some(keys => keys.touchendKeys(touch));
      if (touchendKeys === true) return;
    }
  }

  drawKeyboard() {
    if (this.target === null) return;
    this.drawRect();
    if (this.shift.uppercase === true) {
      this.shiftKeys.forEach(keys => keys.drawKeys());
    } else if (this.shift.uppercase === false) {
      this.keys.forEach(keys => keys.drawKeys());
    }
    this.delete.drawDelete();
    this.shift.drawShift();
    this.enter.drawEnter();
    this.space.drawButton();
    this.closeQuestion.drawButton();
    this.finish.drawFinish();
  }
}