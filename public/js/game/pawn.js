
import { Character } from "../engine/character.js";
import { UserBar } from "./userBar.js";

export class Pawn extends Character {
    constructor(
        initialX,
        initialY,
        map,
        canvas,
        colorIndex,
        nickname,
        userBarPhotoRoute,
    ) {
        const colors = ["blue", "purple", "red", "yellow"];
        const color = colors[colorIndex];
        super(
            initialX,
            initialY,
            map.boxes.width * 3,
            map.boxes.height * 3,
            canvas,
            `images/factions/knights/troops/pawn/${color}.png`,
            192, 192,
            0, 0,
            6, 6,
            2, 2
        );
        this.map = map;
        this.nickname = nickname;
        this.userBar = new UserBar(
            this.initial.x,
            this.initial.y,
            map.boxes.width,
            map.boxes.height / 2,
            canvas,
            userBarPhotoRoute
        );
    }

    drawPawn() {
        this.drawCharacter();
        this.userBar.drawUserBar(
            this.initial.x + this.map.boxes.width,
            this.initial.y + this.map.boxes.height
        );
    }
}