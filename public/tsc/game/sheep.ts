import { AnimationBoxes } from "../engine/animationBoxes";
import type { Animations } from "../engine/animations";
import { Animation } from "../engine/animations/animation";
import type { Canvas } from "../engine/canvas";
import { Character } from "../engine/character";
import { Coordinate } from "../engine/coordinate";
import { Element } from "../engine/elements/element";
import { Plane } from "../engine/plane";
import { Size } from "../engine/size";
import type { Map } from "./map";

export class Sheep extends Character {
    state: "move" | "jump" = "move";
    sheepDefault: {
        move: Character;
        jump: Character;
    };
    jumpTimer: number = 0;
    constructor(
        initial: Coordinate,
        map: Map,
        canvas: Canvas,
    ) {
        const SheepDefault = (
            plane: Plane,
            animation: Animation
        ) => {
            return new Character(
                new Coordinate,
                new Size,
                canvas,
                "images/resources/sheep.png",
                new Element(
                    new Size(128, 128),
                    plane
                ),
                animation,
                new Coordinate(2, 2),
            );
        }
        super(
            initial,
            new Size(map.boxes.width * 3, map.boxes.height * 3),
            canvas,
            "images/resources/sheep.png",
            new Element(
                new Size(128, 128),
                new Plane
            ),
            new Animation(8, 8),
            new Coordinate(2, 2),
        );

        this.sheepDefault = {
            move: SheepDefault(
                new Plane,
                new Animation(8, 8)
            ),
            jump: SheepDefault(
                new Plane(0, 1),
                new Animation(6, 6)
            )
        }
        this.state = "jump";
    }

    moveSheep() {

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
        let stateDefault = this.sheepDefault[this.state];
        if (this.element.vertical === stateDefault.element.vertical) return;
        this.element.vertical = stateDefault.element.vertical;
        this.element.horizontal = stateDefault.element.horizontal;
        this.animation.frames = stateDefault.animation.frames;
        this.animation.framesPerSecond = stateDefault.animation.framesPerSecond;
    }

    drawSheep() {
        this.refreshState();
        this.moveSheep();
        this.jumpSheep();
        this.drawCharacter();
    }
}