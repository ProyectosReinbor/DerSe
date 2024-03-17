
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { ElementBoxes } from "../../engine/elementBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export class StairsElevations extends ElementBoxes {
    stairsElevationsParameters: {
        element: {
            left: Plane;
            center: Plane;
            right: Plane;
            only: Plane;
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
        this.stairsElevationsParameters = {
            element: {
                left: new Plane(0, 7),
                center: new Plane(1, 7),
                right: new Plane(2, 7),
                only: new Plane(3, 7)
            }
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
        if (isLeft) return this.stairsElevationsParameters.element.left;

        const isCenter = left && right;
        if (isCenter) return this.stairsElevationsParameters.element.center;

        const isRight = left && !right;
        if (isRight) return this.stairsElevationsParameters.element.right;

        const isOnly = !left && !right;
        if (isOnly) return this.stairsElevationsParameters.element.only;

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
        this.refreshElements();
    }

    async drawStairsElevations() {
        await this.drawElements();
    }
}