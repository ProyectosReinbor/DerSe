
import { Grounds } from "./grounds.js";

export class FlatsYellow extends Grounds {
    constructor(
        x, y,
        canvas,
        map,
    ) {
        super(
            x, y,
            canvas,
            map.boxes.width,
            map.boxes.height,
            5, 0,
            6, 0,
            7, 0,
            5, 1,
            6, 1,
            7, 1,
            5, 2,
            6, 2,
            7, 2,
            5, 3,
            6, 3,
            7, 3,
            8, 0,
            8, 1,
            8, 2,
            8, 3
        );
    }

    setFlat(boxX, boxY) {
        const route = `images/terrain/ground/flat.png`;
        this.setGround(
            boxX,
            boxY,
            route
        );
    }

    async drawFlatsYellow() {
        await this.drawGrounds();
    }
}  