import { ElementBoxes } from "../engine/elementBoxes.js";

export class Grounds extends ElementBoxes {
    constructor(
        x, y,
        canvas,
        boxesWidth,
        boxesHeight,
        elementsLeftUpHorizontal,
        elementsLeftUpVertical,
        elementsUpHorizontal,
        elementsUpVertical,
        elementsRightUpHorizontal,
        elementsRightUpVertical,
        elementsLeftHorizontal,
        elementsLeftVertical,
        elementsCenterHorizontal,
        elementsCenterVertical,
        elementsRightHorizontal,
        elementsRightVertical,
        elementsLeftDownHorizontal,
        elementsLeftDownVertical,
        elementsDownHorizontal,
        elementsDownVertical,
        elementsRightDownHorizontal,
        elementsRightDownVertical,
        elementsHorizontalLeftHorizontal,
        elementsHorizontalLeftVertical,
        elementsHorizontalCenterHorizontal,
        elementsHorizontalCenterVertical,
        elementsHorizontalRightHorizontal,
        elementsHorizontalRightVertical,
        elementsVerticalUpHorizontal,
        elementsVerticalUpVertical,
        elementsVerticalCenterHorizontal,
        elementsVerticalCenterVertical,
        elementsVerticalDownHorizontal,
        elementsVerticalDownVertical,
        elementsOnlyHorizontal,
        elementsOnlyVertical,
    ) {
        super(
            x, y,
            canvas,
            boxesWidth,
            boxesHeight,
            1,
            1,
            true,
            64,
            64,
        );
        this.elements = {
            leftUp: {
                horizontal: elementsLeftUpHorizontal,
                vertical: elementsLeftUpVertical,
            },
            up: {
                horizontal: elementsUpHorizontal,
                vertical: elementsUpVertical,
            },
            rightUp: {
                horizontal: elementsRightUpHorizontal,
                vertical: elementsRightUpVertical,
            },
            left: {
                horizontal: elementsLeftHorizontal,
                vertical: elementsLeftVertical,
            },
            center: {
                horizontal: elementsCenterHorizontal,
                vertical: elementsCenterVertical,
            },
            right: {
                horizontal: elementsRightHorizontal,
                vertical: elementsRightVertical,
            },
            leftDown: {
                horizontal: elementsLeftDownHorizontal,
                vertical: elementsLeftDownVertical,
            },
            down: {
                horizontal: elementsDownHorizontal,
                vertical: elementsDownVertical,
            },
            rightDown: {
                horizontal: elementsRightDownHorizontal,
                vertical: elementsRightDownVertical,
            },
            horizontalLeft: {
                horizontal: elementsHorizontalLeftHorizontal,
                vertical: elementsHorizontalLeftVertical,
            },
            horizontalCenter: {
                horizontal: elementsHorizontalCenterHorizontal,
                vertical: elementsHorizontalCenterVertical,
            },
            horizontalRight: {
                horizontal: elementsHorizontalRightHorizontal,
                vertical: elementsHorizontalRightVertical,
            },
            verticalUp: {
                horizontal: elementsVerticalUpHorizontal,
                vertical: elementsVerticalUpVertical,
            },
            verticalCenter: {
                horizontal: elementsVerticalCenterHorizontal,
                vertical: elementsVerticalCenterVertical,
            },
            verticalDown: {
                horizontal: elementsVerticalDownHorizontal,
                vertical: elementsVerticalDownVertical,
            },
            only: {
                horizontal: elementsOnlyHorizontal,
                vertical: elementsOnlyVertical,
            }
        };
    }

    setGround(
        boxX,
        boxY,
        route
    ) {
        this.setElements(
            boxX,
            boxY,
            route,
            this.elements.only.horizontal,
            this.elements.only.vertical
        );
        this.refreshElements();
    }

    refreshElements() {
        this.groupElements.forEach((elements) => {
            const boxes = this.getBoxesOfCoordinate(
                elements.initial.x,
                elements.initial.y
            );
            const element = this.getElementsFactoryOfBoxes(boxes.x, boxes.y);
            elements.element.horizontal = element.horizontal;
            elements.element.vertical = element.vertical;
        });
    }

    getElementsFactoryOfBoxes(boxX, boxY) {
        const left = this.boxIndex(boxX - 1, boxY) !== false;
        const right = this.boxIndex(boxX + 1, boxY) !== false;
        const up = this.boxIndex(boxX, boxY - 1) !== false;
        const down = this.boxIndex(boxX, boxY + 1) !== false;

        if (!up && down && !left && right)
            return this.elements.leftUp;

        else if (!up && down && left && right)
            return this.elements.up;

        else if (!up && down && left && !right)
            return this.elements.rightUp;

        else if (up && down && !left && right)
            return this.elements.left;

        else if (up && down && left && right)
            return this.elements.center;

        else if (up && down && left && !right)
            return this.elements.right;

        else if (up && !down && !left && right)
            return this.elements.leftDown;

        else if (up && !down && left && right)
            return this.elements.down;

        else if (up && !down && left && !right)
            return this.elements.rightDown;

        else if (!up && !down && !left && right)
            return this.elements.horizontalLeft;

        else if (!up && !down && left && right)
            return this.elements.horizontalCenter;

        else if (!up && !down && left && !right)
            return this.elements.horizontalRight;

        else if (!up && down && !left && !right)
            return this.elements.verticalUp;

        else if (up && down && !left && !right)
            return this.elements.verticalCenter;

        else if (up && !down && !left && !right)
            return this.elements.verticalDown;

        return this.elements.only;
    }

    drawGrounds() {
        this.drawElements();
    }
}  