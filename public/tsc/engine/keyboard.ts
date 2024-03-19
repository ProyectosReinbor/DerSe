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
import { Key } from "./keyboard/key";
import { Text } from "./text";

export class Keyboard extends Rect {
  target: Input | false = false;
  shiftKeys: Keys[];
  keys: Keys[];
  shift: Shift;
  enter: Enter;
  space: Space;
  delete: Delete;
  closeQuestion: CloseQuestion;
  finish: Finish;
  constructor(props: {
    canvas: Canvas;
  }) {
    super({
      canvas: props.canvas,
      initial: new Coordinate({
        x: 5,
        y: 35
      }),
      size: new Size({
        width: 90,
        height: 60
      }),
      fillStyle: "#21618C",
      strokeStyle: false,
      lineWidth: 0,
    });
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
    this.shift = new Shift({
      canvas: props.canvas,
      keyboard: this
    });
    this.enter = new Enter({
      canvas: props.canvas,
      keyboard: this,
    });
    this.space = new Space({
      canvas: props.canvas,
      keyboard: this,
    });
    this.delete = new Delete({
      canvas: props.canvas,
      keyboard: this,
    });
    this.closeQuestion = new CloseQuestion({
      canvas: props.canvas,
      keyboard: this,
    });
    this.finish = new Finish({
      canvas: props.canvas,
      keyboard: this,
    });
  }

  getKeys(keys: string[]): Keys[] {
    const size = this.size.percentage(new Coordinate({ x: 97, y: 80 }));
    size.height /= keys.length;
    return keys.map((characters, index) => {
      const left = size.aPercent.width * index;
      const nextIndex = index + 1;
      const top = size.height * nextIndex;
      return new Keys({
        x: this.initial.x + left,
        y: this.initial.y + top,
        canvas: this.canvas,
        characters,
        keyDefault: new Key({
          canvas: this.canvas,
          initial: new Coordinate({ x: 0, y: 0 }),
          size,
          fillStyle: "#fff",
          strokeStyle: false,
          lineWidth: 0,
          text: new Text({
            canvas: this.canvas,
            initial: new Coordinate({ x: 0, y: 0 }),
            size: new Size({ width: 0, height: 9 }),
            value: characters,
            fillStyle: false,
            strokeStyle: false,
            dungeonFont: false,
          }),
          keyPress: (character: string) => {
            if (this.target === false) return;
            this.target.addChar(character);
          },
        })
      });
    });
  }

  touchstartKeyboard(touch: Coordinate) {
    if (this.target === false) return;
    this.delete.touchstartDelete(touch);
  }

  touchmoveKeyboard(touch: Coordinate) {
    if (this.target === false) return;
    this.delete.touchmoveDelete(touch);
  }

  touchendKeyboard(touch: Coordinate) {
    if (this.target === false) return;
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
    if (this.target === false) return;
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