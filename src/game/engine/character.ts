import { Animations } from "./animations.js";
import { Coordinate } from "./coordinate.js";
import { Canvas } from "./canvas.js";

export class Character extends Animations {

    speed: Coordinate;
    address: {
        x: 0 | -1 | 1;
        y: 0 | -1 | 1;
    };

    constructor(
        initial: {
            x: number;
            y: number;
        },
        size: {
            width: number;
            height: number;
        },
        canvas: Canvas,
        route: string,
        element: {
            size: {
                width: number;
                height: number;
            };
            horizontal: number;
            vertical: number;
        },
        animation: {
            frames: number;
            framesPerSecond: number;
        },
        speed: {
            x: number;
            y: number;
        }
    ) {
        super(
            initial,
            size,
            canvas,
            route,
            element,
            animation
        );
        this.speed = new Coordinate(
            speed.x,
            speed.y,
        );
        this.address = {
            x: 0,
            y: 0
        };
    }

    addressEquals(x: number, y: number): boolean {
        return this.address.x === x &&
            this.address.y === y;
    }

    move(): boolean {
        if (this.address.x == 0 && this.address.y == 0) return false;
        const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
        const speedX = this.speed.x * secondsBetweenFrames;
        const speedY = this.speed.y * secondsBetweenFrames;
        const distanceX = speedX * this.address.x;
        const distanceY = speedY * this.address.y;
        const newX = this.initial.x + distanceX;
        const newY = this.initial.y + distanceY;
        this.initial.x = newX;
        this.initial.y = newY;
        return true;
    }

    drawCharacter(): void {
        this.move();
        this.drawAnimation();
    }
}