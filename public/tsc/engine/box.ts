import { Coordinate } from "./coordinate";
import { Position } from "./position";
import type { Size } from "./size";

export class Box extends Position {

    referenceIndex: number;

    constructor(props: {
        initial: Coordinate;
        size: Size;
        referenceIndex: number;
    }) {
        super(props);
        this.referenceIndex = props.referenceIndex;
    }
}