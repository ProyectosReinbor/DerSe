import type { Canvas } from "../../engine/canvas.js";
import { ImageBoxes } from "../../engine/imageBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import { Coordinate } from "../../engine/coordinate.js";
import type { Map } from "../map.js";
import { Image } from "../../engine/image.js";

export class Water extends ImageBoxes {
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
                length: new Plane(1, 1),
                occupiedBoxes: true
            }
        );
        this.imageDefault = new Image(
            new Coordinate,
            new Size,
            this.canvas,
            "images/terrain/water/water.png",
        );
    }

    setWater(boxes: Coordinate) {
        this.setImage(
            boxes,
            this.imageDefault
        );
    }

    drawWaters() {
        this.drawImages();
    }
}  