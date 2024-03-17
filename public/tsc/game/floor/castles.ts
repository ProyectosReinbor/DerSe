
import { Box } from "../../engine/box.js";
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Image } from "../../engine/image.js";
import { ImageBoxes } from "../../engine/imageBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export class Castles extends ImageBoxes {
    castlesDefault: {
        ready: {
            blue: Image;
            purple: Image;
            red: Image;
            yellow: Image;
        };
        construction: Image;
        destroyed: Image;
    }
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
        const CastlesDefault = (
            state: "construction" | "ready" | "destroyed",
            color: "blue" | "purple" | "red" | "yellow" = "blue",
        ) => {
            let file: string = state;
            if (state === "ready") file = color;
            return new Image(
                new Coordinate,
                new Size,
                this.canvas,
                `images/factions/knights/buildings/castle/${file}.png`,
            );
        }
        this.castlesDefault = {
            ready: {
                blue: CastlesDefault("ready", "blue"),
                purple: CastlesDefault("ready", "purple"),
                red: CastlesDefault("ready", "red"),
                yellow: CastlesDefault("ready", "yellow"),
            },
            construction: CastlesDefault("construction"),
            destroyed: CastlesDefault("destroyed")
        }
    }

    setCastle(
        boxes: Coordinate,
        state: "construction" | "ready" | "destroyed",
        color: "blue" | "purple" | "red" | "yellow",
    ) {
        let imageDefault = this.castlesDefault.ready[color];
        if (state !== "ready") {
            imageDefault = this.castlesDefault[state];
        }
        return this.setImage(
            boxes,
            imageDefault
        );
    }


    async drawCastles() {
        await this.drawImages();
    }
}