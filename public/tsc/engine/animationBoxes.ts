import { Animations } from "./animations";
import { Boxes } from "./boxes";
import type { Canvas } from "./canvas";
import type { Coordinate } from "./coordinate";
import { Plane } from "./plane";
import { Size } from "./size";

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
            length: Plane;
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
                this.boxParameters.size.width * this.boxParameters.length.horizontal,
                this.boxParameters.size.height * this.boxParameters.length.vertical,
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