import { Canvas } from "../engine.js";
import { Grounds } from "./grounds.js";

export class Elevations extends Grounds {

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
            boxes,
            {
                leftUp: {
                    horizontal: 0,
                    vertical: 0,
                },
                up: {
                    horizontal: 1,
                    vertical: 0,
                },
                rightUp: {
                    horizontal: 2,
                    vertical: 0,
                },
                left: {
                    horizontal: 0,
                    vertical: 1,
                },
                center: {
                    horizontal: 1,
                    vertical: 1,
                },
                right: {
                    horizontal: 2,
                    vertical: 1,
                },
                leftDown: {
                    horizontal: 0,
                    vertical: 2,
                },
                down: {
                    horizontal: 1,
                    vertical: 2,
                },
                rightDown: {
                    horizontal: 2,
                    vertical: 2,
                },
                leftHorizontal: {
                    horizontal: 0,
                    vertical: 4,
                },
                centerHorizontal: {
                    horizontal: 1,
                    vertical: 4,
                },
                rightHorizontal: {
                    horizontal: 2,
                    vertical: 4,
                },
                upVertical: {
                    horizontal: 3,
                    vertical: 0,
                },
                centerVertical: {
                    horizontal: 3,
                    vertical: 1,
                },
                downVertical: {
                    horizontal: 3,
                    vertical: 2,
                },
                only: {
                    horizontal: 3,
                    vertical: 4,
                }
            }
        );
    }

    setElevation(boxX: number, boxY: number) {
        this.setGround(
            boxX,
            boxY,
            "images/terrain/ground/elevation.png",
        );
    }

    drawElevations() {
        this.drawGrounds();
    }
}
