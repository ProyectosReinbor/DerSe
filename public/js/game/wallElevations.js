import { ElementBoxes } from "../engine/elementBoxes.js";

export class WallElevations extends ElementBoxes {
    constructor(
        x, y,
        canvas,
        map,
        elevations
    ) {
        super(
            x, y,
            canvas,
            map.boxes.width,
            map.boxes.height,
            1,
            1,
            true,
            64,
            64,
        );
        this.elements = {
            left: {
                horizontal: 0,
                vertical: 3,
            },
            center: {
                horizontal: 1,
                vertical: 3,
            },
            right: {
                horizontal: 2,
                vertical: 3,
            },
            vertical: {
                horizontal: 3,
                vertical: 3,
            },
            horizontalLeft: {
                horizontal: 0,
                vertical: 5,
            },
            horizontalCenter: {
                horizontal: 1,
                vertical: 5,
            },
            horizontalRight: {
                horizontal: 2,
                vertical: 5,
            },
            only: {
                horizontal: 3,
                vertical: 5,
            },

        }
        this.elevations = elevations;
    }

    getElementFromBox(
        boxX,
        boxY,
    ) {
        return this.elements.only;

        const center = this.elevations.boxIndex(boxX, boxY) !== false;
        const leftUp = this.elevations.boxIndex(boxX - 1, boxY - 1) !== false;
        const leftDoubleUp = this.elevations.boxIndex(boxX - 1, boxY - 2) !== false;
        const up = this.elevations.boxIndex(boxX, boxY - 1) !== false;
        const doubleUp = this.elevations.boxIndex(boxX, boxY - 2) !== false;
        const rightUp = this.elevations.boxIndex(boxX + 1, boxY - 1) !== false;
        const rightDoubleUp = this.elevations.boxIndex(boxX + 1, boxY - 2) !== false;

        if (!center && !leftUp && !leftDoubleUp && up && doubleUp && rightUp && rightDoubleUp)
            return this.elements.left;

        if (!center && leftUp && leftDoubleUp && up && doubleUp && rightUp && rightDoubleUp)
            return this.elements.center;

        if (!center && leftUp && leftDoubleUp && up && doubleUp && !rightUp && !rightDoubleUp)
            return this.elements.right;

        if (!center && !leftUp && !leftDoubleUp && up && doubleUp && !rightUp && !rightDoubleUp)
            return this.elements.vertical;

        if (!center && !leftUp && up && rightUp)
            return this.elements.horizontalLeft;

        if (!center && leftUp && up && rightUp)
            return this.elements.horizontalCenter;

        if (!center && leftUp && up && !rightUp)
            return this.elements.horizontalRight;

        if (!center && !leftUp && up && !rightUp)
            return this.elements.only;

        return this.elements.only;
    }

    refreshElements() {
        this.groupElements.forEach((elements, index) => {
            const boxes = this.getBoxesOfCoordinate(
                elements.initial.x,
                elements.initial.y
            );
            const element = this.getElementFromBox(
                boxes.x,
                boxes.y,
            );
            elements.element.horizontal = element.horizontal;
            elements.element.vertical = element.vertical;
        });
    }

    setWallElevations(boxX, boxY) {
        const element = this.getElementFromBox(
            boxX,
            boxY,
        );
        const route = "images/terrain/ground/elevation.png";
        this.setElements(
            boxX,
            boxY,
            route,
            element.horizontal,
            element.vertical,
        );

        this.refreshElements();
    }

    async drawWallElevations() {
        await this.drawElements();
    }
} 