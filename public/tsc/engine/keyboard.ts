import type { Canvas } from "./canvas";
import { Coordinate } from "./coordinate";
import { Size } from "./size";
import { Rect } from "./rect";
import type { Input } from "./input";
import { Keys } from "./keyboard/keys";
import { Shift } from "./keyboard/shift";
import { Enter } from "./keyboard/enter";
import { Space } from "./keyboard/space";
import { Delete } from "./keyboard/delete";
import { CloseQuestion } from "./keyboard/closeQuestion";
import { Finish } from "./keyboard/finish";

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
    const size = new Size(
      this.size.width * 0.97,
      (this.size.height * 0.8) / keys.length
    );
    return keys.map((characters, index) => {
      const leftIndex = (size.width * 0.01) * index;
      const topIndex = size.height * (index + 1);
      return new Keys(
        this.initial.x + leftIndex,
        this.initial.y + topIndex,
        this.canvas,
        characters,
        {
          size,
          text: {
            size: new Size(0, 10),
          }
        },
        (character: string) => {
          if (this.target === null) return;
          this.target.addChar(character);
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