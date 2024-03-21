
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

    override referencePush(): Castle | undefined { return undefined; }

    castlePush(
        indicesBox: Coordinate,
        state: CastleState,
        color: CastleColor
    ): Castle | undefined {
        const position = this.getPosition(indicesBox);
        const newReference = new Castle({
            initial: position.initial,
            size: position.size,
            canvas: this.canvas,
            state: state,
            color: color
        });

        const indexReference = this.referencesPush(indicesBox, newReference);
        if (indexReference === undefined)
            return undefined;

        return this.references[indexReference];
    }


    drawCastles(): void {
        this.drawImages();
    }
}