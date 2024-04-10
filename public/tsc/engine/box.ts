import type { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import type { Size_ENGINE } from "./size";

export class Box_ENGINE extends Position_ENGINE {

    private referenceIndex: number;

    constructor(
        leftUp: Coordinate_ENGINE,
        size: Size_ENGINE,
        referenceIndex: number,
    ) {
        super(
            leftUp,
            size,
        );
        this.referenceIndex = referenceIndex;
    }

    getReferenceIndex(): number {
        return this.referenceIndex;
    }
}