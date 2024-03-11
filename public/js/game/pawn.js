
import { Character } from "../engine/character.js"

export class Pawn extends Character {
    constructor(
        initialX,
        initialY,
        boxesWidth,
        boxesHeight,
        canvas,
        colorIndex
    ) {
        const colors = ["blue", "purple", "red", "yellow"];
        const color = colors[colorIndex];
        super(
            initialX,
            initialY,
            boxesWidth * 3,
            boxesHeight * 3,
            canvas,
            `images/factions/knights/troops/pawn/${color}.png`,
            192, 192,
            0, 0,
            6, 6,
            2, 2
        );
    }

    drawPawn() {
        this.drawCharacter();
    }
}