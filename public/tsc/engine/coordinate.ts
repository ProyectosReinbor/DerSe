export class Coordinate_ENGINE {
    x: number;
    y: number;
    constructor(props: {
        x: number;
        y: number;
    }) {
        this.x = props.x;
        this.y = props.y;
    }

    isEqualTo(coordinate: Coordinate_ENGINE) {
        return this.x === coordinate.x &&
            this.y === coordinate.y;
    }
}