import { Animation_ENGINE } from "../engine/animation";
import type { Canvas_ENGINE } from "../engine/canvas";
import { Character_ENGINE } from "../engine/character";
import { CharacterDirection } from "../engine/character/direction";
import { Coordinate_ENGINE } from "../engine/coordinate";
import { Element_ENGINE } from "../engine/element";
import { Plane_ENGINE } from "../engine/plane";
import { Size_ENGINE } from "../engine/size";
import type { Map_ENGINE } from "./map";
import { UserBar_PAWN } from "./userBar";

export type PawnColor = "blue" | "purple" | "red" | "yellow";

export class Pawn_ENGINE extends Character_ENGINE {

    map: Map_ENGINE;
    nickname: string;
    userBar: UserBar_PAWN;

    constructor(props: {
        leftUp: Coordinate_ENGINE,
        map: Map_ENGINE,
        canvas: Canvas_ENGINE,
        color: PawnColor,
        nickname: string,
    }) {
        super({
            leftUp: props.leftUp,
            size: new Size_ENGINE({
                width: props.map.boxes.width,
                height: props.map.boxes.height
            }),
            canvas: props.canvas,
            fillStyle: "#fff",
            strokeStyle: false,
            lineWidth: 0,
            scale: new Size_ENGINE({
                width: 3,
                height: 3
            }),
            animations: {
                route: `images/factions/knights/troops/pawn/${props.color}.png`,
                element: new Element_ENGINE({
                    size: new Size_ENGINE({
                        width: 192,
                        height: 192
                    }),
                    indices: new Plane_ENGINE({
                        horizontal: 6,
                        vertical: 6
                    })
                }),
                animation: new Animation_ENGINE({
                    frames: 6,
                    framesPerSecond: 6
                }),
            },
            speed: new Coordinate_ENGINE({
                x: 2,
                y: 2
            }),
            address: new CharacterDirection({
                x: 0,
                y: 0
            }),
        });
        this.map = props.map;
        this.nickname = props.nickname;
        this.userBar = new UserBar_PAWN({
            pawn: this,
            size: new Size_ENGINE({
                width: 0,
                height: 0
            }),
            canvas: this.canvas,
            photoRoute: false,
            nickname: this.nickname
        })
    }

    drawPawn() {
        this.drawCharacter();
        this.userBar.drawUserBar();
    }
}