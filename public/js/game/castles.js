import { ImageBoxes } from "../engine/imageBoxes.js";

export class Castles extends ImageBoxes {

    constructor(
        x, y,
        canvas,
        boxesWidth,
        boxesHeight
    ) {
        super(
            x, y,
            canvas,
            boxesWidth,
            boxesHeight,
            4, 3,
            true
        );
    }

    setCastle(
        boxX,
        boxY,
        colorIndex,
        stateIndex,
    ) {
        return this.setImage(
            boxX,
            boxY,
            this.routeCastle(colorIndex, stateIndex)
        );
    }

    routeCastle(
        colorIndex,
        stateIndex,
    ) {
        const colors = ["blue", "purple", "red", "yellow"];
        const states = ["construction", "ready", "destroyed"];
        const color = colors[colorIndex];
        const state = states[stateIndex];
        let file = state;
        if (state === "ready") file = color;
        return `images/factions/knights/buildings/castle/${file}.png`;
    }

    drawCastles() {
        this.drawImages();
    }
}