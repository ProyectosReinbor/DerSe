import type { Canvas_ENGINE } from "../../engine/canvas";
import { Element_ENGINE } from "../../engine/element";
import { ElementBoxes_ENGINE } from "../../engine/elementBoxes";
import type { Elements_ENGINE } from "../../engine/elements";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_ENGINE } from "../map";

export type FlatElevationState = "grass" | "sand";
export type FlatElevationElementIndices = {
    [key in FlatElevationState]: Plane_ENGINE;
}

export class FlatElevations_ENGINE extends ElementBoxes_ENGINE {
    elementIndices: FlatElevationElementIndices;
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
            "images/terrain/ground/flat.png",
            new Element_ENGINE(
                new Size_ENGINE(64, 64),
                new Plane_ENGINE(0, 0)
            )
        );
        this.elementIndices = {
            grass: new Plane_ENGINE(4, 0),
            sand: new Plane_ENGINE(9, 0)
        };
    }

    pushFlatElevation(
        boxIndices: Plane_ENGINE,
        state: FlatElevationState,
    ): Elements_ENGINE | undefined {
        const indices = this.elementIndices[state];
        this.element.setIndices(
            new Plane_ENGINE(
                indices.horizontal,
                indices.vertical
            )
        );
        return this.referencePush(boxIndices);
    }

    drawFlatElevations(): void {
        this.drawElements();
    }
}           