import { Coordinate } from "./coordinate.js";
import { Size } from "./size.js";

export class Boxes extends Coordinate {
    constructor(
        x, y,
        canvas,
        factorySizeWidth,
        factorySizeHeight,
        factoryBoxesHorizontal,
        factoryBoxesVertical,
        factoryOccupiedBoxes
    ) {
        super(x, y);
        this.boxes = {};
        this.canvas = canvas;
        this.factory = {
            size: new Size(
                factorySizeWidth,
                factorySizeHeight
            ),
            boxesHorizontal: factoryBoxesHorizontal,
            boxesVertical: factoryBoxesVertical,
            occupiedBoxes: factoryOccupiedBoxes
        }
    }

    getBoxesOfCoordinate(x, y) {
        const boxX = Math.floor(x / this.factory.size.width);
        const boxY = Math.floor(y / this.factory.size.height);
        return new Coordinate(boxX, boxY);
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
        index,
        boxX,
        boxY,
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