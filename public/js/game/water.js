import { ImageBoxes } from "../engine/imageBoxes.js";
export class Water extends ImageBoxes {

    constructor(
        x,
        y,
        canvas,
        boxesWidth,
        boxesHeight
    ) {
        super(
            x,
            y,
            canvas,
            boxesWidth,
            boxesHeight,
            1,
            1,
            true
        );
        const route = "images/terrain/water/water.png";
        const rows = 100 / this.factory.size.height;
        const columns = 100 / this.factory.size.width;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {
                this.setImage(x, y, route);
            }
        }
    }

    drawWaters() {
        this.drawImages();
    }
}   