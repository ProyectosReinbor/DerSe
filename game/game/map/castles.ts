import type { Canvas_ENGINE } from "../../engine/canvas";
import { ImageBoxes_ENGINE } from "../../engine/imageBoxes";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_ENGINE } from "../map";
import {
    Castle_ENGINE,
    type CastleColor,
    type CastleState
} from "./castle";



export class Castles_ENGINE extends ImageBoxes_ENGINE {

    override references: Castle_ENGINE[] = [];

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
            new Plane_ENGINE(4, 3),
            true,
            false
        );
    }

    castlePush(
        boxIndices: Plane_ENGINE,
        state: CastleState,
        color: CastleColor,
    ): number | undefined {
        const position = this.getPosition(boxIndices);
        const reference = new Castle_ENGINE(
            position.leftUp,
            position.size,
            this.canvas,
            state,
            color
        );

        const indexReference = this.referencesPush(
            boxIndices,
            reference
        );
        if (indexReference === undefined)
            return undefined;

        // return this.references[indexReference];
        return 0;
    }


    drawCastles(): void {
        this.drawImages();
    }
}