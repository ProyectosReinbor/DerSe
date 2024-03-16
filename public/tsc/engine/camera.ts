import { Coordinate } from "./coordinate";
import { Position } from "./position";
import { Size } from "./size";

export class Camera extends Position {
    constructor(initial: Coordinate) {
        super(
            initial,
            new Size(100, 100)
        );
    }

    insideCamera(position: Position) {
        const vision = new Position(
            new Coordinate(
                this.initial.x - position.size.width,
                this.initial.y - position.size.height,
            ),
            new Size(
                this.size.width + (position.size.width * 2),
                this.size.height + (position.size.height * 2),
            )
        );
        return vision.inside(position);
    }

    positionOnCamera(position: Position) {
        const appearsInCamera = this.insideCamera(position);
        if (appearsInCamera === false) return false;
        return new Position(
            new Coordinate(
                position.initial.x - this.initial.x,
                position.initial.y - this.initial.y,
            ),
            new Size(
                position.size.width,
                position.size.height
            )
        );
    }

    focusPosition(position: Position) {
        let x = position.initial.x - (this.size.width / 2);
        x += position.size.width / 2;

        let y = position.initial.y - (this.size.height / 2);
        y += position.size.height / 2;

        this.initial.x = x;
        this.initial.y = y;
    }
}