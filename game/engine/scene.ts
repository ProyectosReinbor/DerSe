import type { Canvas_ENGINE } from "./canvas";
import type { Coordinate_ENGINE } from "./coordinate";

export class Scene_ENGINE {

    private _canvas: Canvas_ENGINE;
    private _draw: () => void = () => { }
    private _touchstart: (touch: Coordinate_ENGINE) => void = () => { }
    private _touchmove: (touch: Coordinate_ENGINE) => void = () => { }
    private _touchend: (touch: Coordinate_ENGINE) => void = () => { }

    constructor(canvas: Canvas_ENGINE) {
        this._canvas = canvas;
    }

    public start(): void {
        this._canvas.start(
            () => this._draw(),
            (touch: Coordinate_ENGINE) => this._touchstart(touch),
            (touch: Coordinate_ENGINE) => this._touchmove(touch),
            (touch: Coordinate_ENGINE) => this._touchend(touch),
        );
    }
}