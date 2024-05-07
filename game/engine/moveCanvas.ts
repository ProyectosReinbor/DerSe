import type { Canvas_ENGINE } from "./canvas";
import type { Coordinate_ENGINE } from "./coordinate";

export class MoveCanvas {

  _touch: Coordinate_ENGINE | false = false;
  _moved: boolean = false;
  _canvas: Canvas_ENGINE;
  _moveHorizontal: boolean;
  _moveVertical: boolean;

  constructor(
    _canvas: Canvas_ENGINE,
    _moverHorizontal: boolean,
    _moverVertical: boolean,
  ) {
    this._canvas = _canvas;
    this._moveHorizontal = _moverHorizontal;
    this._moveVertical = _moverVertical;
  }

  touchstartMoveCamera(
    touch: Coordinate_ENGINE
  ) {
    this._moved = false;
    this._touch = touch;
  }

  touchmoveMoveCamera(
    touch: Coordinate_ENGINE
  ): boolean {
    if (this._touch === false)
      return false;

    let moved = false;

    if (this._moveHorizontal === true) {
      const distance = this._touch.x - touch.x;
      if (distance > 5 || distance < -5) {
        this._canvas.leftUp.x += distance;
        this._touch.x = touch.x;
        moved = true;
      }
    }

    if (this._moveVertical === true) {
      const distance = this._touch.y - touch.y;
      if (distance > 5 || distance < -5) {
        this._canvas.leftUp.y += distance;
        this._touch.y = touch.y;
        moved = true;
      }
    }

    if (moved === true)
      this._moved = true;

    return this._moved;
  }

  touchendTouchCamera(): boolean {
    this._touch = false;
    return this._moved;
  }
}