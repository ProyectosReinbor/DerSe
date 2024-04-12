import type { Canvas_ENGINE } from "./canvas";
import type { FillStyle, StrokeStyle } from "./context";
import type { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import type { Size_ENGINE } from "./size";

export class Text_ENGINE extends Position_ENGINE {

    private _canvas: Canvas_ENGINE;
    private _value: string;
    private _fillStyle: FillStyle;
    private _strokeStyle: StrokeStyle;
    private _dungeonFont: boolean;

    private get _font() {
        const font = `${this.size.height}px`;
        if (this._dungeonFont === true)
            font.concat(" Dungeon,");

        return font.concat(" sans - serif, arial");
    }

    constructor(
        _leftUp: Coordinate_ENGINE,
        _size: Size_ENGINE,
        _canvas: Canvas_ENGINE,
        _value: string,
        _fillStyle: FillStyle,
        _strokeStyle: StrokeStyle,
        _dungeonFont: boolean,
    ) {
        super(
            _leftUp,
            _size,
        );
        this._canvas = _canvas;
        this._value = _value;
        this._fillStyle = _fillStyle;
        this._strokeStyle = _strokeStyle;
        this._dungeonFont = _dungeonFont;
    }

    public drawText() {
        if (this._value.length === 0)
            return;

        const positionOnCamera = this._canvas.positionOnCamera(this);
        if (positionOnCamera === false)
            return;

        const context = this._canvas.context;

        context.font = this._font;
        context.textAlign = "left";
        context.textBaseline = "top";

        positionOnCamera.size.width = context.measureText(this._value).width;
        positionOnCamera.leftUp.x += this.size.half.width;
        positionOnCamera.leftUp.x -= positionOnCamera.size.half.width;

        if (this._fillStyle !== false) {
            context.fillStyle = this._fillStyle;
            context.fillText(
                this._value,
                positionOnCamera.leftUp.x,
                positionOnCamera.leftUp.y,
            );
        }

        if (this._strokeStyle !== false) {
            context.strokeStyle = this._strokeStyle;
            context.strokeText(
                this._value,
                positionOnCamera.leftUp.x,
                positionOnCamera.leftUp.y
            );
        }
    }
}