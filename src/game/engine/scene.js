export class Scene {
    constructor(canvas) {
        this.canvas = canvas;
    }

    start() {
        this.canvas.start(
            () => this.draw(),
            (touch) => this.touchstart(touch),
            (touch) => this.touchmove(touch),
            (touch) => this.touchend(touch),
        );
    }

    draw() { }
    touchstart() { }
    touchmove() { }
    touchend() { }
}