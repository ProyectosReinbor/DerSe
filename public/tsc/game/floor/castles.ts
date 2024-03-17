
import { Box } from "../../engine/box.js";
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Image } from "../../engine/image.js";
import { ImageBoxes } from "../../engine/imageBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export class Castles extends ImageBoxes {

    constructor(
        canvas: Canvas,
        map: Map
    ) {
        super(
            map.initial.x,
            map.initial.y,
            canvas,
            new Box(
                new Size(map.boxes.width, map.boxes.height),
                new Plane(4, 3),
                true
            ),
        );
    }

    setCastle(
        boxes: Coordinate,
        color: "blue" | "purple" | "red" | "yellow",
        state: "construction" | "ready" | "destroyed",
    ) {
        return this.setImage(
            boxes,
            new Image(
                new Coordinate,
                new Size,
                this.canvas,
                this.routeCastle(color, state)
            )
        );
    }

    routeCastle(
        color: "blue" | "purple" | "red" | "yellow",
        state: "construction" | "ready" | "destroyed",
    ) {
        let file: string = state;
        if (state === "ready") file = color;
        return `images/factions/knights/buildings/castle/${file}.png`;
    }

    async drawCastles() {
        await this.drawImages();
    }
}