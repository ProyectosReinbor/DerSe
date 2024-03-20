
import { AnimationBoxes } from "../../engine/animationBoxes.js";
import { Animations } from "../../engine/animations.js";
import { Animation } from "../../engine/animation.js";
import { Box } from "../../engine/box.js";
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Element } from "../../engine/element.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export class Foams extends AnimationBoxes {
    foamDefault: Animations;
    constructor(props: {
        map: Map,
        canvas: Canvas,
    }) {
        super({
            x: props.map.initial.x,
            y: props.map.initial.y,
            canvas: props.canvas,
            default: new Box({
                size: new Size({
                    width: props.map.boxes.width,
                    height: props.map.boxes.height
                }),
                length: new Plane({
                    horizontal: 3,
                    vertical: 3
                }),
                occupiedBoxes: [
                    [true, false, false],
                    [false, false, false],
                    [false, false, false]
                ]
            })
        });
        this.foamDefault = new Animations({
            initial: new Coordinate({ x: 0, y: 0 }),
            size: new Size({ width: 0, height: 0 }),
            canvas: props.canvas,
            route: "images/terrain/water/foam.png",
            element: new Element({
                size: new Size({ width: 192, height: 192 }),
                indices: new Plane({ horizontal: 0, vertical: 0 })
            }),
            animation: new Animation({ frames: 8, framesPerSecond: 8 })
        });
    }

    setFoam(boxes: Coordinate) {
        const index = this.setAnimations(
            boxes,
            this.foamDefault
        );
        if (index === false) return false;
        const foam = this.animationGroup[index];
        if (foam === undefined) return false;
        foam.initial.x -= this.default.size.width;
        foam.initial.y -= this.default.size.height;
        return index;
    }

    drawFoams() {
        this.drawAnimations();
    }
}