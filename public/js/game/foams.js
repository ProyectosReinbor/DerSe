import { AnimationBoxes } from "../engine/animationBoxes.js";

export class Foams extends AnimationBoxes {
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
            3,
            3,
            [
                [true, false, false],
                [false, false, false],
                [false, false, false]
            ],
            192,
            192,
            0,
            8,
            8,
        );
        const rows = 100 / this.factory.size.height;
        const columns = 100 / this.factory.size.width;
        for (let y = 1; y < rows - 1; y++) {
            for (let x = 1; x < columns - 1; x++) {
                this.setFoam(x, y);
            }
        }
    }

    setFoam(boxX, boxY) {
        const route = `images/terrain/water/foam.png`;
        const index = this.setAnimations(
            boxX,
            boxY,
            route,
            0,
        );
        const foam = this.animationGroup[index];
        foam.initial.x -= this.factory.size.width;
        foam.initial.y -= this.factory.size.height;
    }

    drawFoams() {
        this.drawAnimations();
    }
}