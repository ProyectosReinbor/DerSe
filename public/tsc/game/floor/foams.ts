
import { AnimationBoxes } from "../../engine/animationBoxes.js";
import { Animations } from "../../engine/animations.js";
import { Animation } from "../../engine/animations/animation.js";
import { Box } from "../../engine/box.js";
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Element } from "../../engine/elements/element.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export class Foams extends AnimationBoxes {
    foamDefault: Animations;
    constructor(
        map: Map,
        canvas: Canvas,
    ) {
        super(
            map.initial.x,
            map.initial.y,
            canvas,
            new Box(
                new Size(map.boxes.width, map.boxes.height),
                new Plane(3, 3),
                [
                    [true, false, false],
                    [false, false, false],
                    [false, false, false]
                ]
            )
        );
        this.foamDefault = new Animations(
            new Coordinate,
            new Size,
            this.canvas,
            "images/terrain/water/foam.png",
            new Element(
                new Size(192, 192),
                new Plane
            ),
            new Animation(8, 8)
        );
    }

    setFoam(boxes: Coordinate) {
        const index = this.setAnimations(
            boxes,
            this.foamDefault
        );
        if (index === false) return false;
        const foam = this.animationGroup[index];
        foam.initial.x -= this.boxDefault.size.width;
        foam.initial.y -= this.boxDefault.size.height;
    }

    async drawFoams() {
        await this.drawAnimations();
    }
}