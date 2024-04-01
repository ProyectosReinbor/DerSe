import type { Canvas_ENGINE } from "../../engine/canvas";
import { Element_ENGINE } from "../../engine/element";
import { ElementBoxes_ENGINE } from "../../engine/elementBoxes";
import type { Elements_ENGINE } from "../../engine/elements";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_ENGINE } from "../map";

export type StairElevationState = "left" | "center" | "right" | "only";
export type StairElevationElementIndices = {
    [key in StairElevationState]: Plane_ENGINE;
};

export class StairsElevations_ENGINE extends ElementBoxes_ENGINE {

    elementIndices: StairElevationElementIndices;

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
            left: new Plane_ENGINE(0, 7),
            center: new Plane_ENGINE(1, 7),
            right: new Plane_ENGINE(2, 7),
            only: new Plane_ENGINE(3, 7)
        };
    }

    positionStairElevation(boxIndices: Plane_ENGINE): StairElevationState {
        const leftBoxIndices = new Plane_ENGINE(
            boxIndices.horizontal - 1,
            boxIndices.vertical,
        );
        const rightBoxIndices = new Plane_ENGINE(
            boxIndices.horizontal + 1,
            boxIndices.vertical,
        );

        const left = this.getBox(leftBoxIndices) !== undefined;
        const right = this.getBox(rightBoxIndices) !== undefined;

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
            const boxIndices = this.getBoxIndices(elements.leftUp);
            const position = this.positionStairElevation(boxIndices);
            const indices = this.elementIndices[position];
            elements.element.setIndices(
                new Plane_ENGINE(
                    indices.horizontal,
                    indices.vertical
                )
            );
        });
    }

    setStairsElevations(boxIndices: Plane_ENGINE): Elements_ENGINE | undefined {
        const stairElevation = this.referencePush(boxIndices);
        if (stairElevation === undefined)
            return undefined;

        this.refreshElements();
        return stairElevation;
    }

    drawStairsElevations(): void {
        this.drawElements();
    }
}