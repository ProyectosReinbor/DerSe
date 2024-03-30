
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

    constructor(props: {
        canvas: Canvas_ENGINE;
        leftUp: Coordinate_ENGINE;
        size: Size_ENGINE;
        fillStyle: FillStyle;
        strokeStyle: StrokeStyle;
        lineWidth: number;
        hide: Hide_ENGINE;
        textDefault: Text_ENGINE;
        informationDefault: Text_ENGINE;
        text: Text_ENGINE;
    }) {
        super(props);
        this.hide = props.hide;
        this.textDefault = props.textDefault;
        this.informationDefault = props.informationDefault;
        this.text = props.text;
    }

    touchendInput(props: {
        touch: Coordinate_ENGINE;
    }) {
        if (this.hide.touchendHide({
            touch: props.touch
        }) === true)
            return;

        if (this.insidePositionCoordinate({
            coordinate: props.touch
        }) === false)
            return;
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
