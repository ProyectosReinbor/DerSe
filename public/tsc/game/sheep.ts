import { Animation } from "../engine/animation";
import type { Canvas } from "../engine/canvas";
import { Character } from "../engine/character";
import { Coordinate } from "../engine/coordinate";
import { Element } from "../engine/element";
import { Plane } from "../engine/plane";
import { Size } from "../engine/size";
import type { Map } from "./map";

export type SheepState = "move" | "jump";
export type SheepCharacter = {
    [key in SheepState]: {
        animation: Animation;
        element: {
            indices: Plane;
        };
    }
}

export class Sheep extends Character {
    state: SheepState = "move";
    character: SheepCharacter = {
        move: {
            animation: new Animation({
                frames: 8,
                framesPerSecond: 8
            }),
            element: {
                indices: new Plane({ horizontal: 0, vertical: 0 })
            }
        },
        jump: {
            animation: new Animation({
                frames: 6,
                framesPerSecond: 6
            }),
            element: {
                indices: new Plane({ horizontal: 0, vertical: 1 })
            }
        }
    };
    jumpTimer: number = 0;
    map: Map;
    constructor(props: {
        initial: Coordinate,
        map: Map,
        canvas: Canvas,
    }) {
        super({
            initial: props.initial,
            size: new Size({
                width: props.map.boxes.width * 3,
                height: props.map.boxes.height * 3
            }),
            canvas: props.canvas,
            route: "images/resources/sheep.png",
            element: new Element({
                size: new Size({ width: 128, height: 128 }),
                indices: new Plane({ horizontal: 0, vertical: 0 })
            }),
            animation: new Animation({
                frames: 8,
                framesPerSecond: 8
            }),
            speed: new Coordinate({ x: 2, y: 2 }),
        });
        this.map = props.map;
        this.state = "move";
        this.address.x = -1;
    }

    moveSheep() {
        const nextPosition = this.nextPosition();
        if (nextPosition === false)
            return false;

        const collision = this.map.mapCollision(this, nextPosition);
        if (collision === true)
            return false;

        this.initial.x = nextPosition.initial.x;
        this.initial.y = nextPosition.initial.y;
        return true;
    }

    jumpSheep() {
        if (this.state !== "jump") return;
        const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
        this.jumpTimer += secondsBetweenFrames;
        const seconds = this.animation.frames / this.animation.framesPerSecond;
        if (this.jumpTimer >= seconds) {
            this.state = "move";
            this.jumpTimer = 0;
            return;
        };
    }

    refreshState() {
        let character = this.character[this.state];
        if (this.element.indices.vertical === character.element.indices.vertical) return;
        this.element.indices.vertical = character.element.indices.vertical;
        this.element.indices.horizontal = character.element.indices.horizontal;
        this.animation.frames = character.animation.frames;
        this.animation.framesPerSecond = character.animation.framesPerSecond;
    }

    drawSheep() {
        this.refreshState();
        this.moveSheep();
        this.jumpSheep();
        this.drawCharacter();
    }
}