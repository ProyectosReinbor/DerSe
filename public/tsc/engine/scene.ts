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
        await this.canvas.start({
            drawScene: () => this.draw(),
            touchstartScene: (touch: Coordinate_ENGINE) => this.touchstart(touch),
            touchmoveScene: (touch: Coordinate_ENGINE) => this.touchmove(touch),
            touchendScene: (touch: Coordinate_ENGINE) => this.touchend(touch),
        });
    }
}