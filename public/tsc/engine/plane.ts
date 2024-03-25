export class Plane_ENGINE {

    horizontal: number;
    vertical: number;

    constructor(props: {
        horizontal: number;
        vertical: number;
    }) {
        this.horizontal = props.horizontal;
        this.vertical = props.vertical;
    }
}