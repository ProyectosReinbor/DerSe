import {
    Canvas,
    Coordinate,
    Plane,
    Size,
    AnimationBoxes
} from "../../engine/exports.js";
import type { Map } from "../map.js";

export class Foams extends AnimationBoxes {
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        map: Map
    ) {
        super(
            x,
            y,
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
                animation: {
                    frames: 8,
                    framesPerSecond: 8
                }
            }
        );
    }

    setFoam(boxes: Coordinate) {
        const route = `images/terrain/water/foam.png`;
        const index = this.setAnimations(
            boxes,
            route,
            new Plane,
        );
        const foam = this.animationGroup[index];
        foam.initial.x -= this.boxParameters.size.width;
        foam.initial.y -= this.boxParameters.size.height;
    }

    async drawFoams() {
        await this.drawAnimations();
    }
}