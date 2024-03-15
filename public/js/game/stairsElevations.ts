import type { Canvas } from "../engine/canvas.js";
import { Coordinate } from "../engine/coordinate.js";
import { ElementBoxes } from "../engine/elementBoxes.js";
import { Plane } from "../engine/plane.js";
import { Size } from "../engine/size.js";
import type { Elevations } from "./elevations.js";
import type { Map } from "./map.js";

export class StairsElevations extends ElementBoxes {
    elementPlanes: {
        left: Plane;
        center: Plane;
        right: Plane;
        only: Plane;
    };
    elevations: Elevations;
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        map: Map,
        elevations: Elevations
    ) {
        super(
            x, y,
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
            left: new Plane(0, 7),
            center: new Plane(1, 7),
            right: new Plane(2, 7),
            only: new Plane(3, 7)
        };
        this.elevations = elevations;
    }

    getElementFromBox(boxes: Coordinate) {
        const leftUpBoxes = new Coordinate(
            boxes.x - 1,
            boxes.y - 1,
        );
        const upBoxes = new Coordinate(
            boxes.x,
            boxes.y - 1,
        );
        const rightUpBoxes = new Coordinate(
            boxes.x + 1,
            boxes.y - 1,
        );

        const center = this.elevations.boxIndex(boxes) !== false;
        const leftUp = this.elevations.boxIndex(leftUpBoxes) !== false;
        const up = this.elevations.boxIndex(upBoxes) !== false;
        const rightUp = this.elevations.boxIndex(rightUpBoxes) !== false;

        const isLeft = !center && !leftUp && up && rightUp;
        if (isLeft) return this.elementPlanes.left;

        const isCenter = !center && leftUp && up && rightUp;
        if (isCenter) return this.elementPlanes.center;

        const isRight = !center && leftUp && up && !rightUp;
        if (isRight) return this.elementPlanes.right;

        const isOnly = !center && !leftUp && up && !rightUp;
        if (isOnly) return this.elementPlanes.only;

        throw new Error("invalid element");
    }

    setStairsElevations(boxes: Coordinate) {
        const element = this.getElementFromBox(boxes);
        const route = `images/terrain/ground/elevation.png`;
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

    async drawStairsElevations() {
        await this.drawElements();
    }
}