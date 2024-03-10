import { Canvas, ElementBoxes } from "../engine.js";

type Element = {
    horizontal: number;
    vertical: number;
};

type ElementsFactory = {
    leftUp: Element;
    up: Element;
    rightUp: Element;
    left: Element;
    center: Element;
    right: Element;
    leftDown: Element;
    down: Element;
    rightDown: Element;
    leftHorizontal: Element;
    centerHorizontal: Element;
    rightHorizontal: Element;
    upVertical: Element;
    centerVertical: Element;
    downVertical: Element;
    only: Element;
};

export class Grounds extends ElementBoxes {

    elementsFactory: ElementsFactory;

    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        boxes: {
            width: number;
            height: number;
        },
        elementsFactory: ElementsFactory
    ) {
        super(
            x,
            y,
            canvas,
            {
                size: boxes,
                boxesHorizontal: 1,
                boxesVertical: 1,
                occupiedBoxes: true
            },
            {
                size: {
                    width: 64,
                    height: 64,
                }
            },
        );
        this.elementsFactory = elementsFactory;
    }

    setGround(
        boxX: number,
        boxY: number,
        route: string
    ) {
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

    drawGrounds() {
        this.drawElements();
    }
}  