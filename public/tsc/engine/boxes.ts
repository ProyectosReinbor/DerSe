import type { Box } from "./box";
import type { Canvas } from "./canvas";
import { Collider } from "./collider";
import { Coordinate } from "./coordinate";
import { Size } from "./size";

export class Boxes extends Coordinate {
    indices: number[][] = [];
    canvas: Canvas;
    boxDefault: Box;
    constructor(props: {
        x: number,
        y: number,
        canvas: Canvas,
        boxDefault: Box,
    }) {
        super(props);
        this.canvas = props.canvas;
        this.boxDefault = props.boxDefault;
    }

    collision(collider: Collider): boolean {
        const boxes = this.getBoxesOfCoordinate(collider.initial);
        const boxesEnd = this.getBoxesOfCoordinate(collider.end);
        for (let yIndex = boxes.y; yIndex < boxesEnd.y; yIndex++) {
            for (let xIndex = boxes.x; xIndex < boxesEnd.x; xIndex++) {
                const boxes = new Coordinate({ x: xIndex, y: yIndex });
                const index = this.boxIndex(boxes);
                if (index === false)
                    continue;

                const boxCollider = this.getColliderOfBoxes(boxes);
                if (boxCollider.collision(collider) === false)
                    continue;

                return true;
            }
        }
        return false;
    }

    getBoxesOfCoordinate(coordinate: Coordinate) {
        const boxX = Math.floor(coordinate.x / this.boxDefault.size.width);
        const boxY = Math.floor(coordinate.y / this.boxDefault.size.height);
        return new Coordinate({ x: boxX, y: boxY });
    }

    getCoordinateOfBoxes(boxes: Coordinate) {
        const distanceBoxX = boxes.x * this.boxDefault.size.width;
        const distanceBoxY = boxes.y * this.boxDefault.size.height;
        return new Coordinate({
            x: this.x + distanceBoxX,
            y: this.y + distanceBoxY,
        });
    }

    getColliderOfBoxes(boxes: Coordinate): Collider {
        const initial = this.getCoordinateOfBoxes(boxes);
        return new Collider({
            canvas: this.canvas,
            initial,
            size: new Size({
                width: this.boxDefault.size.width,
                height: this.boxDefault.size.height
            }),
            fillStyle: false,
            strokeStyle: false,
            lineWidth: 0,
        });
    }

    boxIndex(boxes: Coordinate) {
        if (this.indices[boxes.y] === undefined)
            this.indices[boxes.y] = [];

        const index = this.indices[boxes.y][boxes.x];
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
        if (this.indices[y] === undefined)
            this.indices[y] = [];
        this.indices[y][x] = index;
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
                        new Coordinate({ x, y }),
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
                    new Coordinate({ x, y }),
                    index
                );
            });
        });
    }
}