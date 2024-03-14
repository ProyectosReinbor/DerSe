import { Animations } from "./animations.js";
import { Coordinate } from "./coordinate.js";

export class Character extends Animations {
    constructor(
        initialX,
        initialY,
        sizeWidth,
        sizeHeight,
        canvas,
        route,
        elementSizeWidth,
        elementSizeHeight,
        elementHorizontal,
        elementVertical,
        animationFrames,
        animationFramesPerSecond,
        speedX,
        speedY
    ) {
        super(
            initialX,
            initialY,
            sizeWidth,
            sizeHeight,
            canvas,
            route,
            elementSizeWidth,
            elementSizeHeight,
            elementHorizontal,
            elementVertical,
            animationFrames,
            animationFramesPerSecond,
        );
        this.speed = new Coordinate(speedX, speedY);
        this.address = new Coordinate(0, 0);
    }

    move() {
        if (this.address.equals(0, 0)) return false;
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