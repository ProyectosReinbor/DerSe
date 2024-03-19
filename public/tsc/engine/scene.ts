import type { Canvas } from "./canvas";
import type { Coordinate } from "./coordinate";

export class Scene {
    canvas: Canvas;
    draw: () => void = () => { }
    touchstart: (touch: Coordinate) => void = () => { }
    touchmove: (touch: Coordinate) => void = () => { }
    touchend: (touch: Coordinate) => void = () => { }
    constructor(props: {
        canvas: Canvas;
    }) {
        this.canvas = props.canvas;
    }

    async start() {
        await this.canvas.start(
            () => this.draw(),
            (touch: Coordinate) => this.touchstart(touch),
            (touch: Coordinate) => this.touchmove(touch),
            (touch: Coordinate) => this.touchend(touch),
        );
    }
}