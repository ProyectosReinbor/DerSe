export class Coordinate {
    x: number;
    y: number;
    constructor(props: {
        x: number;
        y: number;
    }) {
        this.x = props.x;
        this.y = props.y;
    }

    equals(coordinate: Coordinate) {
        return this.x === coordinate.x &&
            this.y === coordinate.y;
    }
}