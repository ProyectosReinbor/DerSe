import type { Canvas_ENGINE } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context";
import type { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import type { Size_ENGINE } from "./size";

export class Square_ENGINE extends Position_ENGINE {

    canvas: Canvas_ENGINE;
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
    lineWidth: number;

    constructor(
        leftUp: Coordinate_ENGINE,
        size: Size_ENGINE,
        canvas: Canvas_ENGINE,
        fillStyle: FillStyle,
        strokeStyle: StrokeStyle,
        lineWidth: number,
    ) {
        super(
            leftUp,
            size,
        );
        this.canvas = canvas;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
    }

    drawSquare() {
        const positionOnCanvas = this.canvas.positionOnCanvas(this);
        if (positionOnCanvas === false)
            return;

        this.canvas.context.beginPath();

        this.canvas.context.rect(
            positionOnCanvas.leftUp.x,
            positionOnCanvas.leftUp.y,
            positionOnCanvas.size.width,
            positionOnCanvas.size.height
        );

        if (this.fillStyle !== false) {
            this.canvas.context.fillStyle = this.fillStyle;
            this.canvas.context.fill();
        }

        if (this.strokeStyle !== false) {
            this.canvas.context.strokeStyle = this.strokeStyle;
            this.canvas.context.lineWidth = this.lineWidth;
            this.canvas.context.stroke();
        }

        this.canvas.context.closePath();
    }
}   