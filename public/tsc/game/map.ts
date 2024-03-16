import { Floor } from "./floor.js";
import {
    MapMatrix,
    FloorLength,
    type MapFloor
} from "./mapMatrix.js";
import { Position } from "../engine/position.js";
import { Size } from "../engine/size.js";
import type { Canvas } from "../engine/canvas.js";
import { Coordinate } from "../engine/coordinate.js";

export class Map extends Position {
    matrix: MapFloor[] = MapMatrix();
    boxes: Size;
    floors: Floor[];
    constructor(canvas: Canvas) {
        super(new Coordinate, new Size(100, 100));
        this.boxes = new Size(
            this.size.width / FloorLength.horizontal,
            this.size.height / FloorLength.vertical,
        )
        this.floors = new Array(this.matrix.length).fill(
            new Floor(canvas, this)
        );
    }

    async drawMap() {
        for (const floor of this.floors) {
            await floor.drawFloor();
        }
    }
}   