import { Coordinate } from "./coordinate";
import { Position } from "./position";
import { Size } from "./size";

export class Camera extends Position {
    constructor(props: { initial: Coordinate }) {
        super({
            initial: props.initial,
            size: new Size({ width: 100, height: 100 })
        });
    }

    insideCamera(position: Position) {
        const vision = new Position({
            initial: new Coordinate({
                x: this.initial.x - position.size.width,
                y: this.initial.y - position.size.height,
            }),
            size: new Size({
                width: this.size.width + (position.size.width * 2),
                height: this.size.height + (position.size.height * 2),
            })
        });
        return vision.inside(position);
    }

    positionOnCamera(position: Position) {
        const appearsInCamera = this.insideCamera(position);
        if (appearsInCamera === false) return false;
        return new Position({
            initial: new Coordinate({
                x: position.initial.x - this.initial.x,
                y: position.initial.y - this.initial.y,
            }),
            size: new Size({
                width: position.size.width,
                height: position.size.height
            })
        });
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