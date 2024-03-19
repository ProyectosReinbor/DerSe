import { Coordinate } from "./coordinate";
import { Plane } from "./plane";
import { Position } from "./position";
import { Size } from "./size";

export class Element extends Position {
    constructor(props: {
        size: Size,
        plane: Plane,
    }) {
        super({
            initial: new Coordinate({ x: 0, y: 0 }),
            size: props.size,
        });
        this.horizontal = props.plane.horizontal;
        this.vertical = props.plane.vertical;
    }

    set horizontal(horizontal) {
        this.initial.x = this.size.width * horizontal;
    }

    get horizontal() {
        return this.initial.x / this.size.width;
    }

    set vertical(vertical) {
        this.initial.y = this.size.height * vertical;
    }

    get vertical() {
        return this.initial.y / this.size.height;
    }

    nextFrame(frames: number) {
        this.horizontal++;
        if (this.horizontal >= frames) this.horizontal = 0;
    }
}