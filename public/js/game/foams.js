import { AnimationBoxes } from "../engine/animationBoxes.js";

export class Foams extends AnimationBoxes {
    constructor(
        x, y,
        canvas,
        map
    ) {
        super(
            x, y,
            canvas,
            map.boxes.width,
            map.boxes.height,
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

    async drawFoams() {
        await this.drawAnimations();
    }
}