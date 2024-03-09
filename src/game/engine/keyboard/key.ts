import { Button } from "../button.js";
import { Canvas } from "../canvas.js";
import { Position } from "../position.js";

export class Key extends Button {

    keyPress: (character: string) => void;

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
        fillStyle: string,
        strokeStyle: string,
        lineWidth: number,
        text: {
            size: {
                height: number;
            };
            value: string;
            fillStyle: string;
            strokeStyle: string;
        },
        keyPress: (character: string) => void
    ) {
        super(
            {
                x: initial.x,
                y: initial.y,
            },
            {
                width: size.width,
                height: size.height,
            },
            canvas,
            fillStyle,
            strokeStyle,
            lineWidth,
            {
                size: text.size,
                value: text.value,
                fillStyle: text.fillStyle,
                strokeStyle: text.strokeStyle,
            }
        );
        this.keyPress = keyPress;
    }

    touchendKey(touch: Position): boolean {
        if (this.inside(touch) === false) return false;
        this.keyPress(this.text.value);
        return true;
    }
} 