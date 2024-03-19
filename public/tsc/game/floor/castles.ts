
import { Box } from "../../engine/box.js";
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { ImageBoxes } from "../../engine/imageBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";
import { Castle, type Color, type State } from "./castle.js";

export class Castles extends ImageBoxes {
    constructor(props: {
        map: Map,
        canvas: Canvas,
    }) {
        super({
            x: props.map.initial.x,
            y: props.map.initial.y,
            canvas: props.canvas,
            boxDefault: new Box({
                size: new Size({
                    width: props.map.boxes.width,
                    height: props.map.boxes.height
                }),
                length: new Plane({ horizontal: 4, vertical: 3 }),
                occupiedBoxes: true
            }),
        });
    }

    setCastle(
        boxes: Coordinate,
        state: State,
        color: Color,
    ) {
        const castleDefault = new Castle({
            initial: new Coordinate({ x: 0, y: 0 }),
            size: new Size({ width: 0, height: 0 }),
            canvas: this.canvas,
            state,
            color
        });
        return this.setImage(
            boxes,
            castleDefault
        );
    }


    drawCastles() {
        this.drawImages();
    }
}