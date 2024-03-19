import { Animations } from "./animations";
import type { Animation } from "./animation";
import type { Canvas } from "./canvas";
import { Address } from "./character/address";
import { Collider } from "./collider";
import { Coordinate } from "./coordinate";
import type { Element } from "./element";
import { Size } from "./size";

export class Character extends Animations {
    speed: Coordinate;
    address: Address;
    collider: Collider;
    constructor(props: {
        initial: Coordinate,
        size: Size,
        canvas: Canvas,
        route: string,
        element: Element,
        animation: Animation,
        speed: Coordinate,
        collider: Collider
    }) {
        super(props);
        this.speed = props.speed;
        this.address = new Address({ x: 0, y: 0 });
        this.collider = props.collider;
    }

    nextCollider(): Collider | false {
        if (this.address.equals(new Address({ x: 0, y: 0 }))) return false;
        const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
        const speedX = this.speed.x * secondsBetweenFrames;
        const speedY = this.speed.y * secondsBetweenFrames;
        const distanceX = speedX * this.address.x;
        const distanceY = speedY * this.address.y;
        const newX = this.initial.x + distanceX;
        const newY = this.initial.y + distanceY;
        return new Collider({
            initial: new Coordinate({ x: newX, y: newY }),
            size: new Size({
                width: this.collider.size.width,
                height: this.collider.size.height,
            }),
            canvas: this.canvas,
            fillStyle: this.collider.fillStyle,
            strokeStyle: this.collider.strokeStyle,
            lineWidth: this.collider.lineWidth,
        });
    }

    drawCharacter() {
        this.drawAnimation();
    }
}