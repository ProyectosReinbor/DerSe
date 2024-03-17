
import { AnimationBoxes } from "../../engine/animationBoxes.js";
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export class Foams extends AnimationBoxes {
    constructor(
        canvas: Canvas,
        map: Map
    ) {
        super(
            map.initial.x,
            map.initial.y,
            canvas,
            {
                size: new Size(map.boxes.width, map.boxes.height),
                length: new Plane(3, 3),
                occupiedBoxes: [
                    [true, false, false],
                    [false, false, false],
                    [false, false, false]
                ]
            },
            {
                element: {
                    size: new Size(192, 192),
                },
            }
        );
    }

    setFoam(boxes: Coordinate) {
        const route = `images/terrain/water/foam.png`;
        const index = this.setAnimations(
            boxes,
            route,
            new Plane,
            {
                animation: {
                    frames: 8,
                    framesPerSecond: 8
                }
            }
        );
        const foam = this.animationGroup[index];
        foam.initial.x -= this.boxParameters.size.width;
        foam.initial.y -= this.boxParameters.size.height;
    }

    async drawFoams() {
        await this.drawAnimations();
    }
}