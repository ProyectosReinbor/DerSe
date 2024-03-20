
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Grounds } from "./grounds.js";
import type { Map } from "../map.js";
import { FlatSand } from "./flatSand.js";

export class FlatsSand extends Grounds {
    constructor(props: {
        map: Map,
        canvas: Canvas,
    }) {
        super({
            canvas: props.canvas,
            map: props.map,
        });
    }

    setFlatSand(boxes: Coordinate) {
        this.setGround(
            boxes,
            new FlatSand({
                map: this.map,
                canvas: this.canvas
            })
        );
    }

    drawFlatsSand() {
        this.drawGrounds();
    }
}  