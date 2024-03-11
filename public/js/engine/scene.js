export class Scene {
    constructor(canvas) {
        this.canvas = canvas;
    }

    start() {
        this.canvas.start(
            () => this.draw(),
            (x, y) => this.touchstart(x, y),
            (x, y) => this.touchmove(x, y),
            (x, y) => this.touchend(x, y),
        );
    }

    draw() { }
    touchstart() { }
    touchmove() { }
    touchend() { }
}