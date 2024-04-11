import type { Canvas_ENGINE } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context";
import type { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import type { Size_ENGINE } from "./size";

export class Text_ENGINE extends Position_ENGINE {

    private canvas: Canvas_ENGINE;
    private value: string;
    private fillStyle: FillStyle;
    private strokeStyle: StrokeStyle;
    private dungeonFont: boolean;

    constructor(
        leftUp: Coordinate_ENGINE,
        size: Size_ENGINE,
        canvas: Canvas_ENGINE,
        value: string,
        fillStyle: FillStyle,
        strokeStyle: StrokeStyle,
        dungeonFont: boolean,
    ) {
        super(
            leftUp,
            size,
        );
        this.canvas = canvas;
        this.value = value;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.dungeonFont = dungeonFont;
    }

    getFont() {
        const font = `${this.size.height}px`;
        if (this.dungeonFont === true)
            font.concat(" Dungeon,");

        return font.concat(" sans - serif, arial");
    }

    drawText() {
        if (this.value.length === 0)
            return;

        const positionOnCamera = this.canvas.positionOnCamera(this);
        if (positionOnCamera === false)
            return;

        this.canvas.context.font = this.getFont();
        this.canvas.context.textAlign = "left";
        this.canvas.context.textBaseline = "top";

        positionOnCamera.size.width = this.canvas.context.measureText(this.value).width;
        positionOnCamera.leftUp.x += this.size.half.width;
        positionOnCamera.leftUp.x -= positionOnCamera.size.half.width;

        if (this.fillStyle !== false) {
            this.canvas.context.fillStyle = this.fillStyle;
            this.canvas.context.fillText(
                this.value,
                positionOnCamera.leftUp.x,
                positionOnCamera.leftUp.y,
            );
        }

        if (this.strokeStyle !== false) {
            this.canvas.context.strokeStyle = this.strokeStyle;
            this.canvas.context.strokeText(
                this.value,
                positionOnCamera.leftUp.x,
                positionOnCamera.leftUp.y
            );
        }
    }
}