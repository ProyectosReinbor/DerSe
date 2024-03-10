import { Size } from "../size.js";

export class Element {

    x: number = 0;
    y: number = 0;
    size: Size;

    constructor(
        size: {
            width: number;
            height: number;
        },
        horizontal: number,
        vertical: number
    ) {
        this.size = new Size(
            size.width,
            size.height,
        );
        this.horizontal = horizontal;
        this.vertical = vertical;
    }

    set horizontal(horizontal: number) {
        this.x = this.size.width * horizontal;
    }

    get horizontal(): number {
        return this.x / this.size.width;
    }

    set vertical(vertical: number) {
        this.y = this.size.height * vertical;
    }

    get vertical(): number {
        return this.y / this.size.height;
    }

    nextFrame(frames: number) {
        this.horizontal++;
        if (this.horizontal >= frames) this.horizontal = 0;
    }
}