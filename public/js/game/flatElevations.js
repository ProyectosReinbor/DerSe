import { ElementBoxes } from "../engine/elementBoxes.js";

export class FlatElevations extends ElementBoxes {
    constructor(
        x, y,
        canvas,
        map,
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
            grass: {
                horizontal: 4,
                vertical: 0,
            },
            sand: {
                horizontal: 9,
                vertical: 0,
            }
        }
    }

    setFlatElevation(boxX, boxY, type) {
        const element = this.elements[type];
        const route = `images/terrain/ground/flat.png`;
        this.setElements(
            boxX,
            boxY,
            route,
            element.horizontal,
            element.vertical,
        );
    }

    async drawStainsForWalls() {
        await this.drawElements();
    }
}           