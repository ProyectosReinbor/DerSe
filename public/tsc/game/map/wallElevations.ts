import { ElementBoxes } from "../../engine/elementBoxes.js";
import type { Map } from "../map.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import { Coordinate } from "../../engine/coordinate.js";
import type { Canvas } from "../../engine/canvas.js";
import { Element } from "../../engine/element.js";
import type { Elements } from "../../engine/elements.js";

export type WallElevationState = "left" | "center" | "right" | "only";

export type WallElevationElementIndices = {
    [key in WallElevationState]: Plane;
};

export class WallElevations extends ElementBoxes {
    elementIndices: WallElevationElementIndices;
    constructor(props: {
        map: Map,
        canvas: Canvas,
    }) {
        super({
            x: props.map.initial.x,
            y: props.map.initial.y,
            canvas: props.canvas,
            size: new Size({
                width: props.map.boxes.width,
                height: props.map.boxes.height
            }),
            length: new Plane({
                horizontal: 1,
                vertical: 1
            }),
            occupied: true,
            route: "images/terrain/ground/elevation.png",
            element: new Element({
                size: new Size({ width: 64, height: 64 }),
                indices: new Plane({ horizontal: 0, vertical: 0 })
            })
        });
        this.elementIndices = {
            left: new Plane({ horizontal: 0, vertical: 3 }),
            center: new Plane({ horizontal: 1, vertical: 3 }),
            right: new Plane({ horizontal: 2, vertical: 3 }),
            only: new Plane({ horizontal: 3, vertical: 5 })
        };
    }

    wallElevationPosition(indicesBox: Coordinate): WallElevationState {
        const leftBoxes = new Coordinate({
            x: indicesBox.x - 1,
            y: indicesBox.y,
        });
        const rightBoxes = new Coordinate({
            x: indicesBox.x + 1,
            y: indicesBox.y,
        });
        const left = this.getBox(leftBoxes) !== undefined;
        const right = this.getBox(rightBoxes) !== undefined;

        const isLeft = !left && right;
        if (isLeft) return "left";

        const isCenter = left && right;
        if (isCenter) return "center";

        const isRight = left && !right;
        if (isRight) return "right";

        const isVertical = !left && !right;
        if (isVertical) return "only";

        throw new Error("invalid element");
    }

    refreshElements() {
        this.references.forEach(elements => {
            const indicesBox = this.indicesBox(elements.initial);
            const position = this.wallElevationPosition(indicesBox);
            const indices = this.elementIndices[position];
            elements.element.setIndices(
                new Plane({
                    horizontal: indices.horizontal,
                    vertical: indices.vertical
                })
            );
        });
    }

    pushWallElevation(indicesBox: Coordinate): Elements | undefined {
        const wallElevation = this.referencePush(indicesBox);
        if (wallElevation === undefined)
            return undefined;

        this.refreshElements();
        return wallElevation;
    }

    drawWallElevations() {
        this.drawElements();
    }
} 