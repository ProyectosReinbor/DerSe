import { Keys_ENGINE } from "./keyboard/keys";
import { Shift_ENGINE } from "./keyboard/shift";
import { Enter_ENGINE } from "./keyboard/enter";
import { Space_ENGINE } from "./keyboard/space";
import { Delete_ENGINE } from "./keyboard/delete";
import { CloseQuestion_ENGINE } from "./keyboard/closeQuestion";
import { Finish_ENGINE } from "./keyboard/finish";
import { Square_ENGINE } from "./square";
import type { Canvas_ENGINE } from "./canvas";
import { Coordinate_ENGINE } from "./coordinate";
import { Size_ENGINE } from "./size";
import type { Input_ENGINE } from "./input";

export class Keyboard_ENGINE extends Square_ENGINE {

  input: Input_ENGINE | false = false;
  shiftKeys: Keys_ENGINE[];
  keys: Keys_ENGINE[];
  shift: Shift_ENGINE;
  enter: Enter_ENGINE;
  space: Space_ENGINE;
  delete: Delete_ENGINE;
  closeQuestion: CloseQuestion_ENGINE;
  finish: Finish_ENGINE;

  constructor(canvas: Canvas_ENGINE) {
    super(
      new Coordinate_ENGINE(5, 35),
      new Size_ENGINE(90, 60),
      canvas,
      "#21618C",
      false,
      0,
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
    this.shift = new Shift_ENGINE(canvas, this);
    this.enter = new Enter_ENGINE(canvas, this);
    this.space = new Space_ENGINE(canvas, this);
    this.delete = new Delete_ENGINE(canvas, this);
    this.closeQuestion = new CloseQuestion_ENGINE(canvas, this);
    this.finish = new Finish_ENGINE(canvas, this);
  }

  getKeys(keys: string[]) {
    const size = this.size.getPercentages(
      new Size_ENGINE(97, 80)
    );
    size.height /= keys.length;
    return keys.map((characters, index) => {
      const left = size.aPercent.width * index;
      const nextIndex = index + 1;
      const top = size.height * nextIndex;
      return new Keys_ENGINE(
        this.leftUp.x + left,
        this.leftUp.y + top,
        this.canvas,
        characters,
        {
          size,
          text: {
            size: new Size_ENGINE(0, 9),
          },
          keyPress: (character: string) => {
            if (this.input === false) return;
            this.input.addChar(character);
          }
        }
      )
    });
  }

  touchstartKeyboard(touch: Coordinate_ENGINE) {
    if (this.input === false)
      return;

    this.delete.touchstartDelete(touch);
  }

  touchmoveKeyboard(touch: Coordinate_ENGINE) {
    if (this.input === false)
      return;

    this.delete.touchmoveDelete(touch);
  }

  touchendKeyboard(touch: Coordinate_ENGINE) {
    if (this.input === false)
      return;

    if (this.delete.touchendDelete() === true)
      return;

    if (this.space.touchendSpace(touch) === true)
      return;

    if (this.shift.touchendShift(touch) === true)
      return;

    if (this.closeQuestion.touchendCloseQuestion(touch) === true)
      return;

    if (this.finish.touchendFinish(touch) === true)
      return;

    if (this.enter.touchendEnter(touch) === true)
      return;

    if (this.shift.uppercase === true) {
      const touchendKeys = this.shiftKeys.some(
        keys => keys.touchendKeys(touch)
      );
      if (touchendKeys === true)
        return;

    }
    else if (this.shift.uppercase === false) {
      const touchendKeys = this.keys.some(
        keys => keys.touchendKeys(touch)
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