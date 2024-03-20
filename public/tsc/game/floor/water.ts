import type { Canvas } from "../../engine/canvas.js";
import { ImageBoxes } from "../../engine/imageBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import { Coordinate } from "../../engine/coordinate.js";
import type { Map } from "../map.js";

export class Water extends ImageBoxes {
    constructor(props: {
        map: Map,
        canvas: Canvas,
    }) {
        super({
            x: props.map.initial.x,
            y: props.map.initial.y,
            canvas: props.canvas,
            size: new Size({
                width: props.map.boxes.width,
                height: props.map.boxes.height
            }),
            length: new Plane({
                horizontal: 1,
                vertical: 1
            }),
            occupied: true,
            route: "images/terrain/water/water.png",
        });
    }

    pushWater(indicesBoxes: Coordinate) {
        return this.referencePush(indicesBoxes);
    }

    drawWaters() {
        this.drawImages();
    }
}  