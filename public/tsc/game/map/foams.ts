
import { AnimationBoxes } from "../../engine/animationBoxes.js";
import { Animations } from "../../engine/animations.js";
import { Animation } from "../../engine/animation.js";
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Element } from "../../engine/element.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export class Foams extends AnimationBoxes {
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
            route: "images/terrain/water/foam.png",
            element: new Element({
                size: new Size({ width: 192, height: 192 }),
                indices: new Plane({ horizontal: 0, vertical: 0 })
            }),
            animation: new Animation({ frames: 8, framesPerSecond: 8 })
        });
    }

    pushFoam(indicesBox: Coordinate): Animations | undefined {
        const foam = this.referencePush(indicesBox);
        if (foam === undefined) return undefined;
        foam.initial.x -= this.size.width;
        foam.initial.y -= this.size.height;
        return foam;
    }

    drawFoams() {
        this.drawAnimations();
    }
}