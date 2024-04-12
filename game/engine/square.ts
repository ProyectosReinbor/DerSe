import type { Canvas_ENGINE } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context";
import type { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import type { Size_ENGINE } from "./size";

export class Square_ENGINE extends Position_ENGINE {

    protected _canvas: Canvas_ENGINE;
    private _fillStyle: FillStyle;
    private _strokeStyle: StrokeStyle;
    private _lineWidth: number;

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
        this._canvas = _canvas;
        this._fillStyle = _fillStyle;
        this._strokeStyle = _strokeStyle;
        this._lineWidth = _lineWidth;
    }

    public drawSquare() {
        const positionOnCanvas = this._canvas.positionOnCanvas(this);
        if (positionOnCanvas === false)
            return;

        const context = this._canvas.context;
        context.beginPath();
        context.rect(
            positionOnCanvas.leftUp.x,
            positionOnCanvas.leftUp.y,
            positionOnCanvas.size.width,
            positionOnCanvas.size.height
        );

        if (this._fillStyle !== false) {
            context.fillStyle = this._fillStyle;
            context.fill();
        }

        if (this._strokeStyle !== false) {
            context.strokeStyle = this._strokeStyle;
            context.lineWidth = this._lineWidth;
            context.stroke();
        }

        context.closePath();
    }
}   