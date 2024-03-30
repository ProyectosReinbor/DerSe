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

    constructor(props: {
        map: Map_ENGINE,
        canvas: Canvas_ENGINE,
    }) {
        super({
            x: props.map.leftUp.x,
            y: props.map.leftUp.y,
            canvas: props.canvas,
            size: new Size_ENGINE({
                width: props.map.boxes.width,
                height: props.map.boxes.height
            }),
            length: new Plane_ENGINE({
                horizontal: 4,
                vertical: 3
            }),
            occupied: true,
            route: false
        });
    }

    castlePush(props: {
        boxIndices: Plane_ENGINE;
        state: CastleState;
        color: CastleColor;
    }): number | undefined {
        const position = this.getPosition({
            boxIndices: props.boxIndices
        });
        const reference = new Castle_ENGINE({
            leftUp: position.leftUp,
            size: position.size,
            canvas: this.canvas,
            state: props.state,
            color: props.color
        });

        const indexReference = this.referencesPush({
            boxIndices: props.boxIndices,
            reference
        });
        if (indexReference === undefined)
            return undefined;

        // return this.references[indexReference];
        return 0;
    }


    drawCastles(): void {
        this.drawImages();
    }
}