import { Canvas, AnimationBoxes } from "../engine.js";


export class Foams extends AnimationBoxes {

    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        boxes: {
            width: number;
            height: number;
        }
    ) {
        super(
            x,
            y,
            canvas,
            {
                size: boxes,
                boxesHorizontal: 3,
                boxesVertical: 3,
                occupiedBoxes: [
                    [true, false, false],
                    [false, false, false],
                    [false, false, false]
                ]
            },
            {
                element: {
                    size: {
                        width: 192,
                        height: 192,
                    }
                },
                animation: {
                    frames: 8,
                    framesPerSecond: 8,
                    horizontal: 0,
                }
            },
        );
        const rows = 100 / this.factory.size.height;
        const columns = 100 / this.factory.size.width;
        for (let y = 1; y < rows - 1; y++) {
            for (let x = 1; x < columns - 1; x++) {
                this.setFoam(x, y);
            }
        }
    }

    setFoam(boxX: number, boxY: number) {
        const route = `images/terrain/water/foam.png`;
        const index = this.setAnimations(
            boxX,
            boxY,
            route,
            {
                vertical: 0,
            }
        );
        const foam = this.animations[index];
        foam.initial.x -= this.factory.size.width;
        foam.initial.y -= this.factory.size.height;
    }

    drawFoams() {
        this.drawAnimations();
    }
}