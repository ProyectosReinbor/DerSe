import type { Canvas } from "../../engine/canvas.js";
import { ImageBoxes } from "../../engine/imageBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import { Coordinate } from "../../engine/coordinate.js";
import type { Map } from "../map.js";
import { Image } from "../../engine/image.js";
import { Box } from "../../engine/box.js";

export class Water extends ImageBoxes {
    imageDefault: Image;
    constructor(props: {
        map: Map,
        canvas: Canvas,
    }) {
        super({
            x: props.map.initial.x,
            y: props.map.initial.y,
            canvas: props.canvas,
            default: new Box({
                size: new Size({
                    width: props.map.boxes.width,
                    height: props.map.boxes.height
                }),
                length: new Plane({
                    horizontal: 1,
                    vertical: 1
                }),
                occupiedBoxes: true
            })
        });
        this.imageDefault = new Image({
            initial: new Coordinate({ x: 0, y: 0 }),
            size: new Size({ width: 0, height: 0 }),
            canvas: this.canvas,
            route: "images/terrain/water/water.png",
        });
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