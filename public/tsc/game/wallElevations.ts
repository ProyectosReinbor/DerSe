import type { Canvas } from "../engine/canvas.js";
import { Coordinate } from "../engine/coordinate.js";
import { ElementBoxes } from "../engine/elementBoxes.js";
import { Plane } from "../engine/plane.js";
import { Size } from "../engine/size.js";
import type { Elevations } from "./elevations.js";
import type { Map } from "./map.js";

export class WallElevations extends ElementBoxes {
    elementPlanes: {
        left: Plane;
        center: Plane;
        right: Plane;
        vertical: Plane;
        horizontalLeft: Plane;
        horizontalCenter: Plane;
        horizontalRight: Plane;
        only: Plane;
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
            left: new Plane(0, 3),
            center: new Plane(1, 3),
            right: new Plane(2, 3),
            vertical: new Plane(3, 3),
            horizontalLeft: new Plane(0, 5),
            horizontalCenter: new Plane(1, 5),
            horizontalRight: new Plane(2, 5),
            only: new Plane(3, 5)
        };
    }

    getElementFromBox(boxes: Coordinate) {
        const leftBoxes = new Coordinate(
            boxes.x - 1,
            boxes.y,
        );
        const rightBoxes = new Coordinate(
            boxes.x + 1,
            boxes.y,
        );

        const left = this.boxIndex(leftBoxes) !== false;
        const right = this.boxIndex(rightBoxes) !== false;

        const isLeft = !left && right;
        if (isLeft) return this.elementPlanes.left;

        const isCenter = left && right;
        if (isCenter) return this.elementPlanes.center;

        const isRight = left && !right;
        if (isRight) return this.elementPlanes.right;

        const isVertical = !left && !right;
        if (isVertical) return this.elementPlanes.only;

        throw new Error("invalid element");
    }

    refreshElements() {
        this.groupElements.forEach(elements => {
            const boxes = this.getBoxesOfCoordinate(elements.initial);
            const element = this.getElementFromBox(boxes);
            elements.element.horizontal = element.horizontal;
            elements.element.vertical = element.vertical;
        });
    }

    setWallElevations(boxes: Coordinate) {
        const element = this.getElementFromBox(boxes);
        const route = "images/terrain/ground/elevation.png";
        this.setElements(
            boxes,
            route,
            {
                element: {
                    plane: element
                }
            },
        );

        this.refreshElements();
    }

    async drawWallElevations() {
        await this.drawElements();
    }
} 