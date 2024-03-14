import { ElementBoxes } from "../engine/elementBoxes.js";

export class StairsElevations extends ElementBoxes {
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
                vertical: 7,
            },
            center: {
                horizontal: 1,
                vertical: 7,
            },
            right: {
                horizontal: 2,
                vertical: 7,
            },
            only: {
                horizontal: 3,
                vertical: 7,
            }
        }
        this.elevations = elevations;
    }

    getElementFromBox(
        boxX,
        boxY,
    ) {
        const center = this.elevations.boxIndex(boxX, boxY) !== false;
        const leftUp = this.elevations.boxIndex(boxX - 1, boxY - 1) !== false;
        const up = this.elevations.boxIndex(boxX, boxY - 1) !== false;
        const rightUp = this.elevations.boxIndex(boxX + 1, boxY - 1) !== false;

        if (!center && !leftUp && up && rightUp)
            return this.elements.left;

        if (!center && leftUp && up && rightUp)
            return this.elements.center;

        if (!center && leftUp && up && !rightUp)
            return this.elements.right;

        if (!center && !leftUp && up && !rightUp)
            return this.elements.only;

        return false;
    }

    // refreshElements() {
    //     this.groupElements.forEach((elements, index) => {
    //         const boxes = this.getBoxesOfCoordinate(
    //             elements.initial.x,
    //             elements.initial.y
    //         );
    //         const element = this.getElementFromBox(
    //             boxes.x,
    //             boxes.y,
    //         );
    //         if (element === false) {
    //             this.groupElements.splice(index, 1);
    //             return;
    //         }
    //         elements.element.horizontal = element.horizontal;
    //         elements.element.vertical = element.vertical;
    //     });
    // }

    setStairsElevations(boxX, boxY) {
        const element = this.getElementFromBox(
            boxX,
            boxY,
        );
        if (element === false) return;
        const route = `images/terrain/ground/elevation.png`;
        this.setElements(
            boxX,
            boxY,
            route,
            element.horizontal,
            element.vertical,
        );
    }

    async drawStairsElevations() {
        await this.drawElements();
    }
}