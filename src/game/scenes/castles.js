import { Canvas, ImageBoxes } from "../engine.js";

export class Castles extends ImageBoxes {

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
                boxesHorizontal: 4,
                boxesVertical: 3,
                occupiedBoxes: true
            },
        );
    }

    setCastle(
        boxX: number,
        boxY: number,
        color: "blue" | "purple" | "red" | "yellow",
        state: "construction" | "ready" | "destroyed",
    ): number {
        return this.setImage(
            boxX,
            boxY,
            this.routeCastle(color, state)
        );
    }

    routeCastle(
        color: "blue" | "purple" | "red" | "yellow",
        state: "construction" | "ready" | "destroyed",
    ) {
        let name: string = state;
        if (state === "ready") name = color;
        return `images/factions/knights/buildings/castle/${name}.png`;
    }

    drawCastles() {
        this.drawImages();
    }
}