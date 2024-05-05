import type { Animation_ENGINE } from "./animation";
import { Animations_ENGINE } from "./animations";
import type { Canvas_ENGINE } from "./canvas";
import { Direction_ENGINE } from "./character/direction";
import type { FillStyle, StrokeStyle } from "./context";
import { Coordinate_ENGINE } from "./coordinate";
import type { Element_ENGINE } from "./element";
import type { PathImage_ENGINE } from "./image";
import { Size_ENGINE } from "./size";
import { Square_ENGINE } from "./square";

export class Character_ENGINE extends Square_ENGINE {

    _scale: Size_ENGINE;
    _animations: Animations_ENGINE;
    _speed: Coordinate_ENGINE;
    _direction: Direction_ENGINE;

    constructor(
        _leftUp: Coordinate_ENGINE,
        _size: Size_ENGINE,
        _canvas: Canvas_ENGINE,
        _fillStyle: FillStyle,
        _strokeStyle: StrokeStyle,
        _lineWidth: number,
        _scale: Size_ENGINE,
        _animations: {
            route: PathImage_ENGINE | false;
            element: Element_ENGINE;
            animation: Animation_ENGINE;
        },
        _speed: Coordinate_ENGINE,
        _direction: Direction_ENGINE,
    ) {
        super(
            _leftUp,
            _size,
            _canvas,
            _fillStyle,
            _strokeStyle,
            _lineWidth,
        );
        this._scale = _scale;
        this._canvas = _canvas;
        this._animations = new Animations_ENGINE(
            new Coordinate_ENGINE(0, 0),
            new Size_ENGINE(0, 0),
            _canvas,
            _animations.route,
            _animations.element,
            _animations.animation
        );
        this._speed = _speed;
        this._direction = _direction;
    }

    movedCharacter(): Coordinate_ENGINE | false {
        if (this._direction.isEqualTo(
            new Direction_ENGINE("center", "center")
        ))
            return false;

        const secondsBetweenFrames = this._canvas.timeBetweenFrames / 1000;
        const speedX = this._speed.x * secondsBetweenFrames;
        const speedY = this._speed.y * secondsBetweenFrames;
        const distanceX = speedX * this._direction.numberX;
        const distanceY = speedY * this._direction.numberY;
        const newX = this.leftUp.x + distanceX;
        const newY = this.leftUp.y + distanceY;
        return new Coordinate_ENGINE(newX, newY);
    }

    drawCharacter() {
        this.drawSquare();
        this._animations = new Animations_ENGINE(
            new Coordinate_ENGINE(
                this.leftUp.x + (this.size.width / 2) - (this._animations.size.width / 2),
                this.leftUp.y + (this.size.height / 2) - (this._animations.size.height / 2)
            ),
            new Size_ENGINE(
                this._scale.width * this.size.width,
                this._scale.height * this.size.height
            ),
            this._canvas,
            this._animations.route,
            this._animations.element,
            this._animations.animation
        );

        this._animations.drawAnimation();
    }
}