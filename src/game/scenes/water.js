import { Canvas, ImageBoxes } from "../engine.js";
export class Water extends ImageBoxes {

    constructor(
        initialX,
        initialY,
        canvas,
        boxesWidth,
        boxesHeight
    ) {
        super(
            initialX,
            initialY,
            canvas,
            {
                size: boxes,
                boxesHorizontal: 1,
                boxesVertical: 1,
                occupiedBoxes: true
            },
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