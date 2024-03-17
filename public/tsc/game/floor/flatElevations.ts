
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { ElementBoxes } from "../../engine/elementBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export class FlatElevations extends ElementBoxes {
    flatElevationsParameters: {
        element: {
            grass: Plane;
            sand: Plane;
        }
    };
    constructor(
        canvas: Canvas,
        map: Map,
    ) {
        super(
            map.initial.x,
            map.initial.y,
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
        this.flatElevationsParameters = {
            element: {
                grass: new Plane(4, 0),
                sand: new Plane(9, 0)
            }
        };
    }

    setFlatElevation(
        boxes: Coordinate,
        plane: "grass" | "sand"
    ) {
        const element = this.flatElevationsParameters.element[plane];
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