
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { ImageBoxes } from "../../engine/imageBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export class Castles extends ImageBoxes {

    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        map: Map
    ) {
        super(
            x, y,
            canvas,
            {
                size: new Size(map.boxes.width, map.boxes.height),
                length: new Plane(4, 3),
                occupiedBoxes: true
            }
        );
    }

    setCastle(
        boxes: Coordinate,
        color: "blue" | "purple" | "red" | "yellow",
        state: "construction" | "ready" | "destroyed",
    ) {
        const route = this.routeCastle(color, state);
        return this.setImage(
            boxes,
            route
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