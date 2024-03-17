import type { Plane } from "./plane";
import type { Size } from "./size";

export class Box {
    size: Size;
    length: Plane;
    occupiedBoxes: true | boolean[][];
    constructor(
        size: Size,
        length: Plane,
        occupiedBoxes: true | boolean[][],
    ) {
        this.size = size;
        this.length = length;
        this.occupiedBoxes = occupiedBoxes;
    }
}