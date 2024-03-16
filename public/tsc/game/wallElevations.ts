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
    elevations: Elevations;
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        map: Map,
        elevations: Elevations
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
        this.elevations = elevations;
    }

    getElementFromBox(boxes: Coordinate) {
        const leftUpBoxes = new Coordinate(
            boxes.x - 1,
            boxes.y - 1,
        );
        const leftDoubleUpBoxes = new Coordinate(
            boxes.x - 1,
            boxes.y - 2,
        );
        const upBoxes = new Coordinate(
            boxes.x,
            boxes.y - 1,
        );
        const doubleUpBoxes = new Coordinate(
            boxes.x,
            boxes.y - 2,
        );
        const rightUpBoxes = new Coordinate(
            boxes.x + 1,
            boxes.y - 1,
        );
        const rightDoubleUpBoxes = new Coordinate(
            boxes.x + 1,
            boxes.y - 2,
        );

        const center = this.elevations.boxIndex(boxes) !== false;
        const leftUp = this.elevations.boxIndex(leftUpBoxes) !== false;
        const leftDoubleUp = this.elevations.boxIndex(leftDoubleUpBoxes) !== false;
        const up = this.elevations.boxIndex(upBoxes) !== false;
        const doubleUp = this.elevations.boxIndex(doubleUpBoxes) !== false;
        const rightUp = this.elevations.boxIndex(rightUpBoxes) !== false;
        const rightDoubleUp = this.elevations.boxIndex(rightDoubleUpBoxes) !== false;

        const isLeft = !center && !leftUp && !leftDoubleUp && up && doubleUp && rightUp && rightDoubleUp;
        if (isLeft) return this.elementPlanes.left;

        const isCenter = !center && leftUp && leftDoubleUp && up && doubleUp && rightUp && rightDoubleUp;
        if (isCenter) return this.elementPlanes.center;


        const isRight = !center && leftUp && leftDoubleUp && up && doubleUp && !rightUp && !rightDoubleUp;
        if (isRight) return this.elementPlanes.right;

        const isVertical = !center && !leftUp && !leftDoubleUp && up && doubleUp && !rightUp && !rightDoubleUp;
        if (isVertical) return this.elementPlanes.vertical;

        const isHorizontalLeft = !center && !leftUp && up && rightUp;
        if (isHorizontalLeft) return this.elementPlanes.horizontalLeft;

        const isHorizontalCenter = !center && leftUp && up && rightUp;
        if (isHorizontalCenter) return this.elementPlanes.horizontalCenter;

        const isHorizontalRight = !center && leftUp && up && !rightUp;
        if (isHorizontalRight) return this.elementPlanes.horizontalRight;

        const isOnly = !center && !leftUp && up && !rightUp;
        if (isOnly) return this.elementPlanes.only;

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