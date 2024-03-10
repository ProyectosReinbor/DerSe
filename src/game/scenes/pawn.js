
import { Canvas, Character } from "../engine.js";

export class Pawn extends Character {
    constructor(
        initial: {
            x: number;
            y: number;
        },
        boxes: {
            width: number;
            height: number;
        },
        canvas: Canvas,
        color: "blue" | "purple" | "red" | "yellow"
    ) {
        super(
            initial,
            {
                width: boxes.width * 3,
                height: boxes.height * 3,
            },
            canvas,
            `images/factions/knights/troops/pawn/${color}.png`,
            {
                size: {
                    width: 192,
                    height: 192,
                },
                horizontal: 0,
                vertical: 0,
            },
            {
                frames: 6,
                framesPerSecond: 6
            },
            {
                x: 2,
                y: 2
            }
        );
    }

    drawPawn(): void {
        this.drawCharacter();
    }
}