import { Animation_ENGINE } from "../engine/animation";
import type { Canvas_ENGINE } from "../engine/canvas";
import { Character_ENGINE } from "../engine/character";
import { Direction_ENGINE } from "../engine/character/direction";
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
            animation: new Animation_ENGINE(8, 8),
            element: {
                indices: new Plane_ENGINE(0, 0)
            }
        },
        jump: {
            animation: new Animation_ENGINE(6, 6),
            element: {
                indices: new Plane_ENGINE(0, 1)
            }
        }
    };
    jumpTimer: number = 0;
    map: Map_ENGINE;

    constructor(
        leftUp: Coordinate_ENGINE,
        map: Map_ENGINE,
        canvas: Canvas_ENGINE,
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
                route: "images/resources/sheep/left.png",
                element: new Element_ENGINE(
                    new Size_ENGINE(128, 128),
                    new Plane_ENGINE(0, 0)
                ),
                animation: new Animation_ENGINE(8, 8)
            },
            new Coordinate_ENGINE(1000, 1000),
            new Direction_ENGINE("center", "down"),
        );
        this.map = map;
        this.state = "move";
        this.lineSight = new Line_ENGINE(
            new Coordinate_ENGINE(0, 0),
            new Coordinate_ENGINE(0, 0),
            this.canvas,
            false,
            "#333",
            2,
        );
    }

    lineSightPosition() {
        const leftUp = (() => {
            const halfSizeWidth = this.size.width / 2;
            const halfSizeHeight = this.size.height / 2;
            const x = this.leftUp.x + halfSizeWidth;
            const y = this.leftUp.y + halfSizeHeight;
            return new Coordinate_ENGINE(x, y);
        })();
        const rightDown = (() => {
            const percentages = (() => {
                const lineReach = 120;
                const percentageCenter = 50;
                const lineScopeX = lineReach * this.direction.getNumberX();
                const lineScopeY = lineReach * this.direction.getNumberY();
                return new Size_ENGINE(
                    lineScopeX + percentageCenter,
                    lineScopeY + percentageCenter
                );
            })();
            return this.leftUpPlusSizePercentages(percentages);
        })();
        this.lineSight.setPosition(leftUp, rightDown);
    }

    moveSheep() {
        this.lineSightPosition();

        const moved = this.movedCharacter();
        if (moved === false)
            return;

        // const collision = this.map.collisionMap(this, moved);
        // if (collision === true) {
        //     this.randomAddress();
        //     this.timerChangePositionRandomly = 0;
        //     return false;
        // }

        const lineSightCollisionMap = this.map.collisionMap(
            this.leftUp,
            this.lineSight.rightDown(),
        );

        this.leftUp.x = lineSightCollisionMap.x;
        this.leftUp.y = lineSightCollisionMap.y;


        const random1 = Math.round(Math.random());
        const random2 = Math.round(Math.random());
        this.direction.setX(
            random1 === 0 ? "left" : "right"
        );
        this.direction.setY(
            random2 === 0 ? "up" : "down"
        );
        const random3 = Math.round(Math.random() * 2);
        if (random3 === 0)
            this.direction.setY("center");
        else if (random3 === 1)
            this.direction.setX("center");
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
            new Plane_ENGINE(
                character.element.indices.horizontal,
                character.element.indices.vertical
            )
        );
        this.animations.animation.frames = character.animation.frames;
        this.animations.animation.framesPerSecond = character.animation.framesPerSecond;
    }

    imageAccordingDirectionMovement() {
        const directionX = this.direction.getX();
        if (directionX === "center")
            return;

        this.animations.route = `images/resources/sheep/${directionX}.png`;
    }

    drawSheep() {
        this.refreshState();
        this.moveSheep();
        this.jumpSheep();
        this.imageAccordingDirectionMovement();
        this.drawCharacter();
        this.lineSight.drawLine();
    }
}