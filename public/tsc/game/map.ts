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
            new Floor({
                canvas: props.canvas,
                map: this
            }),
            new Floor({
                canvas: props.canvas,
                map: this
            }),
        ];
        this.floors.forEach((floor, index) => {
            const matrixFloor = this.matrix[index];
            if (matrixFloor === undefined)
                return;

            floor.pushFloor(matrixFloor);
        });
    }

    drawMap() {
        this.floors.forEach(
            floor => floor.drawFloor()
        );
    }
}   