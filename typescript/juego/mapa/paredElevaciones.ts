import type { Canvas_ENGINE } from "../../engine/canvas";
import { Element_ENGINE } from "../../engine/element";
import { ElementBoxes_ENGINE } from "../../engine/elementBoxes";
import type { Elements_ENGINE } from "../../engine/elements";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_ENGINE } from "../map";

export type WallElevationState = "left" | "center" | "right" | "only";

export type WallElevationElementIndices = {
    [key in WallElevationState]: Plane_ENGINE;
};

export class WallElevations_ENGINE extends ElementBoxes_ENGINE {

    elementIndices: WallElevationElementIndices;

    constructor(
        map: Map_ENGINE,
        canvas: Canvas_ENGINE,
    ) {
        super(
            map.leftUp.x,
            map.leftUp.y,
            canvas,
            new Size_ENGINE(
                map.boxes.width,
                map.boxes.height
            ),
            new Plane_ENGINE(1, 1),
            true,
            "images/terrain/ground/elevation.png",
            new Element_ENGINE(
                new Size_ENGINE(64, 64),
                new Plane_ENGINE(0, 0)
            )
        );
        this.elementIndices = {
            left: new Plane_ENGINE(0, 3),
            center: new Plane_ENGINE(1, 3),
            right: new Plane_ENGINE(2, 3),
            only: new Plane_ENGINE(3, 5)
        };
    }

    wallElevationPosition(boxIndices: Plane_ENGINE): WallElevationState {
        const leftBoxes = new Plane_ENGINE(
            boxIndices.horizontal - 1,
            boxIndices.vertical,
        );
        const rightBoxes = new Plane_ENGINE(
            boxIndices.horizontal + 1,
            boxIndices.vertical,
        );
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
            const boxIndices = this.getBoxIndices(elements.leftUp);
            const position = this.wallElevationPosition(boxIndices);
            const indices = this.elementIndices[position];
            elements.element.setIndices(
                new Plane_ENGINE(
                    indices.horizontal,
                    indices.vertical
                )
            );
        });
    }

    pushWallElevation(boxIndices: Plane_ENGINE): Elements_ENGINE | undefined {
        const wallElevation = this.referencePush(boxIndices);
        if (wallElevation === undefined)
            return undefined;

        this.refreshElements();
        return wallElevation;
    }

    drawWallElevations() {
        this.drawElements();
    }
} 