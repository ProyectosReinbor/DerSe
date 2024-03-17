import type { Box } from "./box";
import type { Canvas } from "./canvas";
import { Coordinate } from "./coordinate";

export class Boxes extends Coordinate {
    boxes: number[][] = [];
    canvas: Canvas;
    boxDefault: Box;
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        boxDefault: Box,
    ) {
        super(x, y);
        this.canvas = canvas;
        this.boxDefault = boxDefault;
    }

    getBoxesOfCoordinate(coordinate: Coordinate) {
        const boxX = Math.floor(coordinate.x / this.boxDefault.size.width);
        const boxY = Math.floor(coordinate.y / this.boxDefault.size.height);
        return new Coordinate(boxX, boxY);
    }

    getCoordinateOfBoxes(boxes: Coordinate) {
        const distanceBoxX = boxes.x * this.boxDefault.size.width;
        const distanceBoxY = boxes.y * this.boxDefault.size.height;
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
        if (this.boxDefault.occupiedBoxes === true) {
            for (let y = 0; y < this.boxDefault.length.vertical; y++) {
                for (let x = 0; x < this.boxDefault.length.horizontal; x++) {
                    this.setOccupiedBox(
                        boxes,
                        new Coordinate(x, y),
                        index,
                    );
                }
            }
            return;
        }
        this.boxDefault.occupiedBoxes.forEach((row, y) => {
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