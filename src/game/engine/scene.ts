import { Canvas } from "./canvas";
import { Position } from "./position";

export class Scene {
    canvas: Canvas;

    constructor(
        canvas: Canvas,
    ) {
        this.canvas = canvas;
    }

    start(): void {
        this.canvas.start(
            () => this.draw(),
            (touch: Position) => this.touchstart(touch),
            (touch: Position) => this.touchmove(touch),
            (touch: Position) => this.touchend(touch),
        );
    }

    draw(): void { }
    touchstart(touch: Position): void { }
    touchmove(touch: Position): void { }
    touchend(touch: Position): void { }
}