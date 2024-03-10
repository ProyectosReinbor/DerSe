import { Canvas } from "./canvas.js";
import { Position } from "./position.js";

export class Text extends Position {
    constructor(
        initial,
        size,
        canvas,
        value,
        fillStyle = false,
        strokeStyle = false
    ) {
        super(initial, size);
        this.canvas = canvas;
        this.value = value;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
    }

    get font() {
        return `${this.size.height}px "Dungeon", sans-serif`;
    }

    drawText() {
        if (this.fillStyle === false && this.strokeStyle === false)
            throw new Error("fillStyle and strokeStyle are both false");

        if (this.value.length === 0) return;

        const positionOnCanvas = this.canvas.positionOnCanvas(this);
        if (positionOnCanvas === false) return;

        this.canvas.context.font = this.font;
        this.canvas.context.textAlign = "left";
        this.canvas.context.textBaseline = "top";

        positionOnCanvas.size.width = this.canvas.context.measureText(this.value).width;
        positionOnCanvas.initial.x += this.size.width / 2;
        positionOnCanvas.initial.x -= positionOnCanvas.size.width / 2;

        if (this.fillStyle !== false) {
            this.canvas.context.fillStyle = this.fillStyle;
            this.canvas.context.fillText(
                this.value,
                positionOnCanvas.initial.x,
                positionOnCanvas.initial.y,
            );
        }

        if (this.strokeStyle !== false) {
            this.canvas.context.strokeStyle = this.strokeStyle;
            this.canvas.context.strokeText(
                this.value,
                positionOnCanvas.initial.x,
                positionOnCanvas.initial.y
            );
        }
    }
}