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

    isEqualTo(props: {
        coordinate: Coordinate_ENGINE;
    }) {
        return this.x === props.coordinate.x &&
            this.y === props.coordinate.y;
    }
}