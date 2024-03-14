import { ImageBoxes } from "../engine/imageBoxes.js";

export class Shadows extends ImageBoxes {
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
            ]
        );
    }

    setShadow(boxX, boxY) {
        const route = "images/terrain/ground/shadows.png";
        const index = this.setImage(
            boxX,
            boxY,
            route
        );
        const shadow = this.images[index];
        shadow.initial.x -= this.factory.size.width;
        shadow.initial.y -= this.factory.size.height;
    }

    async drawShadows() {
        await this.drawImages();
    }
}           