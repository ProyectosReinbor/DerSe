import { Coordinate } from "./coordinate.js";
import { Canvas } from "./canvas.js";

export class Boxes extends Coordinate {

    canvas: Canvas;
    factory: {
        size: {
            width: number;
            height: number;
        };
        boxesHorizontal: number;
        boxesVertical: number;
        occupiedBoxes: boolean[][] | true;
    };

    boxes: {
        [key: string]: number | false;
    } = {};

    constructor(
        x: number,
        y: number,
        Canvas: Canvas,
        factory: {
            size: {
                width: number;
                height: number;
            };
            boxesHorizontal: number;
            boxesVertical: number;
            occupiedBoxes: boolean[][] | true;
        },
    ) {
        super(
            x,
            y,
        );
        this.canvas = Canvas;
        this.factory = factory;
    }

    getBoxesOfCoordinate(coordinate: Coordinate): { x: number, y: number } {
        const boxX = Math.floor(coordinate.x / this.factory.size.width);
        const boxY = Math.floor(coordinate.y / this.factory.size.height);
        return {
            x: boxX,
            y: boxY,
        };
    }

    getCoordinateOfBoxes(boxX: number, boxY: number): Coordinate {
        const distanceBoxX = boxX * this.factory.size.width;
        const distanceBoxY = boxY * this.factory.size.height;
        return new Coordinate(
            this.x + distanceBoxX,
            this.y + distanceBoxY,
        );
    }

    boxIndex(
        boxX: number,
        boxY: number,
    ): number | false {
        const index = this.boxes[`x${boxX}y${boxY}`];
        if (index === undefined) return false;
        return index;
    }

    setBoxIndex(
        boxX: number,
        boxY: number,
        index: number,
    ): void {
        if (this.factory.occupiedBoxes === true) {
            for (let y = 0; y < this.factory.boxesVertical; y++) {
                for (let x = 0; x < this.factory.boxesHorizontal; x++) {
                    this.boxes[`x${boxX + x}y${boxY + y}`] = index;
                }
            }
            return;
        }
        this.factory.occupiedBoxes.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value === false) return;
                this.boxes[`x${boxX + x}y${boxY + y}`] = index;
            });
        });
    }
}