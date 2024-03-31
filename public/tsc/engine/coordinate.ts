export class Coordinate_ENGINE {

    x: number;
    y: number;

    constructor(
        x: number,
        y: number,
    ) {
        this.x = x;
        this.y = y;
    }

    isEqualTo(
        coordinate: Coordinate_ENGINE
    ) {
        return this.x === coordinate.x &&
            this.y === coordinate.y;
    }
}