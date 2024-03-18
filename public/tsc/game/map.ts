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
        );
        this.floors = [
            new Floor(canvas, this),
            new Floor(canvas, this),
        ];
        this.floors.forEach((floor, index) => {
            floor.setFloor(this.matrix[index]);
        });
    }

    collision(
        initial: Coordinate,
        nextInitial: Coordinate
    ): boolean {
        for (let index = this.floors.length - 1; index >= 0; index--) {
            const floor = this.floors[index];
            if (floor.insideFloor(initial) === false) continue;
            return floor.collision(initial, nextInitial);
        }
        throw new Error("no floor");
    }

    drawMap() {
        this.floors.forEach(
            floor => floor.drawFloor()
        );
    }
}   