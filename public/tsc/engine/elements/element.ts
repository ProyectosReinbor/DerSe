import { Coordinate } from "../coordinate";
import { Plane } from "../plane";
import { Position } from "../position";
import { Size } from "../size";

export class Element extends Position {
    constructor(
        size: Size,
        plane: Plane,
    ) {
        super(new Coordinate, size);
        this.horizontal = plane.horizontal;
        this.vertical = plane.vertical;
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