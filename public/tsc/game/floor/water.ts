import {
    Canvas,
    Coordinate,
    Plane,
    Size,
    ImageBoxes
} from "../../engine/exports.js";
import type { Map } from "../map.js";
export class Water extends ImageBoxes {

    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        map: Map
    ) {
        super(
            x,
            y,
            canvas,
            {
                size: new Size(map.boxes.width, map.boxes.height),
                length: new Plane(1, 1),
                occupiedBoxes: true
            }
        );
    }

    setWater(boxes: Coordinate) {
        const route = "images/terrain/water/water.png";
        this.setImage(
            boxes,
            route
        );
    }

    async drawWaters() {
        await this.drawImages();
    }
}  