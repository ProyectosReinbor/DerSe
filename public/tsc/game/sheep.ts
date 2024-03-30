import { Animation_ENGINE } from "../engine/animation";
import type { Canvas_ENGINE } from "../engine/canvas";
import { Character_ENGINE } from "../engine/character";
import { CharacterDirection } from "../engine/character/direction";
import { Coordinate_ENGINE } from "../engine/coordinate";
import { Element_ENGINE } from "../engine/element";
import { Line_ENGINE } from "../engine/line";
import { Plane_ENGINE } from "../engine/plane";
import { Size_ENGINE } from "../engine/size";
import type { Map_ENGINE } from "./map";

export type SheepState = "move" | "jump";
export type SheepStates = {
    [key in SheepState]: {
        animation: Animation_ENGINE;
        element: {
            indices: Plane_ENGINE;
        };
    }
}

export class Sheep_ENGINE extends Character_ENGINE {

    lineSight: Line_ENGINE;
    state: SheepState = "move";
    states: SheepStates = {
        move: {
            animation: new Animation_ENGINE({
                frames: 8,
                framesPerSecond: 8
            }),
            element: {
                indices: new Plane_ENGINE({
                    horizontal: 0,
                    vertical: 0
                })
            }
        },
        jump: {
            animation: new Animation_ENGINE({
                frames: 6,
                framesPerSecond: 6
            }),
            element: {
                indices: new Plane_ENGINE({
                    horizontal: 0,
                    vertical: 1
                })
            }
        }
    };
    jumpTimer: number = 0;
    map: Map_ENGINE;

    constructor(props: {
        leftUp: Coordinate_ENGINE,
        map: Map_ENGINE,
        canvas: Canvas_ENGINE,
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
                route: "images/resources/sheep.png",
                element: new Element_ENGINE({
                    size: new Size_ENGINE({
                        width: 128,
                        height: 128
                    }),
                    indices: new Plane_ENGINE({
                        horizontal: 0,
                        vertical: 0
                    })
                }),
                animation: new Animation_ENGINE({
                    frames: 8,
                    framesPerSecond: 8
                })
            },
            speed: new Coordinate_ENGINE({
                x: 40,
                y: 40
            }),
            address: new CharacterDirection({
                x: 0,
                y: 0
            }),
        });
        this.map = props.map;
        this.state = "move";
        this.lineSight = new Line_ENGINE({
            leftUp: new Coordinate_ENGINE({
                x: this.leftUp.x + this.size.width / 2,
                y: this.leftUp.y + this.size.height / 2
            }),
            rightDown: this.leftUpPlusSizePercentages({
                percentages: new Size_ENGINE({
                    width: 200,
                    height: 50
                })
            }),
            canvas: this.canvas,
            fillStyle: false,
            strokeStyle: "#333",
            lineWidth: 2,
        });
    }

    moveSheep() {
        const moved = this.movedCharacter();
        if (moved === false)
            return false;

        const collision = this.map.collisionMap({
            character: this,
            moved
        });
        if (collision === true) {
            return false;
        }

        this.leftUp.x = moved.leftUp.x;
        this.leftUp.y = moved.leftUp.y;
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
        let character = this.states[this.state];
        if (this.animations.element.getIndices().vertical === character.element.indices.vertical)
            return;

        this.animations.element.setIndices(
            new Plane_ENGINE({
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
        this.lineSight.drawLine();
    }
}