
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { ElementBoxes } from "../../engine/elementBoxes.js";
import { Element } from "../../engine/element.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";
import type { Elements } from "../../engine/elements.js";

export type StairElevationState = "left" | "center" | "right" | "only";
export type StairElevationElementIndices = {
    [key in StairElevationState]: Plane;
};

export class StairsElevations extends ElementBoxes {
    elementIndices: StairElevationElementIndices;
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
            left: new Plane({ horizontal: 0, vertical: 7 }),
            center: new Plane({ horizontal: 1, vertical: 7 }),
            right: new Plane({ horizontal: 2, vertical: 7 }),
            only: new Plane({ horizontal: 3, vertical: 7 })
        };
    }

    positionStairElevation(indicesBox: Coordinate): StairElevationState {
        const leftIndicesBox = new Coordinate({
            x: indicesBox.x - 1,
            y: indicesBox.y,
        });
        const rightIndicesBox = new Coordinate({
            x: indicesBox.x + 1,
            y: indicesBox.y,
        });

        const left = this.indicesBox(leftIndicesBox) !== undefined;
        const right = this.indicesBox(rightIndicesBox) !== undefined;

        const isLeft = !left && right;
        if (isLeft) return "left";

        const isCenter = left && right;
        if (isCenter) return "center";

        const isRight = left && !right;
        if (isRight) return "right";

        const isOnly = !left && !right;
        if (isOnly) return "only";

        throw new Error("invalid element");
    }

    refreshElements(): void {
        this.references.forEach(elements => {
            const indicesBox = this.indicesBox(elements.initial);
            const position = this.positionStairElevation(indicesBox);
            const indices = this.elementIndices[position];
            elements.element.setIndices(
                new Plane({
                    horizontal: indices.horizontal,
                    vertical: indices.vertical
                })
            );
        });
    }

    setStairsElevations(indicesBox: Coordinate): Elements | undefined {
        const stairElevation = this.referencePush(indicesBox);
        if (stairElevation === undefined)
            return undefined;

        this.refreshElements();
        return stairElevation;
    }

    drawStairsElevations(): void {
        this.drawElements();
    }
}