import { Keys_KEYBOARD } from "./keyboard/keys";
import { Shift_KEYBOARD } from "./keyboard/shift";
import { Enter_KEYBOARD } from "./keyboard/enter";
import { Space_KEYBOARD } from "./keyboard/space";
import { Delete_KEYBOARD } from "./keyboard/delete";
import { CloseQuestion } from "./keyboard/closeQuestion";
import { Finish } from "./keyboard/finish";
import { Key_KEYBOARD } from "./keyboard/key";
import { Square_ENGINE } from "./square";
import type { Canvas_ENGINE } from "./canvas";
import { Coordinate_ENGINE } from "./coordinate";
import { Size_ENGINE } from "./size";
import type { Input_ENGINE } from "./input";
import { Text_ENGINE } from "./text";

export class Keyboard_ENGINE extends Square_ENGINE {

  input: Input_ENGINE | false = false;
  shiftKeys: Keys_KEYBOARD[];
  keys: Keys_KEYBOARD[];
  shift: Shift_KEYBOARD;
  enter: Enter_KEYBOARD;
  space: Space_KEYBOARD;
  delete: Delete_KEYBOARD;
  closeQuestion: CloseQuestion;
  finish: Finish;

  constructor(props: {
    canvas: Canvas_ENGINE;
  }) {
    super({
      canvas: props.canvas,
      leftUp: new Coordinate_ENGINE({
        x: 5,
        y: 35
      }),
      size: new Size_ENGINE({
        width: 90,
        height: 60
      }),
      fillStyle: "#21618C",
      strokeStyle: false,
      lineWidth: 0,
    });
    this.shiftKeys = this.getKeys({
      keys: [
        "1234567890",
        "QWERTYUIOP",
        "ASDFGHJKL",
        "ZXCVBNM@.,"
      ]
    });
    this.keys = this.getKeys({
      keys: [
        "1234567890",
        "qwertyuiop",
        "asdfghjkl_",
        "zxcvbnm@.,"
      ]
    });
    this.shift = new Shift_KEYBOARD({
      canvas: props.canvas,
      keyboard: this
    });
    this.enter = new Enter_KEYBOARD({
      canvas: props.canvas,
      keyboard: this,
    });
    this.space = new Space_KEYBOARD({
      canvas: props.canvas,
      keyboard: this,
    });
    this.delete = new Delete_KEYBOARD({
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

  getKeys(props: {
    keys: string[];
  }): Keys_KEYBOARD[] {
    const size = this.size.getPercentages({
      percentages: new Size_ENGINE({
        width: 97,
        height: 80
      })
    });
    size.height /= props.keys.length;
    return props.keys.map((characters, index) => {
      const left = size.aPercent.width * index;
      const nextIndex = index + 1;
      const top = size.height * nextIndex;
      return new Keys_KEYBOARD({
        x: this.leftUp.x + left,
        y: this.leftUp.y + top,
        canvas: this.canvas,
        characters,
        keyDefault: new Key_KEYBOARD({
          canvas: this.canvas,
          leftUp: new Coordinate_ENGINE({ x: 0, y: 0 }),
          size,
          fillStyle: "#fff",
          strokeStyle: false,
          lineWidth: 0,
          text: new Text_ENGINE({
            canvas: this.canvas,
            leftUp: new Coordinate_ENGINE({
              x: 0,
              y: 0
            }),
            size: new Size_ENGINE({
              width: 0,
              height: 9
            }),
            value: characters,
            fillStyle: false,
            strokeStyle: false,
            dungeonFont: false,
          }),
          keyPress: (character: string) => {
            if (this.input === false) return;
            this.input.addChar(character);
          },
        })
      });
    });
  }

  touchstartKeyboard(props: {
    touch: Coordinate_ENGINE;
  }) {
    if (this.input === false)
      return;

    this.delete.touchstartDelete(props);
  }

  touchmoveKeyboard(props: {
    touch: Coordinate_ENGINE;
  }) {
    if (this.input === false)
      return;

    this.delete.touchmoveDelete(props);
  }

  touchendKeyboard(props: {
    touch: Coordinate_ENGINE;
  }) {
    if (this.input === false)
      return;

    if (this.delete.touchendDelete() === true)
      return;

    if (this.space.touchendSpace(props) === true)
      return;

    if (this.shift.touchendShift(props) === true)
      return;

    if (this.closeQuestion.touchendCloseQuestion(props) === true)
      return;

    if (this.finish.touchendFinish(props) === true)
      return;

    if (this.enter.touchendEnter(props) === true)
      return;

    if (this.shift.uppercase === true) {
      const touchendKeys = this.shiftKeys.some(
        keys => keys.touchendKeys(props)
      );
      if (touchendKeys === true)
        return;

    }
    else if (this.shift.uppercase === false) {
      const touchendKeys = this.keys.some(
        keys => keys.touchendKeys(props)
      );
      if (touchendKeys === true)
        return;

    }
  }

  drawKeyboard() {
    if (this.input === false)
      return;

    this.drawSquare();
    if (this.shift.uppercase === true)
      this.shiftKeys.forEach(
        keys => keys.drawKeys()
      );
    else if (this.shift.uppercase === false)
      this.keys.forEach(
        keys => keys.drawKeys()
      );

    this.delete.drawDelete();
    this.shift.drawShift();
    this.enter.drawEnter();
    this.space.drawButton();
    this.closeQuestion.drawButton();
    this.finish.drawFinish();
  }
}