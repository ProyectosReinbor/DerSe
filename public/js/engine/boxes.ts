import type { Canvas } from "./canvas.js";
import { Coordinate } from "./coordinate.js";
import { Size } from "./size.js";

export class Boxes extends Coordinate {
    boxes: number[][] = [];
    canvas: Canvas;
    boxesParameters: {
        size: Size;
        boxesHorizontal: number;
        boxesVertical: number;
        occupiedBoxes: true | boolean[][];
    };
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        boxesParameters: {
            size: Size;
            boxesHorizontal: number;
            boxesVertical: number;
            occupiedBoxes: true | boolean[][];
        }
    ) {
        super(x, y);
        this.canvas = canvas;
        this.boxesParameters = boxesParameters;
    }

    getBoxesOfCoordinate(coordinate: Coordinate) {
        const boxX = Math.floor(coordinate.x / this.boxesParameters.size.width);
        const boxY = Math.floor(coordinate.y / this.boxesParameters.size.height);
        return new Coordinate(boxX, boxY);
    }

    getCoordinateOfBoxes(boxes: Coordinate) {
        const distanceBoxX = boxes.x * this.boxesParameters.size.width;
        const distanceBoxY = boxes.y * this.boxesParameters.size.height;
        return new Coordinate(
            this.x + distanceBoxX,
            this.y + distanceBoxY,
        );
    }

    boxIndex(boxes: Coordinate) {
        // if (this.boxes[boxes.y] === undefined)
        //     this.boxes[boxes.y] = [];

        const index = this.boxes[boxes.y][boxes.y];
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
        if (this.boxesParameters.occupiedBoxes === true) {
            for (let y = 0; y < this.boxesParameters.boxesVertical; y++) {
                for (let x = 0; x < this.boxesParameters.boxesHorizontal; x++) {
                    this.setOccupiedBox(
                        boxes,
                        new Coordinate(x, y),
                        index,
                    );
                }
            }
            return;
        }
        this.boxesParameters.occupiedBoxes.forEach((row, y) => {
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