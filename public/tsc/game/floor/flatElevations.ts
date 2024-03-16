import {
    Canvas,
    Coordinate,
    Plane,
    Size,
    ElementBoxes
} from "../../engine/exports.js";
import type { Map } from "../map.js";

export class FlatElevations extends ElementBoxes {
    elementPlanes: {
        grass: Plane;
        sand: Plane;
    };
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        map: Map,
    ) {
        super(
            x,
            y,
            canvas,
            {
                size: new Size(map.boxes.width, map.boxes.height),
                length: new Plane(1, 1),
                occupiedBoxes: true,
            },
            {
                element: {
                    size: new Size(64, 64),
                }
            }
        );
        this.elementPlanes = {
            grass: new Plane(4, 0),
            sand: new Plane(9, 0)
        };
    }

    setFlatElevation(
        boxes: Coordinate,
        plane: "grass" | "sand"
    ) {
        const element = this.elementPlanes[plane];
        const route = `images/terrain/ground/flat.png`;
        this.setElements(
            boxes,
            route,
            {
                element: {
                    plane: element
                }
            }
        );
    }

    async drawFlatElevations() {
        await this.drawElements();
    }
}           