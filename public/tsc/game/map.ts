
import {
    Position,
    Size,
    type Canvas,
    Coordinate
} from "../engine/exports.js";
import { Floor } from "./floor.js";
import {
    MapMatrix,
    type Box,
    FloorLength,
    type MapFloor
} from "./mapMatrix.js";

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