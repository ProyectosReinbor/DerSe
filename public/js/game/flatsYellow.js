
import { Grounds } from "./grounds.js";

export class FlatsYellow extends Grounds {
    constructor(
        x, y,
        canvas,
        boxesWidth,
        boxesHeight,
        foams
    ) {
        super(
            x, y,
            canvas,
            boxesWidth,
            boxesHeight,
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
        this.foams = foams;
        const rows = 100 / this.factory.size.height;
        const columns = 100 / this.factory.size.width;
        for (let y = 1; y < rows - 1; y++) {
            for (let x = 1; x < columns - 1; x++) {
                this.setFlat(x, y);
            }
        }
    }

    setFlat(boxX, boxY) {
        const foam = this.foams.boxIndex(boxX, boxY);
        if (foam === false) return;
        const route = `images/terrain/ground/flat.png`;
        this.setGround(
            boxX,
            boxY,
            route
        );
    }

    drawFlatsYellow() {
        this.drawGrounds();
    }
}  