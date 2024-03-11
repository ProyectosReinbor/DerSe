import { Canvas } from "./canvas.js";
import { Hide } from "./input/hide.js";
import { Position } from "./position.js";
import { Rect } from "./rect.js";
import { Text } from "./text.js";

export class Input extends Rect {

    // textProperties: {
    //     fillStyle: string;
    //     strokeStyle: string;
    //     height: number;
    // };
    // information: {
    //     value: string;
    //     fillStyle: string;
    //     strokeStyle: string;
    // };
    constructor(
        initialX,
        initialY,
        sizeWidth,
        sizeHeight,
        canvas,
        fillStyle,
        strokeStyle,
        lineWidth,
        hideTurnOn,
        textSizeHeight,
        textFillStyle,
        textStrokeStyle,
        informationValue,
        informationFillStyle,
        informationStrokeStyle
    ) {
        super(
            initialX,
            initialY,
            sizeWidth,
            sizeHeight,
            canvas,
            fillStyle,
            strokeStyle,
            lineWidth
        );
        this.value = "";
        this.hide = new Hide(
            canvas,
            this,
            hideTurnOn,
        );
        this.textFactory = {
            fillStyle: textFillStyle,
            strokeStyle: textStrokeStyle,
        };
        this.information = {
            value: informationValue,
            fillStyle: informationFillStyle,
            strokeStyle: informationStrokeStyle
        };
        this.text = new Text(
            this.initial.x,
            this.initial.y,
            this.size.width,
            textSizeHeight,
            canvas,
            this.value,
            this.textFactory.fillStyle,
            this.textFactory.strokeStyle,
        );
    }

    touchendInput(x, y) {
        if (this.hide.touchendHide(x, y) === true) return;
        if (this.inside(x, y, x, y) === false) return;
    }

    get textValue() {
        if (this.value.length === 0) return this.information.value;
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

    addChar(character) {
        this.value += character;
    }
}
