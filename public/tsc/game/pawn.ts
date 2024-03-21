
import { Animation } from "../engine/animation.js";
import type { Canvas } from "../engine/canvas.js";
import { Character } from "../engine/character.js";
import { Coordinate } from "../engine/coordinate.js";
import { Element } from "../engine/element.js";
import { Plane } from "../engine/plane.js";
import { Size } from "../engine/size.js";
import type { Map } from "./map.js";
import { UserBar } from "./userBar.js";

export type PawnColor = "blue" | "purple" | "red" | "yellow";

export class Pawn extends Character {
    map: Map;
    nickname: string;
    userBar: UserBar;
    constructor(props: {
        initial: Coordinate,
        map: Map,
        canvas: Canvas,
        color: PawnColor,
        nickname: string,
        userBar: UserBar
    }) {
        super({
            initial: props.initial,
            size: new Size({
                width: props.map.boxes.width * 3,
                height: props.map.boxes.height * 3
            }),
            canvas: props.canvas,
            route: `images/factions/knights/troops/pawn/${props.color}.png`,
            element: new Element({
                size: new Size({ width: 192, height: 192 }),
                indices: new Plane({ horizontal: 6, vertical: 6 })
            }),
            animation: new Animation({ frames: 6, framesPerSecond: 6 }),
            speed: new Coordinate({ x: 2, y: 2 }),
        });
        this.map = props.map;
        this.nickname = props.nickname;
        this.userBar = props.userBar;
    }

    drawPawn() {
        this.drawCharacter();
        this.userBar.drawUserBar(new Coordinate({
            x: this.initial.x + this.map.boxes.width,
            y: this.initial.y + this.map.boxes.height
        }));
    }
}