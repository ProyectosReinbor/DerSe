import type { Plane } from "./plane";
import type { Size } from "./size";

export type OccupiedBoxes = true | boolean[][];

export class Box {
    size: Size;
    length: Plane;
    occupiedBoxes: OccupiedBoxes;
    constructor(props: {
        size: Size;
        length: Plane;
        occupiedBoxes: OccupiedBoxes;
    }) {
        this.size = props.size;
        this.length = props.length;
        this.occupiedBoxes = props.occupiedBoxes;
    }
}