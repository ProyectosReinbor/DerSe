import { Animations } from "./animations.js";
import { Boxes } from "./boxes.js";
import { Canvas } from "./canvas.js";

export class AnimationBoxes extends Boxes {

    animations: Animations[] = [];
    animation: {
        element: {
            size: {
                width: number;
                height: number;
            };
        };
        animation: {
            frames: number;
            framesPerSecond: number;
            horizontal: 0;
        };
    }

    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        factory: {
            size: {
                width: number;
                height: number;
            };
            boxesHorizontal: number;
            boxesVertical: number;
            occupiedBoxes: boolean[][] | true;
        },
        animation: {
            element: {
                size: {
                    width: number;
                    height: number;
                };
            };
            animation: {
                frames: number;
                framesPerSecond: number;
                horizontal: 0;
            };
        }
    ) {
        super(
            x,
            y,
            canvas,
            factory,
        );
        this.animation = animation;
    }

    setAnimations(
        boxX: number,
        boxY: number,
        route: string,
        element: {
            vertical: number;
        },
    ): number {
        const index = this.boxIndex(boxX, boxY);
        if (index !== false) return index;
        const coordinateOfBoxes = this.getCoordinateOfBoxes(boxX, boxY);
        const newAnimations = new Animations(
            coordinateOfBoxes,
            {
                width: this.factory.size.width * this.factory.boxesHorizontal,
                height: this.factory.size.height * this.factory.boxesVertical,
            },
            this.canvas,
            route,
            {
                size: this.animation.element.size,
                horizontal: this.animation.animation.horizontal,
                vertical: element.vertical,
            },
            this.animation.animation
        );
        this.animations.push(newAnimations);
        const newIndex = this.animations.length - 1;
        this.setBoxIndex(boxX, boxY, newIndex);
        return newIndex;
    }

    drawAnimations() {
        this.animations.forEach((animations) => {
            animations.drawAnimation();
        });
    }
}