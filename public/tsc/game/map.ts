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
import type { Collider } from "../engine/collider.js";

export class Map extends Position {
    matrix: MapFloor[] = MapMatrix();
    boxes: Size;
    floors: Floor[];
    constructor(props: { canvas: Canvas }) {
        super({
            initial: new Coordinate({ x: 0, y: 0 }),
            size: new Size({
                width: 100,
                height: 100
            })
        });
        this.boxes = new Size({
            width: this.size.width / FloorLength.horizontal,
            height: this.size.height / FloorLength.vertical,
        });
        this.floors = [
            new Floor({ canvas, this}),
            new Floor(canvas, this),
        ];
        this.floors.forEach((floor, index) => {
            floor.setFloor(this.matrix[index]);
        });
    }

    collision(
        collider: Collider,
        nextCollider: Collider
    ): boolean {
        for (let index = this.floors.length - 1; index >= 0; index--) {
            const floor = this.floors[index];
            if (floor.insideFloor(collider) === false) continue;
            console.log("inside floor")
            if (floor.collision(collider, nextCollider) === true) return true;
        }
        return false;
        throw new Error("no floor");
    }

    drawMap() {
        this.floors.forEach(
            floor => floor.drawFloor()
        );
    }
}   