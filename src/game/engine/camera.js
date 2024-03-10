import { Coordinate } from "./coordinate.js";
import { Position } from "./position.js";

export class Camera extends Position {

    constructor(
        initial: {
            x: number;
            y: number;
        }
    ) {
        super(
            {
                x: initial.x,
                y: initial.y,
            },
            {
                width: 100,
                height: 100,
            }
        );
    }

    insideCamera(position: Position): boolean {
        const vision = new Position(
            {
                x: this.initial.x - position.size.width,
                y: this.initial.y - position.size.height,
            },
            {
                width: this.size.width + (position.size.width * 2),
                height: this.size.height + (position.size.height * 2),
            }
        );
        return vision.inside(position);
    }

    positionOnCamera(position: Position): Position | false {
        const appearsInCamera = this.insideCamera(position);
        if (appearsInCamera === false) return false;
        return new Position(
            {
                x: position.initial.x - this.initial.x,
                y: position.initial.y - this.initial.y,
            },
            position.size
        );
    }

    focusPosition(
        initial: { x: number, y: number },
        size: { width: number, height: number }
    ) {
        let x = initial.x - (this.size.width / 2);
        x += size.width / 2;

        let y = initial.y - (this.size.height / 2);
        y += size.height / 2;

        this.initial.x = x;
        this.initial.y = y;
    }
}