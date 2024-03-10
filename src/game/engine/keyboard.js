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
      {
        x: 5,
        y: 35
      },
      {
        width: 90,
        height: 60
      },
      canvas,
      "#21618C",
    );
    this.target = false;
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
      this,
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
      const widthIndex = (width * 0.01) * index;
      const heightIndex = height * (index + 1);
      return new Keys(
        {
          x: this.initial.x + widthIndex,
          y: this.initial.y + heightIndex,
        },
        {
          width,
          height,
        },
        this.canvas,
        characters,
        {
          text: {
            size: {
              height: 10
            }
          }
        },
        (character: string) => {
          if (this.target === null) return;
          this.target.addChar(character);
        }
      );
    });
  }

  touchstartKeyboard(touch: Position): void {
    if (this.target === null) return;
    this.delete.touchstartDelete(touch);
  }

  touchmoveKeyboard(touch: Position): void {
    if (this.target === null) return;
    this.delete.touchmoveDelete(touch);
  }

  touchendKeyboard(touch: Position): void {
    if (this.target === null) return;
    if (this.delete.touchendDelete() === true) return;
    if (this.space.touchendSpace(touch) === true) return;
    if (this.shift.touchendShift(touch) === true) return;
    if (this.closeQuestion.touchendCloseQuestion(touch) === true) return;
    if (this.finish.touchendFinish(touch) === true) return;
    if (this.enter.touchendEnter(touch) === true) return;

    if (this.shift.mode === "uppercase") {
      const touchendKeys = this.shiftKeys.some(keys => keys.touchendKeys(touch));
      if (touchendKeys === true) return;
    }
    else if (this.shift.mode === "lowercase") {
      const touchendKeys = this.keys.some(keys => keys.touchendKeys(touch));
      if (touchendKeys === true) return;
    }
  }

  drawKeyboard() {
    if (this.target === null) return;
    this.drawRect();
    if (this.shift.mode === "uppercase") {
      this.shiftKeys.forEach(keys => keys.drawKeys());
    } else if (this.shift.mode === "lowercase") {
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