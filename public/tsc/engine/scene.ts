import type { Canvas_ENGINE } from "./canvas";
import type { Coordinate_ENGINE } from "./coordinate";

export class Scene_ENGINE {

    canvas: Canvas_ENGINE;
    draw: () => void = () => { }
    touchstart: (touch: Coordinate_ENGINE) => void = () => { }
    touchmove: (touch: Coordinate_ENGINE) => void = () => { }
    touchend: (touch: Coordinate_ENGINE) => void = () => { }

    constructor(canvas: Canvas_ENGINE) {
        this.canvas = canvas;
    }

    async start() {
        await this.canvas.start(
            () => this.draw(),
            (touch: Coordinate_ENGINE) => this.touchstart(touch),
            (touch: Coordinate_ENGINE) => this.touchmove(touch),
            (touch: Coordinate_ENGINE) => this.touchend(touch),
        );
    }
}