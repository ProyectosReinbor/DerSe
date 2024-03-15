import { Animations } from "./animations.js";
import type { Canvas } from "./canvas.js";
import { Coordinate } from "./coordinate.js";
import type { Plane } from "./plane.js";
import type { Size } from "./size.js";

export class Character extends Animations {
    speed: Coordinate;
    address: Coordinate;
    constructor(
        initial: Coordinate,
        size: Size,
        canvas: Canvas,
        route: string,
        elementParameters: {
            size: Size;
            plane: Plane;
        },
        animation: {
            frames: number;
            framesPerSecond: number;
        },
        speed: Coordinate
    ) {
        super(
            initial,
            size,
            canvas,
            route,
            elementParameters,
            animation
        );
        this.speed = speed;
        this.address = new Coordinate;
    }

    move() {
        if (this.address.equals(new Coordinate)) return false;
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

    async drawCharacter() {
        this.move();
        await this.drawAnimation();
    }
}