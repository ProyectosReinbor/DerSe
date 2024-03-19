
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Grounds } from "./grounds.js";
import type { Map } from "../map.js";
import { Elevation } from "./elevation.js";

export class Elevations extends Grounds {
    constructor(props: {
        map: Map,
        canvas: Canvas,
    }) {
        super({
            canvas: props.canvas,
            map: props.map,
        });
    }

    setElevation(boxes: Coordinate) {
        this.setGround(
            boxes,
            new Elevation({
                canvas: this.canvas,
            })
        );
    }

    drawElevations() {
        this.drawGrounds();
    }
}
