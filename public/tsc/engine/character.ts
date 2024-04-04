import type { Animation_ENGINE } from "./animation";
import { Animations_ENGINE } from "./animations";
import type { Canvas_ENGINE } from "./canvas";
import { Direction_ENGINE } from "./character/direction";
import type { FillStyle, StrokeStyle } from "./context";
import { Coordinate_ENGINE } from "./coordinate";
import type { Element_ENGINE } from "./element";
import type { PathImage_ENGINE } from "./image";
import { Size_ENGINE } from "./size";
import { Square_ENGINE } from "./square";

export class Character_ENGINE extends Square_ENGINE {
    scale: Size_ENGINE;
    animations: Animations_ENGINE;
    speed: Coordinate_ENGINE;
    direction: Direction_ENGINE;

    constructor(
        leftUp: Coordinate_ENGINE,
        size: Size_ENGINE,
        canvas: Canvas_ENGINE,
        fillStyle: FillStyle,
        strokeStyle: StrokeStyle,
        lineWidth: number,
        scale: Size_ENGINE,
        animations: {
            route: PathImage_ENGINE | false;
            element: Element_ENGINE;
            animation: Animation_ENGINE;
        },
        speed: Coordinate_ENGINE,
        direction: Direction_ENGINE,
    ) {
        super(
            leftUp,
            size,
            canvas,
            fillStyle,
            strokeStyle,
            lineWidth,
        );
        this.scale = scale;
        this.canvas = canvas;
        this.animations = new Animations_ENGINE(
            new Coordinate_ENGINE(0, 0),
            new Size_ENGINE(0, 0),
            canvas,
            animations.route,
            animations.element,
            animations.animation
        );
        this.speed = speed;
        this.direction = direction;
    }

    movedCharacter(): Character_ENGINE | false {
        if (this.direction.isEqualTo(
            new Direction_ENGINE("center", "center")
        ))
            return false;

        const secondsBetweenFrames = this.canvas.timeBetweenFrames / 1000;
        const speedX = this.speed.x * secondsBetweenFrames;
        const speedY = this.speed.y * secondsBetweenFrames;
        const distanceX = speedX * this.direction.getNumberX();
        const distanceY = speedY * this.direction.getNumberY();
        const newX = this.leftUp.x + distanceX;
        const newY = this.leftUp.y + distanceY;
        return new Character_ENGINE(
            new Coordinate_ENGINE(newX, newY),
            new Size_ENGINE(
                this.size.width,
                this.size.height,
            ),
            this.canvas,
            this.fillStyle,
            this.strokeStyle,
            this.lineWidth,
            this.scale,
            {
                route: this.animations.route,
                element: this.animations.element,
                animation: this.animations.animation
            },
            this.speed,
            this.direction
        );
    }

    drawCharacter() {
        this.drawSquare();
        this.animations.size = new Size_ENGINE(
            this.scale.width * this.size.width,
            this.scale.height * this.size.height
        );
        this.animations.leftUp = new Coordinate_ENGINE(
            this.leftUp.x + (this.size.width / 2) - (this.animations.size.width / 2),
            this.leftUp.y + (this.size.height / 2) - (this.animations.size.height / 2)
        );
        this.animations.drawAnimation();
    }
}