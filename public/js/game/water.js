import { ImageBoxes } from "../engine/imageBoxes.js";
export class Water extends ImageBoxes {

    constructor(
        x,
        y,
        canvas,
        map
    ) {
        super(
            x,
            y,
            canvas,
            map.boxes.width,
            map.boxes.height,
            1,
            1,
            true
        );
    }

    setWater(boxX, boxY) {
        const route = "images/terrain/water/water.png";
        this.setImage(
            boxX,
            boxY,
            route
        );
    }

    async drawWaters() {
        await this.drawImages();
    }
}   