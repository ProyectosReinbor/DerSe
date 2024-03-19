import type { Canvas } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context";
import { Coordinate } from "./coordinate";
import { Position } from "./position";
import { Size } from "./size";

export class Text extends Position {
    canvas: Canvas;
    value: string;
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
    dungeonFont: boolean;
    constructor(props: {
        canvas: Canvas;
        initial: Coordinate;
        size: Size;
        value: string;
        fillStyle: FillStyle;
        strokeStyle: StrokeStyle;
        dungeonFont: boolean;
    }) {
        super(props);
        this.canvas = props.canvas;
        this.value = props.value;
        this.fillStyle = props.fillStyle;
        this.strokeStyle = props.strokeStyle;
        this.dungeonFont = props.dungeonFont;
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