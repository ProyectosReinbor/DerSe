import type { Canvas_ENGINE } from "./canvas";
import type { Vector3_ENGINE } from "./vector3";

export class Scene_ENGINE {

    protected _canvas: Canvas_ENGINE;
    protected _draw: () => void = () => { }
    public get draw(): () => void {
        return this._draw;
    }
    protected _touchstart: (touch: Vector3_ENGINE) => void = () => { }
    protected _touchmove: (touch: Vector3_ENGINE) => void = () => { }
    protected _touchend: (touch: Vector3_ENGINE) => void = () => { }

    constructor(canvas: Canvas_ENGINE) {
        this._canvas = canvas;
    }

    public start(): void {
        this._canvas.start(this);
    }
}