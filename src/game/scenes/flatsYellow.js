
import { Canvas } from "../engine.js";
import { Foams } from "./foams.js";
import { Grounds } from "./grounds.js";
import { Map } from "./map.js";

export class FlatsYellow extends Grounds {

    foams: Foams;

    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        boxes: {
            width: number;
            height: number;
        },
        foams: Foams
    ) {
        super(
            x,
            y,
            canvas,
            boxes,
            {
                leftUp: {
                    horizontal: 5,
                    vertical: 0,
                },
                up: {
                    horizontal: 6,
                    vertical: 0,
                },
                rightUp: {
                    horizontal: 7,
                    vertical: 0,
                },
                left: {
                    horizontal: 5,
                    vertical: 1,
                },
                center: {
                    horizontal: 6,
                    vertical: 1,
                },
                right: {
                    horizontal: 7,
                    vertical: 1,
                },
                leftDown: {
                    horizontal: 5,
                    vertical: 2,
                },
                down: {
                    horizontal: 6,
                    vertical: 2,
                },
                rightDown: {
                    horizontal: 7,
                    vertical: 2,
                },
                leftHorizontal: {
                    horizontal: 5,
                    vertical: 3,
                },
                centerHorizontal: {
                    horizontal: 6,
                    vertical: 3,
                },
                rightHorizontal: {
                    horizontal: 7,
                    vertical: 3,
                },
                upVertical: {
                    horizontal: 8,
                    vertical: 0,
                },
                centerVertical: {
                    horizontal: 8,
                    vertical: 1,
                },
                downVertical: {
                    horizontal: 8,
                    vertical: 2,
                },
                only: {
                    horizontal: 8,
                    vertical: 3,
                }
            },
        );
        this.foams = foams;
        const rows = 100 / this.factory.size.height;
        const columns = 100 / this.factory.size.width;
        for (let y = 1; y < rows - 1; y++) {
            for (let x = 1; x < columns - 1; x++) {
                this.setFlat(x, y);
            }
        }
    }

    setFlat(boxX: number, boxY: number) {
        const route = `images/terrain/ground/flat.png`;
        const foam = this.foams.boxIndex(boxX, boxY);
        if (foam === false) return;
        this.setElements(boxX, boxY, route, this.elementsFactory.only);
        this.refreshElements();
    }

    refreshElements() {
        this.elements.forEach((elements) => {
            const boxes = this.getBoxesOfCoordinate(elements.initial);
            const elementsFactory = this.getElementsFactoryOfBoxes(boxes.x, boxes.y);
            elements.element.horizontal = elementsFactory.horizontal;
            elements.element.vertical = elementsFactory.vertical;
        });
    }

    getElementsFactoryOfBoxes(boxX: number, boxY: number): {
        horizontal: number;
        vertical: number;
    } {
        const left = this.boxIndex(boxX - 1, boxY) !== false;
        const right = this.boxIndex(boxX + 1, boxY) !== false;
        const up = this.boxIndex(boxX, boxY - 1) !== false;
        const down = this.boxIndex(boxX, boxY + 1) !== false;

        if (!up && down && !left && right)
            return this.elementsFactory.leftUp;

        else if (!up && down && left && right)
            return this.elementsFactory.up;

        else if (!up && down && left && !right)
            return this.elementsFactory.rightUp;

        else if (up && down && !left && right)
            return this.elementsFactory.left;

        else if (up && down && left && right)
            return this.elementsFactory.center;

        else if (up && down && left && !right)
            return this.elementsFactory.right;

        else if (up && !down && !left && right)
            return this.elementsFactory.leftDown;

        else if (up && !down && left && right)
            return this.elementsFactory.down;

        else if (up && !down && left && !right)
            return this.elementsFactory.rightDown;

        else if (!up && !down && !left && right)
            return this.elementsFactory.leftHorizontal;

        else if (!up && !down && left && right)
            return this.elementsFactory.centerHorizontal;

        else if (!up && !down && left && !right)
            return this.elementsFactory.rightHorizontal;

        else if (!up && down && !left && !right)
            return this.elementsFactory.upVertical;

        else if (up && down && !left && !right)
            return this.elementsFactory.centerVertical;

        else if (up && !down && !left && !right)
            return this.elementsFactory.downVertical;

        return this.elementsFactory.only;
    }

    drawFlatsYellow() {
        this.drawElements();
    }
}  