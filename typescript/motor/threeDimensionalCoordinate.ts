import { TwoDimensionalCoordinate } from "./twoDimensionalCoordinate";

export class ThreeDimensionalCoordinate extends TwoDimensionalCoordinate {
    z: number;

    constructor(
        x: number,
        y: number,
        z: number,
    ) {
        super(x, y);
        this.z = z;
    }

    override equalTo(
        target?: ThreeDimensionalCoordinate,
        x?: number,
        y?: number,
        z?: number
    ) {
        if (target === undefined) {
            if (x === undefined || y === undefined || z === undefined)
                throw new Error("x, y or z are undefined");

            target = new ThreeDimensionalCoordinate(x, y, z);
        }
        return super.equalTo(target)
            && this.z === target.z;
    }
}