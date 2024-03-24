import type { Canvas_ENGINE } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context";
import type { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import type { Size_ENGINE } from "./size";

export class Text extends Position_ENGINE {

    canvas: Canvas_ENGINE;
    value: string;
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
    dungeonFont: boolean;

    constructor(props: {
        canvas: Canvas_ENGINE;
        leftUp: Coordinate_ENGINE;
        size: Size_ENGINE;
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
        if (this.dungeonFont === true)
            font.concat(" Dungeon,");

        return font.concat("sans - serif, arial");
    }

    drawText() {
        if (this.value.length === 0) return;

        const positionOnTheCanvas = this.canvas.positionOnTheCanvas(this);
        if (positionOnTheCanvas === false)
            return;

        this.canvas.context.font = this.font;
        this.canvas.context.textAlign = "left";
        this.canvas.context.textBaseline = "top";

        positionOnTheCanvas.size.width = this.canvas.context.measureText(this.value).width;
        positionOnTheCanvas.leftUp.x += this.size.width / 2;
        positionOnTheCanvas.leftUp.x -= positionOnTheCanvas.size.width / 2;

        if (this.fillStyle !== false) {
            this.canvas.context.fillStyle = this.fillStyle;
            this.canvas.context.fillText(
                this.value,
                positionOnTheCanvas.leftUp.x,
                positionOnTheCanvas.leftUp.y,
            );
        }

        if (this.strokeStyle !== false) {
            this.canvas.context.strokeStyle = this.strokeStyle;
            this.canvas.context.strokeText(
                this.value,
                positionOnTheCanvas.leftUp.x,
                positionOnTheCanvas.leftUp.y
            );
        }
    }
}