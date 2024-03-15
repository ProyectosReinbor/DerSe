import { Canvas } from "./canvas.js";
import type { Coordinate } from "./coordinate.js";
import { Hide } from "./input/hide.js";
import { Rect } from "./rect.js";
import { Size } from "./size.js";
import { Text } from "./text.js";

type TextParameters = {
    size: Size;
    fillStyle: string;
    strokeStyle: string;
};

type InformationParameters = {
    value: string;
    fillStyle: string;
    strokeStyle: string;
};

export class Input extends Rect {
    value: string = "";
    hide: Hide;
    textParameters: TextParameters;
    informationParameters: InformationParameters;
    text: Text;
    constructor(
        initial: Coordinate,
        size: Size,
        canvas: Canvas,
        fillStyle: string = "",
        strokeStyle: string = "",
        lineWidth: number = 0,
        hide: {
            turnOn: boolean;
        },
        textParameters: TextParameters,
        informationParameters: InformationParameters,
    ) {
        super(
            initial,
            size,
            canvas,
            fillStyle,
            strokeStyle,
            lineWidth
        );
        this.hide = new Hide(
            canvas,
            this,
            hide.turnOn,
        );
        this.textParameters = textParameters;
        this.informationParameters = informationParameters;
        this.text = new Text(
            this.initial,
            new Size(
                this.size.width,
                textParameters.size.height
            ),
            canvas,
            this.value,
            this.textParameters.fillStyle,
            this.textParameters.strokeStyle,
        );
    }

    touchendInput(touch: Coordinate) {
        if (this.hide.touchendHide(touch) === true) return;
        if (this.insideCoordinate(touch) === false) return;
    }

    get textValue() {
        if (this.value.length === 0) return this.informationParameters.value;
        if (this.hide.turnOn === false) return this.value;
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
