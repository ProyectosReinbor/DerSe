import type { Animation_ENGINE } from "./animation";
import { Animations_ENGINE } from "./animations";
import type { Canvas_ENGINE } from "./canvas";
import { CharacterDirection } from "./character/direction";
import type { FillStyle, StrokeStyle } from "./context";
import { Coordinate_ENGINE } from "./coordinate";
import type { Element_ENGINE } from "./element";
import type { ImagePath } from "./image";
import { Size_ENGINE } from "./size";
import { Square_ENGINE } from "./square";

export class Character_ENGINE extends Square_ENGINE {
    scale: Size_ENGINE;
    animations: Animations_ENGINE;
    speed: Coordinate_ENGINE;
    address: CharacterDirection;

    constructor(props: {
        leftUp: Coordinate_ENGINE,
        size: Size_ENGINE,
        canvas: Canvas_ENGINE;
        fillStyle: FillStyle;
        strokeStyle: StrokeStyle;
        lineWidth: number;
        scale: Size_ENGINE,
        animations: {
            route: ImagePath,
            element: Element_ENGINE,
            animation: Animation_ENGINE,
        },
        speed: Coordinate_ENGINE,
        address: CharacterDirection,
    }) {
        super({
            leftUp: props.leftUp,
            size: props.size,
            canvas: props.canvas,
            fillStyle: props.fillStyle,
            strokeStyle: props.strokeStyle,
            lineWidth: props.lineWidth,
        });
        this.scale = props.scale;
        this.canvas = props.canvas;
        this.animations = new Animations_ENGINE({
            leftUp: new Coordinate_ENGINE({ x: 0, y: 0 }),
            size: new Size_ENGINE({ width: 0, height: 0 }),
            canvas: props.canvas,
            route: props.animations.route,
            element: props.animations.element,
            animation: props.animations.animation
        });
        this.speed = props.speed;
        this.address = props.address;
    }

    movedCharacter(): Character_ENGINE | false {
        if (this.address.isEqualTo(
            new CharacterDirection({ x: 0, y: 0 })
        ))
            return false;

        const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
        const speedX = this.speed.x * secondsBetweenFrames;
        const speedY = this.speed.y * secondsBetweenFrames;
        const distanceX = speedX * this.address.x;
        const distanceY = speedY * this.address.y;
        const newX = this.leftUp.x + distanceX;
        const newY = this.leftUp.y + distanceY;
        return new Character_ENGINE({
            leftUp: new Coordinate_ENGINE({ x: newX, y: newY }),
            size: new Size_ENGINE({
                width: this.size.width,
                height: this.size.height,
            }),
            canvas: this.canvas,
            fillStyle: this.fillStyle,
            strokeStyle: this.strokeStyle,
            lineWidth: this.lineWidth,
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
        this.drawSquare();
        this.animations.size = new Size_ENGINE({
            width: this.scale.width * this.size.width,
            height: this.scale.height * this.size.height
        });
        this.animations.leftUp = new Coordinate_ENGINE({
            x: this.leftUp.x + (this.size.width / 2) - (this.animations.size.width / 2),
            y: this.leftUp.y + (this.size.height / 2) - (this.animations.size.height / 2)
        });
        this.animations.drawAnimation();
    }
}