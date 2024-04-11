import type { Canvas_ENGINE } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context";
import type { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import type { Size_ENGINE } from "./size";

export class Square_ENGINE extends Position_ENGINE {

    private canvas: Canvas_ENGINE;
    private fillStyle: FillStyle;
    private strokeStyle: StrokeStyle;
    private lineWidth: number;

    constructor(
        _leftUp: Coordinate_ENGINE,
        _size: Size_ENGINE,
        _canvas: Canvas_ENGINE,
        _fillStyle: FillStyle,
        _strokeStyle: StrokeStyle,
        _lineWidth: number
    ) {
        super(
            _leftUp,
            _size,
        );
        this.canvas = _canvas;
        this.fillStyle = _fillStyle;
        this.strokeStyle = _strokeStyle;
        this.lineWidth = _lineWidth;
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