import type { Canvas_ENGINE } from "./canvas";
import { Vector3_ENGINE } from "./vector3";

type TouchInput_ENGINE = "start" | "move" | "end" | false;

export class Input_ENGINE {
    // #region touch
    private _canvas: Canvas_ENGINE;

    private _touch: TouchInput_ENGINE = false;
    public get touch(): TouchInput_ENGINE {
        return this._touch;
    }

    private _touchCoordinates: Vector3_ENGINE[] = [];
    public get touchCoordinates(): Vector3_ENGINE[] {
        return this._touchCoordinates;
    }

    private _TouchCoordinate(_touch: Touch | null) {
        if (_touch === null)
            return false;

        const left = this._canvas.margin.width / 2;
        const top = this._canvas.margin.height / 2;
        return new Vector3_ENGINE(
            _touch.pageX - left,
            _touch.pageY - top,
            0
        );
    }

    private _SetCoordinatesTouches(
        _event: TouchEvent
    ): void {
        this._touchCoordinates = [];
        for (
            let index = 0;
            index < _event.changedTouches.length;
            index++
        ) {
            const touch = _event.changedTouches.item(index);
            const coordinate = this._TouchCoordinate(touch);
            if (coordinate === false)
                continue;

            this._touchCoordinates[index] = coordinate;
        }
    }

    private _Touchstart(
        _event: TouchEvent
    ): void {
        _event.preventDefault();
        this._touch = "start";
        this._SetCoordinatesTouches(_event);
    };

    private _Touchmove(
        _event: TouchEvent
    ): void {
        _event.preventDefault();
        this._touch = "move";
        this._SetCoordinatesTouches(_event);
    };

    private _Touchend(
        _event: TouchEvent
    ): void {
        _event.preventDefault();
        this._touch = "end";
        this._SetCoordinatesTouches(_event);
    };

    // #region keyboard
    private _keys: string[] = [];
    public get keys() {
        return this._keys;
    }

    private _Keydown(
        _event: KeyboardEvent
    ): void {
        if (this._keys.includes(_event.key))
            return;

        this._keys.push(_event.key);
    };

    private _Keyup(
        _event: KeyboardEvent
    ): void {
        this._keys = this._keys.filter(
            key => key !== _event.key
        );
    };

    constructor(
        _canvas: Canvas_ENGINE
    ) {
        this._canvas = _canvas;
        this._canvas.element.addEventListener(
            "touchstart",
            (event) => this._Touchstart(event),
        );
        this._canvas.element.addEventListener(
            "touchmove",
            (event) => this._Touchmove(event),
        );
        this._canvas.element.addEventListener(
            "touchend",
            (event) => this._Touchend(event)
        );

        this._canvas.element.addEventListener(
            "keydown",
            (event) => this._Keydown(event)
        );
        this._canvas.element.addEventListener(
            "keyup",
            (event) => this._Keyup(event)
        );
    }

    update() {
        this._touch = false;
    }
}