import type { Canvas } from "../engine/canvas.js";
import type { Coordinate } from "../engine/coordinate.js";
import { ImageBoxes } from "../engine/imageBoxes.js";
import { Plane } from "../engine/plane.js";
import { Size } from "../engine/size.js";
import type { Map } from "./map.js";

export class Shadows extends ImageBoxes {
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        map: Map
    ) {
        super(
            x, y,
            canvas,
            {
                size: new Size(map.boxes.width, map.boxes.height),
                length: new Plane(3, 3),
                occupiedBoxes: [
                    [true, false, false],
                    [false, false, false],
                    [false, false, false]
                ]
            }
        );
    }

    setShadow(boxes: Coordinate) {
        const route = "images/terrain/ground/shadows.png";
        const index = this.setImage(
            boxes,
            route
        );
        const shadow = this.images[index];
        shadow.initial.x -= this.boxParameters.size.width;
        shadow.initial.y -= this.boxParameters.size.height;
    }

    async drawShadows() {
        await this.drawImages();
    }
}           