import { ImageBoxes } from "../engine/imageBoxes.js";

export class Castles extends ImageBoxes {

    constructor(
        x, y,
        canvas,
        map
    ) {
        super(
            x, y,
            canvas,
            map.boxes.width,
            map.boxes.height,
            4, 3,
            true
        );
    }

    setCastle(
        boxX,
        boxY,
        color,
        state,
    ) {
        const route = this.routeCastle(color, state);
        if (route === false) throw new Error("invalid route");
        return this.setImage(
            boxX,
            boxY,
            route
        );
    }

    routeCastle(
        color,
        state,
    ) {
        const states = ["construction", "ready", "destroyed"];
        if (states.includes(state) === false) return false;
        let file = state;
        if (state === "ready") {
            const colors = ["blue", "purple", "red", "yellow"];
            if (colors.includes(color) === false) return false;
            file = color;
        }
        return `images/factions/knights/buildings/castle/${file}.png`;
    }

    async drawCastles() {
        await this.drawImages();
    }
}