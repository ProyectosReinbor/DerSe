import { Grounds } from "./grounds.js";

export class Elevations extends Grounds {

    constructor(
        x, y,
        canvas,
        boxesWidth,
        boxesHeight
    ) {
        super(
            x, y,
            canvas,
            boxesWidth,
            boxesHeight,
            0, 0,
            1, 0,
            2, 0,
            0, 1,
            1, 1,
            2, 1,
            0, 2,
            1, 2,
            2, 2,
            0, 4,
            1, 4,
            2, 4,
            3, 0,
            3, 1,
            3, 2,
            3, 4
        );
    }

    setElevation(boxX, boxY) {
        this.setGround(
            boxX,
            boxY,
            "images/terrain/ground/elevation.png",
        );
    }

    drawElevations() {
        this.drawGrounds();
    }
}
