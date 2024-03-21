import { Animations } from "./animations";
import type { Animation } from "./animation";
import type { Canvas } from "./canvas";
import { Address } from "./character/address";
import { Coordinate } from "./coordinate";
import type { Element } from "./element";
import { Size } from "./size";
import { Position } from "./position";
import type { ImageRoute } from "./image";

export class Character extends Animations {
    speed: Coordinate;
    address: Address;
    constructor(props: {
        initial: Coordinate,
        size: Size,
        canvas: Canvas,
        route: ImageRoute,
        element: Element,
        animation: Animation,
        speed: Coordinate,
    }) {
        super(props);
        this.speed = props.speed;
        this.address = new Address({ x: 0, y: 0 });
    }

    nextPosition(): Position | false {
        if (this.address.equals(new Address({ x: 0, y: 0 }))) return false;
        const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
        const speedX = this.speed.x * secondsBetweenFrames;
        const speedY = this.speed.y * secondsBetweenFrames;
        const distanceX = speedX * this.address.x;
        const distanceY = speedY * this.address.y;
        const newX = this.initial.x + distanceX;
        const newY = this.initial.y + distanceY;
        return new Position({
            initial: new Coordinate({ x: newX, y: newY }),
            size: new Size({
                width: this.size.width,
                height: this.size.height,
            }),
        });
    }

    drawCharacter() {
        this.drawAnimation();
    }
}