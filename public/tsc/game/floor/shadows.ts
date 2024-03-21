
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Image } from "../../engine/image.js";
import { ImageBoxes } from "../../engine/imageBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export class Shadows extends ImageBoxes {
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
            length: new Plane({
                horizontal: 3,
                vertical: 3
            }),
            occupied: [
                [true, false, false],
                [false, false, false],
                [false, false, false]
            ],
            route: "images/terrain/ground/shadows.png",
        });
    }

    pushShadow(indicesBox: Coordinate): Image | undefined {
        const shadow = this.referencePush(indicesBox);
        if (shadow === undefined) return undefined;
        shadow.initial.x -= this.size.width;
        shadow.initial.y -= this.size.height;
        return shadow;
    }

    drawShadows() {
        this.drawImages();
    }
}           