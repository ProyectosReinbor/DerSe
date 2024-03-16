import type { Canvas } from "./canvas";
import type { Coordinate } from "./coordinate";
import { Position } from "./position";
import type { Size } from "./size";

export class Text extends Position {
    canvas: Canvas;
    value: string;
    fillStyle: string;
    strokeStyle: string;
    dungeonFont: boolean;
    constructor(
        initial: Coordinate,
        size: Size,
        canvas: Canvas,
        value: string = "",
        fillStyle: string = "",
        strokeStyle: string = "",
        dungeonFont: boolean = false
    ) {
        super(
            initial,
            size
        );
        this.canvas = canvas;
        this.value = value;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.dungeonFont = dungeonFont;
    }

    get font() {
        let font = `${this.size.height}px`;
        if (this.dungeonFont === true) font.concat(" Dungeon,");
        return font.concat("sans - serif, arial");
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

        if (this.fillStyle.length > 0) {
            this.canvas.context.fillStyle = this.fillStyle;
            this.canvas.context.fillText(
                this.value,
                positionOnCanvas.initial.x,
                positionOnCanvas.initial.y,
            );
        }

        if (this.strokeStyle.length > 0) {
            this.canvas.context.strokeStyle = this.strokeStyle;
            this.canvas.context.strokeText(
                this.value,
                positionOnCanvas.initial.x,
                positionOnCanvas.initial.y
            );
        }
    }
}