import { Animation } from "../engine/animation";
import type { Canvas } from "../engine/canvas";
import { Character } from "../engine/character";
import { Address } from "../engine/character/address";
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
                width: props.map.boxes.width,
                height: props.map.boxes.height
            }),
            canvas: props.canvas,
            scale: new Size({
                width: 3,
                height: 3
            }),
            animations: {
                route: "images/resources/sheep.png",
                element: new Element({
                    size: new Size({ width: 128, height: 128 }),
                    indices: new Plane({ horizontal: 0, vertical: 0 })
                }),
                animation: new Animation({ frames: 8, framesPerSecond: 8 })
            },
            speed: new Coordinate({ x: 40, y: 40 }),
            address: new Address({ x: 0, y: 0 }),
        });
        this.map = props.map;
        this.state = "move";
        this.randomAddress();
    }

    randomAddress() {
        const randomX = Math.round(Math.random() * 1);
        if (randomX === 0) {
            this.address.x = - 1;
        } else {
            this.address.x = 1;
        }
        const randomY = Math.round(Math.random() * 1);
        if (randomY === 0) {
            this.address.y = - 1;
        } else {
            this.address.y = 1;
        }
    }

    moveSheep() {
        const movedCharacter = this.movedCharacter();
        if (movedCharacter === false)
            return false;

        const collision = this.map.collisionMap(this, movedCharacter);
        if (collision === true) {
            this.randomAddress();
            return false;
        }

        this.initial.x = movedCharacter.initial.x;
        this.initial.y = movedCharacter.initial.y;
        return true;
    }

    jumpSheep() {
        if (this.state !== "jump") return;
        const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
        this.jumpTimer += secondsBetweenFrames;
        const seconds = this.animations.animation.frames / this.animations.animation.framesPerSecond;
        if (this.jumpTimer >= seconds) {
            this.state = "move";
            this.jumpTimer = 0;
            return;
        };
    }

    refreshState() {
        let character = this.character[this.state];
        if (this.animations.element.getIndices().vertical === character.element.indices.vertical)
            return;

        this.animations.element.setIndices(
            new Plane({
                horizontal: character.element.indices.horizontal,
                vertical: character.element.indices.vertical
            })
        );
        this.animations.animation.frames = character.animation.frames;
        this.animations.animation.framesPerSecond = character.animation.framesPerSecond;
    }

    drawSheep() {
        this.refreshState();
        this.moveSheep();
        this.jumpSheep();
        this.drawCharacter();
    }
}