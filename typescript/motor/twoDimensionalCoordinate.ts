export class TwoDimensionalCoordinate {

    x: number;
    y: number;

    constructor(
        x: number,
        y: number,
    ) {
        this.x = x;
        this.y = y;
    }

    equalTo(
        target?: TwoDimensionalCoordinate,
        x?: number,
        y?: number
    ) {
        if (target === undefined) {
            if (x === undefined || y === undefined)
                throw new Error("x or y undefined");

            target = new TwoDimensionalCoordinate(x, y);
        }
        return this.x === target.x &&
            this.y === target.y;
    }
}