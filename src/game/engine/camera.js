import { Coordinate } from "./coordinate.js";
import { Position } from "./position.js";

export class Camera extends Position {

    constructor(
        initialX,
        initialY,
    ) {
        super(
            initialX,
            initialY,
            100,
            100
        );
    }

    insideCamera(
        initialX,
        initialY,
        sizeWidth,
        sizeHeight,
        endX,
        endY
    ) {
        const vision = new Position(
            this.initial.x - sizeWidth,
            this.initial.y - sizeHeight,
            this.size.width + (sizeWidth * 2),
            this.size.height + (sizeHeight * 2),
        );
        return vision.inside(
            initialX,
            initialY,
            endX,
            endY
        );
    }

    positionOnCamera(
        initialX,
        initialY,
        sizeWidth,
        sizeHeight,
        endX,
        endY
    ) {
        const appearsInCamera = this.insideCamera(
            sizeWidth,
            sizeHeight,
            initialX,
            initialY,
            endX,
            endY
        );
        if (appearsInCamera === false) return false;
        return new Position(
            initialX - this.initial.x,
            initialY - this.initial.y,
            sizeWidth,
            sizeHeight
        );
    }

    focusPosition(
        initialX,
        initialY,
        sizeWidth,
        sizeHeight
    ) {
        let x = initialX - (this.size.width / 2);
        x += sizeWidth / 2;

        let y = initialY - (this.size.height / 2);
        y += sizeHeight / 2;

        this.initial.x = x;
        this.initial.y = y;
    }
}