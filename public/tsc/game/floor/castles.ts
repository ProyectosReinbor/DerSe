
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { ImageBoxes } from "../../engine/imageBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";
import { Castle, type CastleColor, type CastleState } from "./castle.js";

export class Castles extends ImageBoxes {

    override references: Castle[] = [];

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
            length: new Plane({ horizontal: 4, vertical: 3 }),
            occupied: true,
            route: false
        });
    }

    pushCastle(
        indicesBox: Coordinate,
        state: CastleState,
        color: CastleColor,
    ): Castle | undefined {
        const box = this.getBox(indicesBox);
        if (box !== undefined)
            return undefined;

        const reference = this.reference(indicesBox);
        const castle = new Castle({
            initial: reference.initial,
            size: reference.size,
            canvas: this.canvas,
            state,
            color
        });
        this.pushReference(indicesBox, castle);
        return castle;
    }


    drawCastles() {
        this.drawImages();
    }
}