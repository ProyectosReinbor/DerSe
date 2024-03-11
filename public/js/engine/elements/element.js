import { Size } from "../size.js";

export class Element {
    constructor(
        sizeWidth,
        sizeHeight,
        horizontal,
        vertical
    ) {
        this.x = 0;
        this.y = 0;
        this.size = new Size(
            sizeWidth,
            sizeHeight,
        );
        this.horizontal = horizontal;
        this.vertical = vertical;
    }

    set horizontal(horizontal) {
        this.x = this.size.width * horizontal;
    }

    get horizontal() {
        return this.x / this.size.width;
    }

    set vertical(vertical) {
        this.y = this.size.height * vertical;
    }

    get vertical() {
        return this.y / this.size.height;
    }

    nextFrame(frames) {
        this.horizontal++;
        if (this.horizontal >= frames) this.horizontal = 0;
    }
}