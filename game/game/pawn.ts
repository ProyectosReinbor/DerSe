import { Animation_ENGINE } from "../engine/animation";
import type { Canvas_ENGINE } from "../engine/canvas";
import { Character_ENGINE } from "../engine/character";
import { Direction_ENGINE } from "../engine/character/direction";
import { Coordinate_ENGINE } from "../engine/coordinate";
import { Element_ENGINE } from "../engine/element";
import { Plane_ENGINE } from "../engine/plane";
import { Size_ENGINE } from "../engine/size";
import type { Map_ENGINE } from "./map";
import { UserBar_ENGINE } from "./userBar";

export type PawnColor = "blue" | "purple" | "red" | "yellow";

export class Pawn_ENGINE extends Character_ENGINE {

    map: Map_ENGINE;
    nickname: string;
    userBar: UserBar_ENGINE;

    constructor(
        leftUp: Coordinate_ENGINE,
        map: Map_ENGINE,
        canvas: Canvas_ENGINE,
        color: PawnColor,
        nickname: string,
    ) {
        super(
            leftUp,
            new Size_ENGINE(
                map.boxes.width,
                map.boxes.height
            ),
            canvas,
            "#fff",
            false,
            0,
            new Size_ENGINE(3, 3),
            {
                route: `images/factions/knights/troops/pawn/${color}.png`,
                element: new Element_ENGINE(
                    new Size_ENGINE(192, 192),
                    new Plane_ENGINE(6, 6)
                ),
                animation: new Animation_ENGINE(6, 6),
            },
            new Coordinate_ENGINE(2, 2),
            new Direction_ENGINE("center", "center"),
        );
        this.map = map;
        this.nickname = nickname;
        this.userBar = new UserBar_ENGINE(
            this,
            new Size_ENGINE(0, 0),
            this.canvas,
            false,
            this.nickname
        )
    }

    drawPawn() {
        this.drawCharacter();
        this.userBar.drawUserBar();
    }
}