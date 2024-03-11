import { Position } from "./position.js";

export class Text extends Position {
    constructor(
        initialX,
        initialY,
        sizeWidth,
        sizeHeight,
        canvas,
        value,
        fillStyle,
        strokeStyle
    ) {
        super(
            initialX,
            initialY,
            sizeWidth,
            sizeHeight
        );
        this.canvas = canvas;
        this.value = value;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
    }

    get font() {
        return `${this.size.height}px "Dungeon", sans-serif`;
    }

    drawText() {
        if (this.value.length === 0) return;

        const positionOnCanvas = this.canvas.positionOnCanvas(this);
        if (positionOnCanvas === false) return;

        this.canvas.context.font = this.font;
        this.canvas.context.textAlign = "left";
        this.canvas.context.textBaseline = "top";

        positionOnCanvas.size.width = this.canvas.context.measureText(this.value).width;
        positionOnCanvas.initial.x += this.size.width / 2;
        positionOnCanvas.initial.x -= positionOnCanvas.size.width / 2;

        if (this.fillStyle !== undefined) {
            this.canvas.context.fillStyle = this.fillStyle;
            this.canvas.context.fillText(
                this.value,
                positionOnCanvas.initial.x,
                positionOnCanvas.initial.y,
            );
        }

        if (this.strokeStyle !== undefined) {
            this.canvas.context.strokeStyle = this.strokeStyle;
            this.canvas.context.strokeText(
                this.value,
                positionOnCanvas.initial.x,
                positionOnCanvas.initial.y
            );
        }
    }
}