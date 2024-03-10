import { Canvas } from "./canvas.js";
import { Hide } from "./input/hide.js";
import { Position } from "./position.js";
import { Rect } from "./rect.js";
import { Text } from "./text.js";


export class Input extends Rect {

    hide: Hide;
    value: string = "";
    textProperties: {
        fillStyle: string;
        strokeStyle: string;
        height: number;
    };
    information: {
        value: string;
        fillStyle: string;
        strokeStyle: string;
    };
    text: Text;

    constructor(initial: {
        x: number,
        y: number
    },
        size: {
            width: number,
            height: number
        },
        canvas: Canvas,
        fillStyle: string,
        strokeStyle: string,
        lineWidth: number,
        hide: {
            turnOn: boolean;
        },
        textProperties: {
            fillStyle: string;
            strokeStyle: string;
            height: number;
        },
        information: {
            value: string;
            fillStyle: string;
            strokeStyle: string;
        },
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

        this.textProperties = textProperties;
        this.information = information;
        this.text = new Text(
            this.initial,
            {
                width: this.size.width,
                height: textProperties.height,
            },
            canvas,
            this.value,
            textProperties.fillStyle,
            textProperties.strokeStyle,
        );
    }

    touchendInput(touch: Position): void {
        if (this.hide.touchendHide(touch) === true) return;
        if (this.inside(touch) === false) return;
    }

    drawInput() {
        this.drawRect();
        if (this.value.length === 0) {
            this.text.value = this.information.value;
        } else if (this.hide.turnOn === false) {
            this.text.value = this.value;
        } else {
            this.text.value = this.hide.encryption;
        }
        this.hide.drawHide();
        this.text.drawText();
    }

    deleteLastCharacter(): void {
        this.value = this.value.slice(0, -1);
    }

    addLineBreak() {
        this.addChar("\n");
    }

    addChar(character: string) {
        this.value += character;
    }
}
