import type { Canvas } from "./canvas.js";
import type { Coordinate } from "./coordinate";

export class Scene {
    canvas: Canvas;
    draw() { }
    touchstart(touch: Coordinate) { }
    touchmove(touch: Coordinate) { }
    touchend(touch: Coordinate) { }
    constructor(
        canvas: Canvas
    ) {
        this.canvas = canvas;
    }

    start() {
        this.canvas.start(
            () => this.draw(),
            (touch: Coordinate) => this.touchstart(touch),
            (touch: Coordinate) => this.touchmove(touch),
            (touch: Coordinate) => this.touchend(touch),
        );
    }
}