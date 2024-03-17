
import { Box } from "../../engine/box.js";
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { ElementBoxes } from "../../engine/elementBoxes.js";
import { Elements } from "../../engine/elements.js";
import { Element } from "../../engine/elements/element.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export class StairsElevations extends ElementBoxes {
    stairsElevationsDefault: {
        left: Elements;
        center: Elements;
        right: Elements;
        only: Elements;
    };
    constructor(
        map: Map,
        canvas: Canvas,
    ) {
        super(
            map.initial.x,
            map.initial.y,
            canvas,
            new Box(
                new Size(map.boxes.width, map.boxes.height),
                new Plane(1, 1),
                true,
            )
        );
        const StairsElevationsDefault = (plane: Plane) => new Elements(
            new Coordinate,
            new Size,
            canvas,
            "images/terrain/ground/elevation.png",
            new Element(
                new Size(64, 64),
                plane
            )
        );
        this.stairsElevationsDefault = {
            left: StairsElevationsDefault(new Plane(0, 7)),
            center: StairsElevationsDefault(new Plane(1, 7)),
            right: StairsElevationsDefault(new Plane(2, 7)),
            only: StairsElevationsDefault(new Plane(3, 7))
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
        if (isLeft) return this.stairsElevationsDefault.left;

        const isCenter = left && right;
        if (isCenter) return this.stairsElevationsDefault.center;

        const isRight = left && !right;
        if (isRight) return this.stairsElevationsDefault.right;

        const isOnly = !left && !right;
        if (isOnly) return this.stairsElevationsDefault.only;

        throw new Error("invalid element");
    }

    refreshElements() {
        this.groupElements.forEach(elements => {
            const boxes = this.getBoxesOfCoordinate(elements.initial);
            const elementsDefault = this.getElementFromBox(boxes);
            elements.element.horizontal = elementsDefault.element.horizontal;
            elements.element.vertical = elementsDefault.element.vertical;
        });
    }

    setStairsElevations(boxes: Coordinate) {
        const elementsDefault = this.getElementFromBox(boxes);
        this.setElements(
            boxes,
            elementsDefault
        );
        this.refreshElements();
    }

    async drawStairsElevations() {
        await this.drawElements();
    }
}