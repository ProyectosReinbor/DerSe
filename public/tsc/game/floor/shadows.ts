
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Image } from "../../engine/image.js";
import { ImageBoxes } from "../../engine/imageBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export class Shadows extends ImageBoxes {
    imageDefault: Image;
    constructor(
        map: Map,
        canvas: Canvas,
    ) {
        super(
            map.initial.x,
            map.initial.y,
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
        this.imageDefault = new Image(
            new Coordinate,
            new Size,
            this.canvas,
            "images/terrain/ground/shadows.png",
        );
    }

    setShadow(boxes: Coordinate) {
        const index = this.setImage(
            boxes,
            this.imageDefault
        );
        if (index === false) return false;
        const shadow = this.images[index];
        shadow.initial.x -= this.boxDefault.size.width;
        shadow.initial.y -= this.boxDefault.size.height;
    }

    async drawShadows() {
        await this.drawImages();
    }
}           