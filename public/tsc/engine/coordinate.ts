export class Coordinate_ENGINE {

    public x: number;
    public y: number;

    constructor(
        _x: number,
        _y: number
    ) {
        this.x = _x;
        this.y = _y;
    }

    isEqualTo(coordinate: Coordinate_ENGINE) {
        return this.x === coordinate.x &&
            this.y === coordinate.y;
    }
}