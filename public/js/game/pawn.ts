
import type { Canvas } from "../engine/canvas.js";
import { Character } from "../engine/character.js";
import { Coordinate } from "../engine/coordinate.js";
import { Plane } from "../engine/plane.js";
import { Size } from "../engine/size.js";
import type { Map } from "./map.js";
import { UserBar } from "./userBar.js";

export class Pawn extends Character {
    map: Map;
    nickname: string;
    userBar: UserBar;
    constructor(
        initial: Coordinate,
        map: Map,
        canvas: Canvas,
        color: "blue" | "purple" | "red" | "yellow",
        nickname: string,
        userBar: {
            photoRoute: string;
        }
    ) {
        super(
            initial,
            new Size(
                map.boxes.width * 3,
                map.boxes.height * 3
            ),
            canvas,
            `images/factions/knights/troops/pawn/${color}.png`,
            {
                size: new Size(192, 192),
                plane: new Plane(6, 6),
            },
            {
                frames: 6,
                framesPerSecond: 6
            },
            new Coordinate(2, 2),
        );
        this.map = map;
        this.nickname = nickname;
        this.userBar = new UserBar(
            new Size(map.boxes.width, map.boxes.height / 2),
            canvas,
            userBar.photoRoute,
            this.nickname
        );
    }

    async drawPawn() {
        await this.drawCharacter();
        await this.userBar.drawUserBar(new Coordinate(
            this.initial.x + this.map.boxes.width,
            this.initial.y + this.map.boxes.height
        ));
    }
}