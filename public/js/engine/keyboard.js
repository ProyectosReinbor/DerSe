import { Rect } from "./rect.js";
import { CloseQuestion } from "./keyboard/closeQuestion.js";
import { Delete } from "./keyboard/delete.js";
import { Enter } from "./keyboard/enter.js";
import { Finish } from "./keyboard/finish.js";
import { Keys } from "./keyboard/keys.js";
import { Shift } from "./keyboard/shift.js";
import { Space } from "./keyboard/space.js";
import { Position } from "./position.js";

export class Keyboard extends Rect {
  constructor(canvas) {
    super(
      5,
      35,
      90,
      60,
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

  getKeys(keys) {
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
        (character) =>
          this.target.addChar(character)
      );
    });
  }

  touchstartKeyboard(x, y) {
    this.delete.touchstartDelete(x, y);
  }

  touchmoveKeyboard(x, y) {
    this.delete.touchmoveDelete(x, y);
  }

  touchendKeyboard(x, y) {
    if (this.target === null) return;
    if (this.delete.touchendDelete() === true) return;
    if (this.space.touchendSpace(x, y) === true) return;
    if (this.shift.touchendShift(x, y) === true) return;
    if (this.closeQuestion.touchendCloseQuestion(x, y) === true) return;
    if (this.finish.touchendFinish(x, y) === true) return;
    if (this.enter.touchendEnter(x, y) === true) return;

    if (this.shift.uppercase === true) {
      const touchendKeys = this.shiftKeys.some(keys => keys.touchendKeys(x, y));
      if (touchendKeys === true) return;
    }
    else if (this.shift.uppercase === false) {
      const touchendKeys = this.keys.some(keys => keys.touchendKeys(x, y));
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