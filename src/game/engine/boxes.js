import { Coordinate } from "./coordinate.js";
import { Canvas } from "./canvas.js";

const Size = ({
    width, // number
    height  // number
}) => {
    return {
        width, // number
        height, // number
    }
}

export const Factory = ({
    size,
    boxesHorizontal, // number
    boxesVertical, // number
    occupiedBoxes, // boolean[][] | true
}) => {
    return {
        size: Size(size),
        boxesHorizontal, // number
        boxesVertical, // number
        occupiedBoxes, // boolean[][] | true
    }
}

export class Boxes extends Coordinate {

    constructor(
        x,
        y,
        canvas,
        factory,
    ) {
        super(x, y);
        this.canvas = canvas;
        this.factory = Factory(factory);
        this.boxes = {};
    }

    getBoxesOfCoordinate(coordinate) {
        const boxX = Math.floor(coordinate.x / this.factory.size.width);
        const boxY = Math.floor(coordinate.y / this.factory.size.height);
        return {
            x: boxX,
            y: boxY,
        };
    }

    getCoordinateOfBoxes(boxX, boxY) {
        const distanceBoxX = boxX * this.factory.size.width;
        const distanceBoxY = boxY * this.factory.size.height;
        return new Coordinate(
            this.x + distanceBoxX,
            this.y + distanceBoxY,
        );
    }

    boxIndex(boxX, boxY) {
        const index = this.boxes[`x${boxX}y${boxY}`];
        if (index === undefined) return false;
        return index;
    }

    setBoxIndex(
        boxX,
        boxY,
        index,
    ) {
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