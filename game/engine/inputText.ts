
import type { Canvas_ENGINE } from "./canvas.js";
import type { FillStyle, StrokeStyle } from "./context.js";
import type { Coordinate_ENGINE } from "./coordinate.js";
import type { Hide_ENGINE } from "./input/hide.js";
import type { Size_ENGINE } from "./size.js";
import { Square_ENGINE } from "./square.js";
import type { Text_ENGINE } from "./text.js";

export class Input_ENGINE extends Square_ENGINE {

    value: string = "";
    hide: Hide_ENGINE;
    textDefault: Text_ENGINE;
    informationDefault: Text_ENGINE;
    text: Text_ENGINE;

    constructor(
        leftUp: Coordinate_ENGINE,
        size: Size_ENGINE,
        canvas: Canvas_ENGINE,
        fillStyle: FillStyle,
        strokeStyle: StrokeStyle,
        lineWidth: number,
        hide: Hide_ENGINE,
        textDefault: Text_ENGINE,
        informationDefault: Text_ENGINE,
        text: Text_ENGINE,
    ) {
        super(
            leftUp,
            size,
            canvas,
            fillStyle,
            strokeStyle,
            lineWidth,
        );
        this.hide = hide;
        this.textDefault = textDefault;
        this.informationDefault = informationDefault;
        this.text = text;
    }

    touchendInput() {
        this._canvas.touchEvents.touchCoordinates.forEach(
            touch => {
                if (this.hide.touchendHide(touch) === true)
                    return;

                if (this.insidePositionCoordinate(touch) === false)
                    return;
            }
        );
    }

    get textValue() {
        if (this.value.length === 0)
            return this.informationDefault.value;

        if (this.hide.switchedOn === false)
            return this.value;

        return this.hide.encryption;
    }

    drawInput() {
        this.drawSquare();
        this.text.value = this.textValue;
        this.hide.drawHide();
        this.text.drawText();
    }

    deleteLastCharacter() {
        this.value = this.value.slice(0, -1);
    }

    addLineBreak() {
        this.addChar("\n");
    }

    addChar(character: string) {
        this.value += character;
    }
}
