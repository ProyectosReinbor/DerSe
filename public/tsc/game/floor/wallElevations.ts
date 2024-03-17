import { ElementBoxes } from "../../engine/elementBoxes.js";
import type { Map } from "../map.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import { Coordinate } from "../../engine/coordinate.js";
import type { Canvas } from "../../engine/canvas.js";
import { Box } from "../../engine/box.js";
import { Elements } from "../../engine/elements.js";
import { Element } from "../../engine/elements/element.js";

export class WallElevations extends ElementBoxes {
    wallElevationsDefault: {
        left: Elements;
        center: Elements;
        right: Elements;
        vertical: Elements;
        horizontalLeft: Elements;
        horizontalCenter: Elements;
        horizontalRight: Elements;
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
        const WallElevationsDefault = (plane: Plane) => new Elements(
            new Coordinate,
            new Size,
            canvas,
            "images/terrain/ground/elevation.png",
            new Element(
                new Size(64, 64),
                plane
            )
        );
        this.wallElevationsDefault = {
            left: WallElevationsDefault(new Plane(0, 3)),
            center: WallElevationsDefault(new Plane(1, 3)),
            right: WallElevationsDefault(new Plane(2, 3)),
            vertical: WallElevationsDefault(new Plane(3, 3)),
            horizontalLeft: WallElevationsDefault(new Plane(0, 5)),
            horizontalCenter: WallElevationsDefault(new Plane(1, 5)),
            horizontalRight: WallElevationsDefault(new Plane(2, 5)),
            only: WallElevationsDefault(new Plane(3, 5))
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
        if (isLeft) return this.wallElevationsDefault.left;

        const isCenter = left && right;
        if (isCenter) return this.wallElevationsDefault.center;

        const isRight = left && !right;
        if (isRight) return this.wallElevationsDefault.right;

        const isVertical = !left && !right;
        if (isVertical) return this.wallElevationsDefault.only;

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

    setWallElevations(boxes: Coordinate) {
        const elementsDefault = this.getElementFromBox(boxes);
        this.setElements(
            boxes,
            elementsDefault
        );

        this.refreshElements();
    }

    drawWallElevations() {
        this.drawElements();
    }
} 