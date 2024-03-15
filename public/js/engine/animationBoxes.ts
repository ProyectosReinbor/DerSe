import { Animations } from "./animations.js";
import { Boxes } from "./boxes.js";
import type { Canvas } from "./canvas.js";
import type { Coordinate } from "./coordinate.js";
import { Plane } from "./plane.js";
import { Size } from "./size.js";

export class AnimationBoxes extends Boxes {
    animationGroup: Animations[] = [];
    animationsParameters: {
        element: {
            size: Size;
        };
        animation: {
            frames: number;
            framesPerSecond: number;
        };
    };
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        boxesParameters: {
            size: Size;
            boxesHorizontal: number;
            boxesVertical: number;
            occupiedBoxes: true | boolean[][];
        },
        animationsParameters: {
            element: {
                size: Size;
            };
            animation: {
                frames: number;
                framesPerSecond: number;
            };
        }
    ) {
        super(
            x,
            y,
            canvas,
            boxesParameters
        );
        this.animationsParameters = animationsParameters;
    }

    setAnimations(
        boxes: Coordinate,
        route: string,
        plane: Plane,
    ) {
        const index = this.boxIndex(boxes);
        if (index !== false) return index;
        const coordinateOfBoxes = this.getCoordinateOfBoxes(boxes);
        const newAnimations = new Animations(
            coordinateOfBoxes,
            new Size(
                this.boxesParameters.size.width * this.boxesParameters.boxesHorizontal,
                this.boxesParameters.size.height * this.boxesParameters.boxesVertical,
            ),
            this.canvas,
            route,
            {
                size: this.animationsParameters.element.size,
                plane: new Plane(
                    0,
                    plane.vertical
                ),
            },
            this.animationsParameters.animation
        );
        this.animationGroup.push(newAnimations);
        const newIndex = this.animationGroup.length - 1;
        this.setBoxIndex(newIndex, boxes);
        return newIndex;
    }

    async drawAnimations() {
        for (const animations of this.animationGroup) {
            await animations.drawAnimation();
        }
    }
}