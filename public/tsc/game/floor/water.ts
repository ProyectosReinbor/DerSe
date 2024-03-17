import type { Canvas } from "../../engine/canvas.js";
import { ImageBoxes } from "../../engine/imageBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import { Coordinate } from "../../engine/coordinate.js";
import type { Map } from "../map.js";

export class Water extends ImageBoxes {
    constructor(
        canvas: Canvas,
        map: Map
    ) {
        super(
            map.initial.x,
            map.initial.y,
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