
import type { Canvas } from "./canvas.js";
import type { FillStyle, StrokeStyle } from "./context.js";
import { Coordinate } from "./coordinate.js";
import { Hide } from "./input/hide.js";
import { Rect } from "./rect.js";
import { Size } from "./size.js";
import { Text } from "./text.js";

export class Input extends Rect {
    value: string = "";
    hide: Hide;
    textDefault: Text;
    informationDefault: Text;
    text: Text;
    constructor(props: {
        canvas: Canvas;
        initial: Coordinate;
        size: Size;
        fillStyle: FillStyle;
        strokeStyle: StrokeStyle;
        lineWidth: number;
        hide: Hide;
        textDefault: Text;
        informationDefault: Text;
        text: Text;
    }) {
        super(props);
        this.hide = props.hide;
        this.textDefault = props.textDefault;
        this.informationDefault = props.informationDefault;
        this.text = props.text;
    }

    touchendInput(touch: Coordinate) {
        if (this.hide.touchendHide(touch) === true) return;
        if (this.insideCoordinate(touch) === false) return;
    }

    get textValue() {
        if (this.value.length === 0)
            return this.informationDefault.value;

        if (this.hide.turnOn === false)
            return this.value;

        return this.hide.encryption;
    }

    drawInput() {
        this.drawRect();
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
