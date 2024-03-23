import { Animations } from "./animations";
import { Address } from "./character/address";
import { Coordinate } from "./coordinate";
import { Size } from "./size";
import type { Canvas } from "./canvas";
import { Rect } from "./rect";
import type { ImageRoute } from "./image";
import type { Element } from "./element";
import type { Animation } from "./animation";

export class Character extends Rect {
    scale: Size;
    animations: Animations;
    speed: Coordinate;
    address: Address;

    constructor(props: {
        initial: Coordinate,
        size: Size,
        canvas: Canvas;
        scale: Size,
        animations: {
            route: ImageRoute,
            element: Element,
            animation: Animation,
        },
        speed: Coordinate,
        address: Address,
    }) {
        super({
            initial: props.initial,
            size: props.size,
            canvas: props.canvas,
            fillStyle: "#fff",
            strokeStyle: false,
            lineWidth: 0,
        });
        this.scale = props.scale;
        this.canvas = props.canvas;
        this.animations = new Animations({
            initial: new Coordinate({ x: 0, y: 0 }),
            size: new Size({ width: 0, height: 0 }),
            canvas: props.canvas,
            route: props.animations.route,
            element: props.animations.element,
            animation: props.animations.animation
        });
        this.speed = props.speed;
        this.address = props.address;
    }

    movedCharacter(): Character | false {
        if (this.address.equals(new Address({ x: 0, y: 0 }))) return false;
        const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
        const speedX = this.speed.x * secondsBetweenFrames;
        const speedY = this.speed.y * secondsBetweenFrames;
        const distanceX = speedX * this.address.x;
        const distanceY = speedY * this.address.y;
        const newX = this.initial.x + distanceX;
        const newY = this.initial.y + distanceY;
        return new Character({
            initial: new Coordinate({ x: newX, y: newY }),
            size: new Size({
                width: this.size.width,
                height: this.size.height,
            }),
            canvas: this.canvas,
            scale: this.scale,
            animations: {
                route: this.animations.route,
                element: this.animations.element,
                animation: this.animations.animation
            },
            speed: this.speed,
            address: this.address
        });
    }

    drawCharacter() {
        this.drawRect();
        this.animations.size = new Size({
            width: this.scale.width * this.size.width,
            height: this.scale.height * this.size.height
        });
        this.animations.initial = new Coordinate({
            x: this.initial.x + (this.size.width / 2) - (this.animations.size.width / 2),
            y: this.initial.y + (this.size.height / 2) - (this.animations.size.height / 2)
        });
        this.animations.drawAnimation();
    }
}