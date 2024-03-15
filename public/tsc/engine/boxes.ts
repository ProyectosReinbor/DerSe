import type { Canvas } from "./canvas.js";
import { Coordinate } from "./coordinate.js";
import type { Plane } from "./plane.js";
import { Size } from "./size.js";

export class Boxes extends Coordinate {
    boxes: number[][] = [];
    canvas: Canvas;
    boxParameters: {
        size: Size;
        length: Plane;
        occupiedBoxes: true | boolean[][];
    };
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        boxParameters: {
            size: Size;
            length: Plane;
            occupiedBoxes: true | boolean[][];
        }
    ) {
        super(x, y);
        this.canvas = canvas;
        this.boxParameters = boxParameters;
    }

    getBoxesOfCoordinate(coordinate: Coordinate) {
        const boxX = Math.floor(coordinate.x / this.boxParameters.size.width);
        const boxY = Math.floor(coordinate.y / this.boxParameters.size.height);
        return new Coordinate(boxX, boxY);
    }

    getCoordinateOfBoxes(boxes: Coordinate) {
        const distanceBoxX = boxes.x * this.boxParameters.size.width;
        const distanceBoxY = boxes.y * this.boxParameters.size.height;
        return new Coordinate(
            this.x + distanceBoxX,
            this.y + distanceBoxY,
        );
    }

    boxIndex(boxes: Coordinate) {
        if (this.boxes[boxes.y] === undefined)
            this.boxes[boxes.y] = [];

        const index = this.boxes[boxes.y][boxes.x];
        if (index === undefined) return false;
        return index;
    }

    setOccupiedBox(
        boxes: Coordinate,
        indices: Coordinate,
        index: number,
    ) {
        const y = boxes.y + indices.y;
        const x = boxes.x + indices.x;
        if (this.boxes[y] === undefined)
            this.boxes[y] = [];
        this.boxes[y][x] = index;
    }

    setBoxIndex(
        index: number,
        boxes: Coordinate,
    ) {
        if (this.boxParameters.occupiedBoxes === true) {
            for (let y = 0; y < this.boxParameters.length.vertical; y++) {
                for (let x = 0; x < this.boxParameters.length.horizontal; x++) {
                    this.setOccupiedBox(
                        boxes,
                        new Coordinate(x, y),
                        index,
                    );
                }
            }
            return;
        }
        this.boxParameters.occupiedBoxes.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value === false) return;
                this.setOccupiedBox(
                    boxes,
                    new Coordinate(x, y),
                    index
                );
            });
        });
    }
}